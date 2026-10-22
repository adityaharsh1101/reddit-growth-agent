import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { QualifiedLead } from './aiClassifier.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const PUBLIC_LEADS_FILE = path.resolve(__dirname, '../../public/leads.json');
const SEEN_POSTS_FILE = path.join(DATA_DIR, 'seen_posts.json');

import { PROJECTS_CONFIG } from '../config/projects.js';

export class LeadStorage {
  constructor() {
    this.ensureDataDir();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
    if (!fs.existsSync(SEEN_POSTS_FILE)) {
      fs.writeFileSync(SEEN_POSTS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  }

  getLeads(filter?: { projectId?: string; status?: string; minScore?: number; cluster?: string }): QualifiedLead[] {
    try {
      const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
      let leads: QualifiedLead[] = JSON.parse(raw);
      // Filter out legacy mock seeds with synthetic IDs
      leads = leads.filter(l => l.id !== 'lead_hl_resumes_001' && l.id !== 'lead_hl_jobs_002' && l.redditPostId !== '1g9x4q2' && l.redditPostId !== '1ga2m8k');

      if (filter) {
        if (filter.projectId && filter.projectId !== 'all') {
          leads = leads.filter(l => l.matchedProjectId === filter.projectId);
        }
        if (filter.cluster && filter.cluster !== 'all') {
          const normCluster = filter.cluster.toLowerCase();
          leads = leads.filter(l => {
            const proj = PROJECTS_CONFIG[l.matchedProjectId];
            return proj && proj.cluster.toLowerCase().includes(normCluster);
          });
        }
        if (filter.status && filter.status !== 'all') {
          leads = leads.filter(l => l.status === filter.status);
        }
        if (filter.minScore) {
          leads = leads.filter(l => l.leadScore >= filter.minScore!);
        }
      }

      return leads.sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime());
    } catch (err) {
      console.error('[LeadStorage] Error reading leads:', err);
      return [];
    }
  }

  saveLeads(newLeads: QualifiedLead[]): number {
    const existing = this.getLeads();
    const existingMap = new Map(existing.map(l => [l.redditPostId, l]));

    let addedCount = 0;
    for (const lead of newLeads) {
      if (lead.id === 'lead_hl_resumes_001' || lead.id === 'lead_hl_jobs_002' || lead.redditPostId === '1g9x4q2' || lead.redditPostId === '1ga2m8k') {
        continue;
      }
      if (lead.draftReply) lead.draftReply = lead.draftReply.replace(/\*/g, '').trim();
      if (lead.alternativeReplies) {
        if (lead.alternativeReplies.founderCasual) lead.alternativeReplies.founderCasual = lead.alternativeReplies.founderCasual.replace(/\*/g, '').trim();
        if (lead.alternativeReplies.actionableChecklist) lead.alternativeReplies.actionableChecklist = lead.alternativeReplies.actionableChecklist.replace(/\*/g, '').trim();
      }
      if (!existingMap.has(lead.redditPostId)) {
        existingMap.set(lead.redditPostId, lead);
        addedCount++;
      }
    }

    const updated = Array.from(existingMap.values());
    fs.writeFileSync(LEADS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    try {
      fs.writeFileSync(PUBLIC_LEADS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (e) {
      // Ignore if public not present
    }
    this.markPostsAsSeen(newLeads.map(l => l.redditPostId));

    return addedCount;
  }

  updateLeadStatus(leadId: string, status: 'new' | 'replied' | 'bookmarked' | 'ignored'): boolean {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === leadId || l.redditPostId === leadId);
    if (index === -1) return false;

    leads[index].status = status;
    if (status === 'replied') {
      leads[index].repliedAt = new Date().toISOString();
    }

    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    try {
      fs.writeFileSync(PUBLIC_LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (e) {
      // Ignore if public not present
    }
    return true;
  }

  getSeenPostIds(): Set<string> {
    try {
      const raw = fs.readFileSync(SEEN_POSTS_FILE, 'utf-8');
      return new Set(JSON.parse(raw));
    } catch {
      return new Set();
    }
  }

  markPostsAsSeen(postIds: string[]) {
    const seen = this.getSeenPostIds();
    postIds.forEach(id => seen.add(id));
    fs.writeFileSync(SEEN_POSTS_FILE, JSON.stringify(Array.from(seen), null, 2), 'utf-8');
  }

  getAnalytics() {
    const leads = this.getLeads();
    const total = leads.length;
    const highIntent = leads.filter(l => l.leadScore >= 80).length;
    const replied = leads.filter(l => l.status === 'replied').length;
    const bookmarked = leads.filter(l => l.status === 'bookmarked').length;

    const byProject: Record<string, number> = {};
    const bySubreddit: Record<string, number> = {};
    const byCluster: Record<string, number> = {};

    leads.forEach(l => {
      byProject[l.matchedProjectId] = (byProject[l.matchedProjectId] || 0) + 1;
      bySubreddit[l.subreddit] = (bySubreddit[l.subreddit] || 0) + 1;
      const proj = PROJECTS_CONFIG[l.matchedProjectId];
      const cl = proj?.cluster || 'Other';
      byCluster[cl] = (byCluster[cl] || 0) + 1;
    });

    return {
      totalLeads: total,
      highIntentLeads: highIntent,
      repliedLeads: replied,
      bookmarkedLeads: bookmarked,
      byProject,
      bySubreddit,
      byCluster
    };
  }
}
