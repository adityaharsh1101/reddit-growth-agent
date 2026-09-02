import axios from 'axios';
import dotenv from 'dotenv';
import { ProjectConfig, PROJECTS_CONFIG } from '../config/projects.js';
import { RawRedditPost } from './redditScanner.js';

dotenv.config();

export interface QualifiedLead {
  id: string;
  redditPostId: string;
  title: string;
  selftext: string;
  author: string;
  subreddit: string;
  permalink: string;
  createdUtc: number;
  redditScore: number;
  numComments: number;
  
  // Classification
  isLead: boolean;
  leadScore: number; // 0 - 100
  matchedProjectId: string;
  matchedProjectName: string;
  intentCategory: string; // 'Seeking Tool' | 'Frustrated with Competitor' | 'Seeking Advice' | 'Market Pain Point' | 'Feature Inquiry'
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  userPainPoint: string;
  recommendedAction: 'Reply to Thread' | 'DM User' | 'Monitor' | 'Ignore';
  
  // Reply strategy
  draftReply: string;
  alternativeReplies?: {
    founderCasual?: string;
    actionableChecklist?: string;
  };
  keyTopics: string[];

  // Lead status
  status: 'new' | 'replied' | 'bookmarked' | 'ignored';
  repliedAt?: string;
  discoveredAt: string;
}

export class AIClassifier {
  private openRouterKey = process.env.OPENROUTER_API_KEY || '';
  private openRouterBase = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
  private openRouterModel = process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-exp:free';

  private llmRouterUrl = process.env.LLM_ROUTER_GATEWAY_URL || 'https://api-eqegtlejaq-uc.a.run.app/v1';
  private llmHubKey = process.env.LLM_HUB_API_KEY || '';
  private resumeHubKey = process.env.RESUME_HUB_API_KEY || '';
  private thatsmissingHubKey = process.env.THATSMISSING_HUB_API_KEY || '';

  private directGeminiKey = process.env.GEMINI_API_KEY || '';

