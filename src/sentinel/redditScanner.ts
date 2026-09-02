import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { ProjectConfig, PROJECTS_CONFIG } from '../config/projects.js';

export interface RawRedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  subreddit: string;
  score: number;
  numComments: number;
  permalink: string;
  createdUtc: number;
  url: string;
  queryMatched?: string;
  targetProjectId?: string;
}

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0'
];

function getRandomUserAgent(): string {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class RedditScanner {
  private lastRequestTime = 0;
  private minIntervalMs = 2800; // Safe rate-limit throttle interval
  private xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_'
  });

  private async fetchRss(url: string): Promise<string | null> {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    if (elapsed < this.minIntervalMs) {
      await sleep(this.minIntervalMs - elapsed);
    }
    this.lastRequestTime = Date.now();

    try {
      const res = await axios.get(url, {
        headers: {
          'User-Agent': getRandomUserAgent(),
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        timeout: 15000
      });
      return res.data;
    } catch (err: any) {
      console.warn(`[RedditScanner] Error fetching RSS from ${url}: ${err.message}`);
      return null;
    }
  }

  /**
   * Scans a specific subreddit's RSS feed
   */
  async scanSubredditRss(subreddit: string): Promise<RawRedditPost[]> {
    const url = `https://www.reddit.com/r/${subreddit}/.rss?sort=new`;
    const xml = await this.fetchRss(url);
    if (!xml) return [];

    try {
      const parsed = this.xmlParser.parse(xml);
      const feed = parsed.feed;
      if (!feed || !feed.entry) return [];

      const entries = Array.isArray(feed.entry) ? feed.entry : [feed.entry];
      const posts: RawRedditPost[] = [];

      for (const entry of entries) {
        let link = '';
        if (entry.link) {
          link = entry.link['@_href'] || entry.link;
        }

        const idMatch = (entry.id || link || '').match(/t3_([a-zA-Z0-9]+)/);
        const id = idMatch ? idMatch[1] : (link.split('/comments/')[1]?.split('/')[0] || Math.random().toString(36).substring(7));
        
        const authorName = entry.author?.name ? entry.author.name.replace('/u/', '') : 'unknown';
        const rawContent = typeof entry.content === 'string' ? entry.content : (entry.content?.['#text'] || '');
        const cleanContent = this.stripHtml(rawContent).slice(0, 2000);

        posts.push({
          id,
          title: entry.title || '',
          selftext: cleanContent,
          author: authorName,
          subreddit,
          score: 1,
          numComments: 0,
          permalink: link || `https://www.reddit.com/r/${subreddit}/comments/${id}`,
          createdUtc: entry.updated ? Math.floor(new Date(entry.updated).getTime() / 1000) : Math.floor(Date.now() / 1000),
          url: link
        });
      }

      return posts;
    } catch (err: any) {
      console.error(`[RedditScanner] Error parsing RSS for r/${subreddit}:`, err.message);
      return [];
    }
  }

  /**
   * Scans targeted channels for a given project configuration
   */
  async scanForProject(project: ProjectConfig, maxSubs = 3): Promise<RawRedditPost[]> {
    const allPosts: Map<string, RawRedditPost> = new Map();
    console.log(`\n🔍 [Scanner] Scanning RSS channels for project: ${project.name}...`);

    const subsToScan = project.targetSubreddits.slice(0, maxSubs);
    for (const sub of subsToScan) {
      console.log(`   -> Harvesting r/${sub}/.rss...`);
      const posts = await this.scanSubredditRss(sub);
      console.log(`      Found ${posts.length} entries in r/${sub}`);
      for (const p of posts) {
        p.targetProjectId = project.id;
        allPosts.set(p.id, p);
      }
    }

    const results = Array.from(allPosts.values());
    console.log(`✅ [Scanner] Harvested ${results.length} total posts for ${project.name}.`);
    return results;
  }

  /**
   * Scans across all registered studio projects
   */
  async scanAllProjects(): Promise<RawRedditPost[]> {
    const combined: Map<string, RawRedditPost> = new Map();
    for (const key of Object.keys(PROJECTS_CONFIG)) {
      const proj = PROJECTS_CONFIG[key];
      const posts = await this.scanForProject(proj, 2);
      for (const p of posts) {
        combined.set(p.id, p);
      }
    }
    return Array.from(combined.values());
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }
}
