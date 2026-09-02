import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROJECTS_CONFIG } from '../config/projects.js';
import { AIClassifier } from '../sentinel/aiClassifier.js';
import { LeadStorage } from '../sentinel/leadStorage.js';
import { RedditScanner } from '../sentinel/redditScanner.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3800;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../public')));

const scanner = new RedditScanner();
const classifier = new AIClassifier();
const storage = new LeadStorage();

let isScanning = false;
let lastScanTime: string | null = null;

// ==============================================================================
// REST ENDPOINTS
// ==============================================================================

/**
 * Get all registered projects and target subreddits
 */
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    projects: Object.values(PROJECTS_CONFIG)
  });
});

/**
 * Get leads with flexible filtering
 */
app.get('/api/leads', (req, res) => {
  const { projectId, status, minScore, search } = req.query;

  let leads = storage.getLeads({
    projectId: projectId as string,
    status: status as string,
    minScore: minScore ? parseInt(minScore as string, 10) : undefined
  });

  if (search) {
    const q = (search as string).toLowerCase();
    leads = leads.filter(
      l =>
        l.title.toLowerCase().includes(q) ||
        l.selftext.toLowerCase().includes(q) ||
        l.userPainPoint.toLowerCase().includes(q) ||
        l.subreddit.toLowerCase().includes(q) ||
        l.author.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: leads.length,
    leads
  });
});

/**
 * Trigger an instant Reddit scan
 */
app.post('/api/scan', async (req, res) => {
  if (isScanning) {
    return res.status(409).json({
      success: false,
      message: 'A scan is already in progress. Please wait a moment.'
    });
  }

  const { projectId } = req.body;
  isScanning = true;

  try {
    const seenIds = storage.getSeenPostIds();
    let rawPosts = [];

    if (projectId && PROJECTS_CONFIG[projectId]) {
      rawPosts = await scanner.scanForProject(PROJECTS_CONFIG[projectId], 20);
    } else {
      rawPosts = await scanner.scanAllProjects();
    }

    const unseen = rawPosts.filter(p => !seenIds.has(p.id));
    const qualified = await classifier.classifyBatch(unseen, projectId);
    const addedCount = storage.saveLeads(qualified);

    lastScanTime = new Date().toISOString();
    isScanning = false;

    res.json({
      success: true,
      scannedCount: rawPosts.length,
      unseenCount: unseen.length,
      newLeadsAdded: addedCount,
      leads: qualified,
      lastScanTime
    });
  } catch (err: any) {
    isScanning = false;
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/**
 * Update lead status (e.g. marked as Replied, Bookmarked, Ignored)
 */
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['new', 'replied', 'bookmarked', 'ignored'].includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status' });
  }

  const updated = storage.updateLeadStatus(id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }

  res.json({ success: true, id, status });
});

/**
 * On-demand reply generator with custom tone
 */
app.post('/api/generate-reply', async (req, res) => {
  const { leadId, tone, customInstructions } = req.body;
  const leads = storage.getLeads();
  const lead = leads.find(l => l.id === leadId || l.redditPostId === leadId);

  if (!lead) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }

  const project = PROJECTS_CONFIG[lead.matchedProjectId];
  if (!project) {
    return res.status(404).json({ success: false, error: 'Project configuration not found' });
  }

  const customPrompt = `You are replying to this Reddit post as a helpful, authentic participant for "${project.name}".
Post Title: ${lead.title}
Post Content: ${lead.selftext}
Subreddit: r/${lead.subreddit}
Author: u/${lead.author}
User Pain Point: ${lead.userPainPoint}
Desired Tone: ${tone || 'Authentic Founder & Solution Expert'}
Additional Instructions: ${customInstructions || 'Provide 3 actionable tips first, then subtly mention ' + project.name + ' (' + project.websiteUrl + '). Keep it 100% genuine and anti-spam.'}

Generate a polished markdown reply for Reddit:`;

  try {
    const rawResponse = await classifier['callAIWithFallback'](customPrompt, project.id);
    const replyText = rawResponse || lead.draftReply;

    res.json({
      success: true,
      leadId,
      tone,
      draftReply: replyText
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * System and conversion stats
 */
app.get('/api/stats', (req, res) => {
  const analytics = storage.getAnalytics();
  res.json({
    success: true,
    isScanning,
    lastScanTime,
    analytics
  });
});

/**
 * Export leads to CSV
 */
app.get('/api/export/csv', (req, res) => {
  const leads = storage.getLeads();
  const headers = ['ID', 'Project', 'Score', 'Urgency', 'Subreddit', 'Author', 'Title', 'Status', 'Reddit Link', 'Discovered At'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${l.matchedProjectName}"`,
    l.leadScore,
    `"${l.urgency}"`,
    `"r/${l.subreddit}"`,
    `"u/${l.author}"`,
    `"${l.title.replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.permalink}"`,
    `"${l.discoveredAt}"`
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="reddit_leads_export.csv"');
  res.send(csv);
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Reddit Growth & Lead Sentinel API running on http://localhost:${PORT}`);
  console.log(`🌿 Hashlilly Resume Engine Focus: Active`);
  console.log(`📊 That's Missing, 🌸 Soulamore, 🧬 AYUOS: Active\n`);
});
