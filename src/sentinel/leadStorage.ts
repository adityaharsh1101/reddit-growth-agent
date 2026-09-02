import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { QualifiedLead } from './aiClassifier.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../../data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SEEN_POSTS_FILE = path.join(DATA_DIR, 'seen_posts.json');

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

  getLeads(filter?: { projectId?: string; status?: string; minScore?: number }): QualifiedLead[] {
    try {
      const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
      let leads: QualifiedLead[] = JSON.parse(raw);

      if (filter) {
        if (filter.projectId && filter.projectId !== 'all') {
          leads = leads.filter(l => l.matchedProjectId === filter.projectId);
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
      if (!existingMap.has(lead.redditPostId)) {
        existingMap.set(lead.redditPostId, lead);
        addedCount++;
      }
    }

    const updated = Array.from(existingMap.values());
    fs.writeFileSync(LEADS_FILE, JSON.stringify(updated, null, 2), 'utf-8');
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

    leads.forEach(l => {
      byProject[l.matchedProjectId] = (byProject[l.matchedProjectId] || 0) + 1;
      bySubreddit[l.subreddit] = (bySubreddit[l.subreddit] || 0) + 1;
    });

    return {
      totalLeads: total,
      highIntentLeads: highIntent,
      repliedLeads: replied,
      bookmarkedLeads: bookmarked,
      byProject,
      bySubreddit
    };
  }
}