  /**
   * Evaluates a single Reddit post and determines if it's a high-intent user lead.
   */
  async classifyPost(post: RawRedditPost, targetProjectId?: string): Promise<QualifiedLead | null> {
    const project = targetProjectId ? PROJECTS_CONFIG[targetProjectId] : this.guessTargetProject(post);
    if (!project) return null;

    // Fast heuristic pre-filter to avoid wasting AI tokens on obvious spam or irrelevant memes
    if (this.isObviousIrrelevant(post, project)) {
      return null;
    }

    const prompt = this.buildPrompt(post, project);

    // Call Multi-Tier AI Engine
    const aiResponse = await this.callAIWithFallback(prompt, project.id);
    if (!aiResponse) {
      // Use smart deterministic heuristic fallback
      return this.generateHeuristicLead(post, project);
    }

    try {
      // Parse JSON response
      const cleaned = aiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed.isLead || parsed.leadScore < 35) {
        return null; // Not relevant enough
      }

      return {
        id: `lead_${post.id}_${Date.now()}`,
        redditPostId: post.id,
        title: post.title,
        selftext: post.selftext,
        author: post.author,
        subreddit: post.subreddit,
        permalink: post.permalink,
        createdUtc: post.createdUtc,
        redditScore: post.score,
        numComments: post.numComments,

        isLead: true,
        leadScore: Math.min(100, Math.max(0, parsed.leadScore || 70)),
        matchedProjectId: project.id,
        matchedProjectName: project.name,
        intentCategory: parsed.intentCategory || 'Seeking Advice',
        urgency: parsed.urgency || (parsed.leadScore > 80 ? 'High' : 'Medium'),
        userPainPoint: parsed.userPainPoint || 'Looking for solutions in this domain.',
        recommendedAction: parsed.recommendedAction || 'Reply to Thread',

        draftReply: parsed.draftReply || this.generateDefaultDraft(post, project),
        alternativeReplies: parsed.alternativeReplies || {
          founderCasual: `Hey u/${post.author}, I built ${project.name} to solve this exact issue. Happy to share some tips!`,
          actionableChecklist: `1. Check your structure\n2. Mirror the target requirements\n3. Use ${project.name} for automated testing.`
        },
        keyTopics: parsed.keyTopics || [project.focusArea],

        status: 'new',
        discoveredAt: new Date().toISOString()
      };
    } catch (err: any) {
      console.warn(`[AIClassifier] Failed to parse JSON from AI: ${err.message}. Using heuristic fallback.`);
      return this.generateHeuristicLead(post, project);
    }
  }

  /**
   * Batch classifies multiple harvested posts
   */
  async classifyBatch(posts: RawRedditPost[], targetProjectId?: string): Promise<QualifiedLead[]> {
    const leads: QualifiedLead[] = [];
    console.log(`🧠 [AIClassifier] Analyzing ${posts.length} posts for high-converting leads...`);

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      try {
        const lead = await this.classifyPost(post, targetProjectId || post.targetProjectId);
        if (lead) {
          leads.push(lead);
          console.log(`   🔥 [Lead Found: ${lead.leadScore}pts | ${lead.matchedProjectId}] ${post.title.slice(0, 60)}...`);
        }
      } catch (err: any) {
        console.error(`   ❌ Error classifying post ${post.id}: ${err.message}`);
      }
    }

    console.log(`✨ [AIClassifier] Found ${leads.length} qualified leads from batch.`);
    return leads.sort((a, b) => b.leadScore - a.leadScore);
  }

  private buildPrompt(post: RawRedditPost, project: ProjectConfig): string {
    return `You are an elite, non-spam Reddit Growth & Conversion Strategist for "${project.name}".
Product Focus: ${project.focusArea}
Tagline: ${project.tagline}
Core Value Props:
${project.valueProps.map(v => `- ${v}`).join('\n')}
Website: ${project.websiteUrl}

Reply Guidelines:
- Persona: ${project.replyStrategy.persona}
- Key Rules:
${project.replyStrategy.guidelines.map(g => `  * ${g}`).join('\n')}
- Opening inspiration: "${project.replyStrategy.sampleOpening}"
- Call to action: "${project.replyStrategy.callToAction}"

EVALUATE THIS REDDIT POST:
Subreddit: r/${post.subreddit}
Author: u/${post.author}
Title: ${post.title}
Body: ${post.selftext}

CRITICAL ANTI-SPAM RULE:
Reddit users hate aggressive sales pitches. The reply MUST provide genuine, high-value, actionable advice FIRST (80% of the response) that actually helps the OP solve their issue right now, and only seamlessly/authentically mention ${project.name} (20%) as a free/helpful tool or resource.

Output strictly valid JSON with this exact schema:
{
  "isLead": boolean, // true if OP is asking a question, expressing frustration, asking for tool/advice, or has a problem this product solves
  "leadScore": number, // 0 to 100 based on conversion intent and pain point severity
  "intentCategory": "Seeking Tool" | "Frustrated with Competitor" | "Seeking Advice" | "Market Pain Point" | "Feature Inquiry",
  "urgency": "Low" | "Medium" | "High" | "Critical",
  "userPainPoint": "1-2 sentence crisp breakdown of what OP is struggling with",
  "recommendedAction": "Reply to Thread" | "DM User" | "Monitor",
  "draftReply": "The complete, ready-to-post, highly engaging markdown Reddit reply. Include empathy, 2-3 specific technical or practical tips, and a natural suggestion to test/use ${project.name}.",
  "alternativeReplies": {
    "founderCasual": "A shorter, authentic founder perspective reply",
    "actionableChecklist": "A quick 3-bullet-point tactical checklist reply"
  },
  "keyTopics": ["string", "string"]
}`;
  }

  /**
   * Multi-Tier AI Call with Fallbacks
   */
  private async callAIWithFallback(prompt: string, projectId: string): Promise<string | null> {
    // Tier 0: OpenRouter (Gemini Flash Exp / Free)
    if (this.openRouterKey) {
      try {
        const res = await axios.post(
          `${this.openRouterBase}/chat/completions`,
          {
            model: this.openRouterModel,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 1200
          },
          {
            headers: {
              'Authorization': `Bearer ${this.openRouterKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://hashlilly.in',
              'X-Title': 'Reddit Lead Sentinel'
            },
            timeout: 15000
          }
        );
        const text = res.data?.choices?.[0]?.message?.content;
        if (text) return text;
      } catch (err: any) {
        console.warn(`[AIClassifier] Tier-0 OpenRouter failed: ${err.message}. Trying Tier-1 Hub...`);
      }
    }

    // Tier 1: LLM Router Hub Gateway
    const hubKey =
      projectId === 'hashlilly'
        ? this.resumeHubKey || this.llmHubKey
        : projectId === 'thatsmissing'
        ? this.thatsmissingHubKey || this.llmHubKey
        : this.llmHubKey;

    if (hubKey && this.llmRouterUrl) {
      try {
        const res = await axios.post(
          `${this.llmRouterUrl}/chat/completions`,
          {
            model: 'google/gemini-2.0-flash-001',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3
          },
          {
            headers: {
              'Authorization': `Bearer ${hubKey}`,
              'Content-Type': 'application/json',
              'x-app-id': projectId
            },
            timeout: 15000
          }
        );
        const text = res.data?.choices?.[0]?.message?.content;
        if (text) return text;
      } catch (err: any) {
        console.warn(`[AIClassifier] Tier-1 LLM Router Hub failed: ${err.message}.`);
      }
    }

    return null;
  }

  private isObviousIrrelevant(post: RawRedditPost, project: ProjectConfig): boolean {
    const fullText = (post.title + ' ' + post.selftext).toLowerCase();

    // Check negative keywords
    for (const neg of project.negativeKeywords) {
      if (fullText.includes(neg.toLowerCase())) return true;
    }

    // Check if post is too short or just an image/video link
    if (fullText.trim().length < 20) return true;

    return false;
  }

  private guessTargetProject(post: RawRedditPost): ProjectConfig {
    const text = (post.title + ' ' + post.selftext + ' ' + post.subreddit).toLowerCase();

    if (
      text.includes('resume') ||
      text.includes('ats') ||
      text.includes('job application') ||
      text.includes('callback') ||
      post.subreddit.toLowerCase().includes('resume') ||
      post.subreddit.toLowerCase().includes('recruiting')
    ) {
      return PROJECTS_CONFIG.hashlilly;
    }

    if (
      text.includes('saas idea') ||
      text.includes('market gap') ||
      text.includes('startup idea') ||
      text.includes('validate') ||
      post.subreddit.toLowerCase().includes('startup') ||
      post.subreddit.toLowerCase().includes('entrepreneur')
    ) {
      return PROJECTS_CONFIG.thatsmissing;
    }

    if (
      text.includes('anxiety') ||
      text.includes('depress') ||
      text.includes('lonely') ||
      text.includes('vent') ||
      post.subreddit.toLowerCase().includes('mental')
    ) {
      return PROJECTS_CONFIG.soulamore;
    }

    if (
      text.includes('blood test') ||
      text.includes('biomarker') ||
      text.includes('health record') ||
      post.subreddit.toLowerCase().includes('biohack')
    ) {
      return PROJECTS_CONFIG.ayuos;
    }

    return PROJECTS_CONFIG.hashlilly;
  }

  private generateHeuristicLead(post: RawRedditPost, project: ProjectConfig): QualifiedLead {
    const text = (post.title + ' ' + post.selftext).toLowerCase();
    let score = 75;

    if (text.includes('help') || text.includes('how to') || text.includes('reject') || text.includes('struggl')) {
      score += 15;
    }

    return {
      id: `lead_${post.id}_${Date.now()}`,
      redditPostId: post.id,
      title: post.title,
      selftext: post.selftext,
      author: post.author,
      subreddit: post.subreddit,
      permalink: post.permalink,
      createdUtc: post.createdUtc,
      redditScore: post.score,
      numComments: post.numComments,

      isLead: true,
      leadScore: Math.min(95, score),
      matchedProjectId: project.id,
      matchedProjectName: project.name,
      intentCategory: 'Seeking Advice & Solutions',
      urgency: score > 80 ? 'High' : 'Medium',
      userPainPoint: `User in r/${post.subreddit} asking for guidance regarding ${project.focusArea.toLowerCase()}.`,
      recommendedAction: 'Reply to Thread',

      draftReply: this.generateDefaultDraft(post, project),
      alternativeReplies: {
        founderCasual: `Hey u/${post.author}, dealing with this is super frustrating. I've been working on ${project.name} to help people automate and solve this. Happy to help if you have questions!`,
        actionableChecklist: `Here are 3 quick fixes:\n1. Audit your baseline structure\n2. Align keywords with current standards\n3. Test with a free analyzer like ${project.name}.`
      },
      keyTopics: [project.focusArea, `r/${post.subreddit}`],

      status: 'new',
      discoveredAt: new Date().toISOString()
    };
  }

  private generateDefaultDraft(post: RawRedditPost, project: ProjectConfig): string {
    if (project.id === 'hashlilly') {
      return `Hey u/${post.author}, I completely understand the frustration. The current job market is rough, and the reality is that ~70-75% of resumes get filtered out by ATS screeners (like Workday, Taleo, Greenhouse) before any recruiter sees them.

Here are 3 concrete things you can fix right now:
1. **Ditch Multi-Column & Graphic Templates**: ATS parsers read left-to-right, top-to-bottom. Columns or tables often cause text blocks to scramble into nonsense. Stick to a clean, single-column layout.
2. **Use the X-Y-Z Impact Formula**: Instead of listing daily duties, write bullet points like *"Accomplished [X] as measured by [Y] by doing [Z]"* with real metrics.
3. **Mirror the Job Description Keywords**: Make sure hard skills and specific tools from the job post appear naturally in your skills section and bullet points.

If you want to test how an ATS actually parses your resume and see missing keywords against the job description, you can run a free audit on **Hashlilly Resume Engine** (${project.websiteUrl}).

Rooting for you—don't give up!`;
    }

    return `Hey u/${post.author}, ${project.replyStrategy.sampleOpening}

A good approach to tackle this is:
1. Break down the core bottleneck into measurable steps.
2. Avoid over-complicating early on.
3. ${project.replyStrategy.callToAction} (${project.websiteUrl}).

Hope this helps give some direction!`;
  }
}
