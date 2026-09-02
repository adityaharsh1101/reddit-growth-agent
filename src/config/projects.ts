export interface ProjectConfig {
  id: string;
  name: string;
  badge: string;
  color: string;
  tagline: string;
  websiteUrl: string;
  focusArea: string;
  targetSubreddits: string[];
  searchQueries: string[];
  intentTriggers: string[];
  negativeKeywords: string[];
  valueProps: string[];
  replyStrategy: {
    persona: string;
    guidelines: string[];
    sampleOpening: string;
    callToAction: string;
  };
}

export const PROJECTS_CONFIG: Record<string, ProjectConfig> = {
  hashlilly: {
    id: 'hashlilly',
    name: 'Hashlilly (Resume Engine & ATS Hub)',
    badge: '🌿 Hashlilly Resume Engine',
    color: '#10B981',
    tagline: 'AI Resume Builder, ATS Score Optimizer & Job Tailoring Engine',
    websiteUrl: 'https://hashlilly.in',
    focusArea: 'Resume Optimization, ATS Parsing, Job Search & Career Tooling',
    targetSubreddits: [
      'resumes',
      'jobs',
      'careerguidance',
      'recruitinghell',
      'cscareerquestions',
      'EngineeringResumes',
      'jobsearchhacks',
      'ResumeExperts',
      'layoffs'
    ],
    searchQueries: [
      'applied 100 jobs 0 callbacks',
      'ATS score checker',
      'ATS friendly resume template',
      'how to tailor resume for job description',
      'resume builder recommendations',
      'resume roast review',
      'rewrite bullet points metrics',
      'beating ATS parser'
    ],
    intentTriggers: [
      'getting rejected by ATS',
      'sent hundreds of applications no response',
      'is my resume bad',
      'need help formatting resume',
      'how do I match keywords from job description',
      'free resume review',
      'ATS friendly format'
    ],
    negativeKeywords: ['hiring manager looking to hire', 'selling resume writing course for $500', 'scam'],
    valueProps: [
      'Real-time ATS parser simulation that highlights missing keywords and formatting errors',
      'Automatic STAR-method bullet point rewriter with quantifiable metrics and active verbs',
      '1-click job description tailoring to optimize keyword density without keyword stuffing',
      'Clean LaTeX and single-column PDF exports that pass all major ATS systems (Workday, Greenhouse, Lever, Taleo)'
    ],
    replyStrategy: {
      persona: 'Experienced tech recruiter / empathetic career mentor who understands ATS mechanics',
      guidelines: [
        'Acknowledge how frustrating and broken modern hiring / ATS filtering is.',
        'Give 2-3 concrete, actionable tips immediately (e.g. single-column layout, quantifying impact with X-Y-Z formula, mirroring exact skills from the JD).',
        'Mention Hashlilly Resume Engine casually as a free tool / project built to solve this exact ATS headache.',
        'Never sound like a pushy salesman or copy-pasted bot.'
      ],
      sampleOpening: 'I feel your pain—the job market right now is brutal and ATS filters reject ~75% of resumes before a human ever sees them.',
      callToAction: 'If you want to quickly test your ATS score and find missing keywords against the job description, feel free to run it through Hashlilly Resume Engine.'
    }
  },
  thatsmissing: {
    id: 'thatsmissing',
    name: "That's Missing",
    badge: '📊 That\'s Missing',
    color: '#6366F1',
    tagline: 'Autonomous Market Signal Sentinel & Startup Idea Validation',
    websiteUrl: 'https://hashlilly.in/labs/thatsmissing',
    focusArea: 'Market Intelligence, Startup Validation, Unmet Consumer Needs',
    targetSubreddits: [
      'Entrepreneur',
      'startups',
      'SideProject',
      'SaaS',
      'IndieHackers',
      'roastmystartup',
      'businessideas',
      'SomebodyMakeThis',
      'microsaas'
    ],
    searchQueries: [
      'how to find SaaS ideas',
      'validate startup idea',
      'market gap analysis',
      'trending SaaS niches',
      'what product should I build',
      'unmet market demand'
    ],
    intentTriggers: [
      'struggling to find a profitable SaaS idea',
      'how do you know if there is market demand',
      'where do people find problems to solve',
      'complaints about existing software'
    ],
    negativeKeywords: ['buy my course', 'crypto giveaway', 'dropshipping guru'],
    valueProps: [
      'Scans social channels & Reddit to find real user pain points and software complaints',
      'Extracts validated market gaps and pairs them with actionable product ideas',
      'Autonomous sentinel that alerts you to emerging niche trends before they get saturated'
    ],
    replyStrategy: {
      persona: 'Bootstrapped SaaS builder and market researcher',
      guidelines: [
        'Share practical framework on validating problem severity (e.g. look for active workarounds and budget spend).',
        'Recommend searching where users complain most rather than brainstorming in a vacuum.',
        'Introduce That\'s Missing as an autonomous scanner built for this exact purpose.'
      ],
      sampleOpening: 'The biggest mistake most founders make is brainstorming ideas in their head rather than mining real user complaints.',
      callToAction: 'You can check out That\'s Missing if you want automated feeds of live market gaps and verified consumer complaints.'
    }
  },
  soulamore: {
    id: 'soulamore',
    name: 'Soulamore',
    badge: '🌸 Soulamore',
    color: '#EC4899',
    tagline: 'Anonymous Peer Mental Wellness Ecosystem & Safe Spaces',
    websiteUrl: 'https://hashlilly.in/labs/soulamore',
    focusArea: 'Peer Mental Wellness, Safe Venting, Emotional Support',
    targetSubreddits: [
      'mentalhealth',
      'anxiety',
      'lonely',
      'depression_help',
      'KindVoice',
      'CasualConversation',
      'Needafriend',
      'therapy'
    ],
    searchQueries: [
      'need someone to talk to',
      'feeling overwhelmed lonely',
      'safe place to vent anonymously',
      'peer support mental health app',
      'nobody understands me'
    ],
    intentTriggers: [
      'just need a listening ear',
      'feeling isolated',
      'scared to tell friends how I feel',
      'looking for peer support'
    ],
    negativeKeywords: ['suicide hotlines', 'urgent crisis medical advice', 'promotions'],
    valueProps: [
      '100% anonymous, judgement-free peer emotional support spaces',
      'Connect with compassionate listeners and peers undergoing similar life challenges',
      'Safe, calming environment with built-in psychologist network access'
    ],
    replyStrategy: {
      persona: 'Empathetic, compassionate peer and supportive community member',
      guidelines: [
        'Validate their emotions genuinely with warmth and compassion first.',
        'Never offer medical or psychiatric advice.',
        'Share that they are not alone and that feeling heard can make a huge difference.',
        'Gently mention Soulamore as a safe, free anonymous space to talk with supportive peers.'
      ],
      sampleOpening: 'First of all, I hear you and what you are going through is completely valid. It takes courage to open up.',
      callToAction: 'If you need a quiet, completely anonymous place where people actually listen without judging, Soulamore is a peer space built for that.'
    }
  },
  ayuos: {
    id: 'ayuos',
    name: 'AYUOS',
    badge: '🧬 AYUOS Health OS',
    color: '#06B6D4',
    tagline: 'Sovereign Health Operating System & AI Biomarker Tracking',
    websiteUrl: 'https://ayuos.com',
    focusArea: 'Health Records, Biomarker Tracking, OCR Lab Extraction',
    targetSubreddits: [
      'Biohackers',
      'QuantifiedSelf',
      'HealthIT',
      'digitalhealth',
      'Fitness',
      'longevity',
      'diabetes'
    ],
    searchQueries: [
      'track blood test results over time',
      'organize medical records app',
      'extract biomarkers from lab PDF',
      'longitudinal health data tracker',
      'family medical records privacy'
    ],
    intentTriggers: [
      'how do you track your bloodwork trends',
      'app to store lab results',
      'tired of messy PDF medical reports',
      'private E2EE health record app'
    ],
    negativeKeywords: ['medical diagnosis emergency', 'prescription drugs sales'],
    valueProps: [
      'AI OCR pipeline that extracts 50+ biomarkers directly from PDF lab results into longitudinal trend graphs',
      'Client-side encrypted sovereign health record repository (HIPAA/GDPR privacy compliant)',
      'Predictive health insights and shareable doctor-summary links'
    ],
    replyStrategy: {
      persona: 'Quantified self and preventive health enthusiast',
      guidelines: [
        'Discuss the importance of longitudinal tracking (spotting trends before they cross clinical thresholds).',
        'Explain the friction of PDF lab reports and how structured biomarker graphs solve this.',
        'Mention AyuOS as a privacy-first, sovereign health operating system.'
      ],
      sampleOpening: 'Spotting trends over time (e.g. fasting glucose or ApoB trajectory) is infinitely more useful than looking at a single isolated lab sheet.',
      callToAction: 'Check out AyuOS if you want an automated tool that extracts biomarkers from lab PDFs into longitudinal trend charts.'
    }
  }
};
