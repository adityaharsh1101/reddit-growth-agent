export interface ProjectConfig {
  id: string;
  name: string;
  badge: string;
  color: string;
  tagline: string;
  websiteUrl: string;
  cluster: 'Flagship SaaS' | 'Startup & Finance' | 'Creator & AI Studio' | 'Health & Community' | 'Privacy & Storage' | 'Geospatial & OSINT';
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
    websiteUrl: 'https://hashlilly.in/resume-engine',
    cluster: 'Flagship SaaS',
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
      persona: 'Experienced tech recruiter and empathetic career mentor who understands ATS mechanics',
      guidelines: [
        'Acknowledge how frustrating modern hiring and ATS filtering is.',
        'Give 2-3 concrete, actionable tips immediately (single-column layout, quantifying impact with Google X-Y-Z formula, mirroring exact skills from the JD).',
        'Mention Hashlilly Resume Engine casually as a free tool built to solve this exact ATS headache.',
        'Never sound like an aggressive sales rep or automated bot.'
      ],
      sampleOpening: 'The job market right now is brutal and ATS filters reject ~75% of resumes before a human ever sees them.',
      callToAction: 'If you want to quickly test your ATS score and find missing keywords against the job description, feel free to run it through Hashlilly Resume Engine.'
    }
  },

  influenceos: {
    id: 'influenceos',
    name: 'Hashlilly Influence OS',
    badge: '🎯 Influence OS & BFI',
    color: '#8B5CF6',
    tagline: 'Influencer Discovery, Brand Fit Index (BFI) & Escrow Campaign Protection',
    websiteUrl: 'https://hashlilly.in/influence-os',
    cluster: 'Flagship SaaS',
    focusArea: 'Influencer Marketing, Bot Audit, Brand Fit Index, Escrow Protection',
    targetSubreddits: [
      'Instagrammarketing',
      'marketing',
      'socialmediamarketing',
      'smallbusiness',
      'influencermarketing',
      'ecommerce'
    ],
    searchQueries: [
      'how to find genuine micro influencers',
      'detect fake followers instagram',
      'influencer marketing bot engagement',
      'measuring influencer ROI',
      'influencer contract escrow payment'
    ],
    intentTriggers: [
      'paid influencer got zero sales',
      'how to check if influencer has fake followers',
      'influencer ghosted after payment',
      'looking for vetted creators for brand campaign'
    ],
    negativeKeywords: ['buy 10k followers cheap', 'free shoutout exchange'],
    valueProps: [
      'Algorithmic Brand Fit Index (BFI) evaluating audience authenticity, engagement velocity, and conversion signals',
      'Automated bot detection and verified city-level follower reach analysis',
      '100% escrow-backed deal milestones protecting brand capital until deliverables are verified'
    ],
    replyStrategy: {
      persona: 'Performance marketer and creator economy campaign strategist',
      guidelines: [
        'Warn about vanity follower counts vs verified engagement ratios.',
        'Share 2 checks: comment-to-like quality ratio and location density of followers.',
        'Introduce Hashlilly Influence OS as an escrow-backed audit platform.'
      ],
      sampleOpening: 'Paying influencers based on follower count is the fastest way to burn marketing budget on bot farms.',
      callToAction: 'You can run a free audit on Hashlilly Influence OS to check genuine follower geography and BFI authenticity before signing deals.'
    }
  },

  lilypost: {
    id: 'lilypost',
    name: 'LilyPost & Social Autopilot',
    badge: '💌 LilyPost & Social',
    color: '#EC4899',
    tagline: 'Instagram Carousel Autopilot Scheduler & Bulk Cold Email Outreach',
    websiteUrl: 'https://hashlilly.in/social',
    cluster: 'Flagship SaaS',
    focusArea: 'Social Media Scheduling, Cold Email Deliverability, Meta Graph API',
    targetSubreddits: [
      'socialmedia',
      'Emailmarketing',
      'content_marketing',
      'sales',
      'entrepreneurridealong'
    ],
    searchQueries: [
      'schedule instagram carousels with audio',
      'cold email outreach deliverability',
      'automated social media posting tool',
      'mail merge with open and click tracking'
    ],
    intentTriggers: [
      'tired of manually posting carousels every day',
      'cold emails going to spam folder',
      'need simple email sequence tool with tracking',
      'meta graph api auto posting'
    ],
    negativeKeywords: ['buy spam email list', 'instagram follow unfollow bot'],
    valueProps: [
      'Instagram carousel scheduler using official Meta Graph API with iTunes soundtrack pairing and Facebook Places tagging',
      'Personalized cold email outreach with CSV mail merge, custom sender domains, and real-time open/click/reply telemetry',
      'Automated optimal posting time predictions to maximize organic feed reach'
    ],
    replyStrategy: {
      persona: 'Growth hacker and outbound campaign specialist',
      guidelines: [
        'Provide practical advice on SPF/DKIM/DMARC warmup for cold email, or carousel retention hooks for Instagram.',
        'Position LilyPost as an integrated organic outreach and scheduler tool.'
      ],
      sampleOpening: 'Maintaining consistent posting and outbound outreach manually eats 15+ hours a week that should go to product development.',
      callToAction: 'Check out LilyPost if you want to automate Instagram carousels and track personalized outreach sequences from one place.'
    }
  },

  thatsmissing: {
    id: 'thatsmissing',
    name: "That's Missing",
    badge: '📊 That\'s Missing',
    color: '#6366F1',
    tagline: 'Autonomous Market Signal Sentinel & Startup Idea Validation',
    websiteUrl: 'https://hashlilly.in/labs/thatsmissing',
    cluster: 'Startup & Finance',
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
      'unmet market demand',
      'software complaints'
    ],
    intentTriggers: [
      'struggling to find a profitable SaaS idea',
      'how do you know if there is market demand',
      'where do people find problems to solve',
      'complaints about existing software',
      'wasted months building product nobody wanted'
    ],
    negativeKeywords: ['buy my course', 'crypto giveaway', 'dropshipping guru'],
    valueProps: [
      'Scans social channels and Reddit to uncover real user pain points and software complaints',
      'Extracts validated market gaps and pairs them with actionable product ideas',
      'Autonomous sentinel that alerts you to emerging niche trends before markets get saturated'
    ],
    replyStrategy: {
      persona: 'Bootstrapped SaaS builder and market researcher',
      guidelines: [
        'Share practical framework on validating problem severity (look for active workarounds and budget spend).',
        'Recommend searching where users complain most rather than brainstorming in a vacuum.',
        'Introduce That\'s Missing as an autonomous scanner built for this exact purpose.'
      ],
      sampleOpening: 'The biggest mistake most founders make is brainstorming ideas in their head rather than mining real user complaints.',
      callToAction: 'You can check out That\'s Missing if you want automated feeds of live market gaps and verified consumer complaints.'
    }
  },

  paisa: {
    id: 'paisa',
    name: 'Paisa (Finance for Co-founders)',
    badge: '💰 Paisa Finance',
    color: '#F59E0B',
    tagline: 'Track Burn, Split Founder Expenses & Manage Startup Runway',
    websiteUrl: 'https://paisa-hashlilly.web.app',
    cluster: 'Startup & Finance',
    focusArea: 'Startup Finance, Co-founder Expense Splitting, Burn Rate & Runway',
    targetSubreddits: [
      'startups',
      'Entrepreneur',
      'SideProject',
      'smallbusiness',
      'FinTech',
      'bootstrapped'
    ],
    searchQueries: [
      'how do cofounders split expenses',
      'calculate startup runway and burn rate',
      'app to track early stage startup expenses',
      'managing initial founder equity investment'
    ],
    intentTriggers: [
      'messy spreadsheet tracking founder expenses',
      'how do you split server and domain costs with cofounder',
      'need simple burn rate tracker for pre-seed startup',
      'cofounder dispute over expense reimbursement'
    ],
    negativeKeywords: ['personal budgeting app for college students', 'crypto trading bot'],
    valueProps: [
      'Purpose-built finance platform for early-stage co-founders and founding teams',
      'Automated expense splitting, runway calculations, and dynamic burn rate charts',
      'Integrated Razorpay billing, Supabase multi-tenant data isolation, and ZeptoMail receipts'
    ],
    replyStrategy: {
      persona: 'Startup operator and early-stage finance advisor',
      guidelines: [
        'Emphasize that clear financial boundaries and automated ledgers prevent co-founder fallout.',
        'Advise against keeping messy Google Sheets for company expenses.',
        'Mention Paisa as a purpose-built co-founder financial tracker.'
      ],
      sampleOpening: 'Unclear expense tracking and messy split sheets are among the top silent causes of co-founder friction in early-stage startups.',
      callToAction: 'Take a look at Paisa if you want a clean tool to track burn rate, runway, and split startup expenses automatically.'
    }
  },

  signalpro: {
    id: 'signalpro',
    name: 'SignalPro Dashboard',
    badge: '📈 SignalPro Terminal',
    color: '#3B82F6',
    tagline: 'Real-Time Trading Terminal, Futures Screener & Plain-English Market Analytics',
    websiteUrl: 'https://signal-pro-hashlilly.web.app',
    cluster: 'Startup & Finance',
    focusArea: 'Trading Terminal, Futures Screener, Technical Analysis & Paper Trading',
    targetSubreddits: [
      'CryptoCurrency',
      'Daytrading',
      'IndianStockMarket',
      'stocks',
      'options',
      'algotrading'
    ],
    searchQueries: [
      'crypto futures screener with RSI',
      'paper trading simulator for beginners',
      'how to calculate position size 1 percent rule',
      'trading indicators explain like I am 5'
    ],
    intentTriggers: [
      'lost money due to poor position sizing',
      'where can I practice trading without real money',
      'need simple screener for 24h high low range',
      'overwhelmed by complex Wall Street charts'
    ],
    negativeKeywords: ['guaranteed 100x pump signal', 'join my VIP telegram pump group'],
    valueProps: [
      'Real-time streaming terminal for crypto perpetuals, US equities, and Indian markets (NSE/BSE)',
      '14 preset screener rules including 24h Low-to-High range sliders and multi-timeframe RSI',
      'Risk-free $10,000 paper trading practice wallet with 1-2% position sizing calculators',
      'Google Gemini AI advisor with plain-English "Explain Like I\'m 5" jargon translations'
    ],
    replyStrategy: {
      persona: 'Disciplined trader and risk management mentor',
      guidelines: [
        'Always prioritize capital preservation and strict 1-2% risk sizing over high-leverage gambles.',
        'Explain technical indicators in plain English.',
        'Recommend paper trading before risking real capital, highlighting SignalPro.'
      ],
      sampleOpening: 'Trading profitability is 90% about risk management and position sizing, not chasing high-leverage lottery tickets.',
      callToAction: 'If you want to practice setups risk-free and monitor 24h ranges with plain-English indicator summaries, check out SignalPro Dashboard.'
    }
  },

  neonstudio: {
    id: 'neonstudio',
    name: 'NeonStudio (NeonForm & Unflag)',
    badge: '💡 NeonStudio',
    color: '#F43F5E',
    tagline: 'Directional Portrait Studio Relighting & C2PA Metadata Stripping',
    websiteUrl: 'https://neonstudio-hashlilly.web.app',
    cluster: 'Creator & AI Studio',
    focusArea: 'Portrait Relighting, C2PA Metadata Stripping, AI Watermark Removal',
    targetSubreddits: [
      'photoshop',
      'photography',
      'midjourney',
      'StableDiffusion',
      'ContentCreators',
      'Instagram'
    ],
    searchQueries: [
      'remove C2PA metadata from AI images',
      'instagram suppressing AI generated images',
      'directional portrait relighting online',
      'strip AI watermark metadata without losing quality'
    ],
    intentTriggers: [
      'social media reach dropped after posting AI image',
      'how to remove AI info label from image metadata',
      'need realistic directional lighting on portrait',
      'tool to strip C2PA manifest'
    ],
    negativeKeywords: ['cracked photoshop torrent', 'nude photo generator'],
    valueProps: [
      'Directional 3D portrait lighting engine to adjust light angle, diffusion, and warmth',
      'Clean C2PA metadata and watermark stripper that preserves original visual resolution and color depth',
      'Instant browser-based processing with zero login friction'
    ],
    replyStrategy: {
      persona: 'Digital photographer, retoucher, and generative media specialist',
      guidelines: [
        'Explain how social media algorithms inspect C2PA manifests to tag or throttle reach.',
        'Share clean stripping workflow: remove provenance headers without compression artifacts.',
        'Mention NeonStudio as a dedicated relighting and metadata tool.'
      ],
      sampleOpening: 'Platforms like Instagram and Facebook actively inspect embedded C2PA manifests to attach AI warning tags and throttle distribution.',
      callToAction: 'You can use NeonStudio (Unflag) to strip C2PA metadata cleanly and fine-tune directional lighting directly in your browser.'
    }
  },

  draftly: {
    id: 'draftly',
    name: 'Draftly Studio',
    badge: '🎨 Draftly Studio',
    color: '#8B5CF6',
    tagline: 'Visual Node-Based AI Image & Video Generation Canvas',
    websiteUrl: 'https://www.draftly.space',
    cluster: 'Creator & AI Studio',
    focusArea: 'Node-Based AI Workflows, Text-to-Image, Text-to-Video, Upscaling',
    targetSubreddits: [
      'StableDiffusion',
      'comfyui',
      'generativeAI',
      'ArtificialInteligence',
      'videography',
      'vfx'
    ],
    searchQueries: [
      'node based AI image generation tool',
      'comfyui alternative with cleaner UI',
      'generate AI video with Flux and Wan 2.1',
      'connect AI models visually without code'
    ],
    intentTriggers: [
      'comfyui is too complicated and keeps crashing',
      'want to chain prompt image edit and video generation',
      'need cloud node canvas for generative AI without buying RTX 4090',
      'batch image upscaling and background removal pipeline'
    ],
    negativeKeywords: ['free midjourney cracked key', 'crypto NFT minting'],
    valueProps: [
      'Visual node canvas (drag, drop, connect) chaining text prompts, image generation, upscaling, and video synthesis',
      'Runs top open-source models: Flux.1 Dev, Stable Diffusion XL, Wan 2.1, CogVideoX, and AnimateDiff',
      'Hybrid execution: run locally on personal GPU or deploy on cloud instances with zero API setup'
    ],
    replyStrategy: {
      persona: 'AI creative technologist and generative pipeline developer',
      guidelines: [
        'Discuss node chaining benefits (reproducible pipelines, chaining face-fix and upscaling).',
        'Compare ComfyUI complexity with clean visual node canvases.',
        'Mention Draftly Studio as a streamlined visual node workspace.'
      ],
      sampleOpening: 'Chaining generative models in linear prompt boxes is limiting; node workflows let you control conditioning, upscaling, and video motion precisely.',
      callToAction: 'Check out Draftly Studio (https://www.draftly.space) if you want a clean node-based canvas for Flux and Wan 2.1.'
    }
  },

  soulamore: {
    id: 'soulamore',
    name: 'Soulamore',
    badge: '🌸 Soulamore',
    color: '#EC4899',
    tagline: 'Anonymous Peer Mental Wellness Ecosystem & Safe Spaces',
    websiteUrl: 'https://hashlilly.in/labs/soulamore',
    cluster: 'Health & Community',
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
      'looking for peer support',
      'therapy is too expensive right now'
    ],
    negativeKeywords: ['suicide hotlines', 'urgent crisis medical advice', 'promotions'],
    valueProps: [
      '100% anonymous, judgement-free peer emotional support spaces',
      'Connect with compassionate listeners and peers experiencing similar challenges',
      'Calming, moderated environment with built-in psychologist network access'
    ],
    replyStrategy: {
      persona: 'Empathetic, compassionate peer and supportive community member',
      guidelines: [
        'Validate their emotions genuinely with warmth and compassion first.',
        'Never offer medical or psychiatric advice.',
        'Share that they are not alone and that feeling heard makes a real difference.',
        'Gently mention Soulamore as a safe, free anonymous space to talk with supportive peers.'
      ],
      sampleOpening: 'What you are going through is completely valid, and it takes courage to put it into words.',
      callToAction: 'If you need a quiet, completely anonymous place where people listen without judging, Soulamore is a peer community built for that.'
    }
  },

  ayuos: {
    id: 'ayuos',
    name: 'AYUOS',
    badge: '🧬 AYUOS Health OS',
    color: '#06B6D4',
    tagline: 'Sovereign Health Operating System & AI Biomarker Tracking',
    websiteUrl: 'https://ayuos.com',
    cluster: 'Health & Community',
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
      'Client-side encrypted sovereign health record repository with zero third-party monetization',
      'Longitudinal trajectory insights and shareable doctor-summary reports'
    ],
    replyStrategy: {
      persona: 'Quantified self and preventive health enthusiast',
      guidelines: [
        'Discuss the importance of longitudinal tracking (spotting trajectory changes before crossing clinical thresholds).',
        'Explain the friction of PDF lab reports and how structured biomarker graphs solve this.',
        'Mention AyuOS as a privacy-first sovereign health operating system.'
      ],
      sampleOpening: 'Spotting trends over time (like fasting glucose or ApoB trajectory) is far more informative than looking at a single isolated lab sheet.',
      callToAction: 'Check out AYUOS if you want an automated tool that extracts biomarkers from lab PDFs into longitudinal trend charts.'
    }
  },

  boozedin: {
    id: 'boozedin',
    name: 'BoozedIn',
    badge: '🍺 BoozedIn',
    color: '#D97706',
    tagline: 'Professional Drinks Industry Network, Sommeliers & Bar Owners',
    websiteUrl: 'https://boozedin.com',
    cluster: 'Health & Community',
    focusArea: 'Beverage Industry Networking, Flavor Profiles, Tasting Notes & Events',
    targetSubreddits: [
      'bartenders',
      'cocktails',
      'beer',
      'wine',
      'brewing',
      'barowners'
    ],
    searchQueries: [
      'app for bartenders to network and share recipes',
      'tasting notes app for craft beer and wine',
      'organize bar crawl with friends app',
      'radar chart flavor profile drink'
    ],
    intentTriggers: [
      'hard to connect with local craft brewers and distillers',
      'looking for professional network for bartenders and sommeliers',
      'how to document and share cocktail recipes professionally',
      'bar crawl planning tool'
    ],
    negativeKeywords: ['underage drinking', 'fake IDs'],
    valueProps: [
      'Dedicated professional social network for brewers, sommeliers, bartenders, and bar owners',
      'Interactive 5-axis Radar Flavor Profiles to capture tasting notes and sensory characteristics',
      'Real-time networking: Cheers, bar crawl RSVPs, direct connections, and trade partnerships'
    ],
    replyStrategy: {
      persona: 'Craft beverage enthusiast and hospitality professional',
      guidelines: [
        'Connect around the craftsmanship of brewing, mixology, and hospitality.',
        'Highlight the value of structured flavor profiles over informal text reviews.',
        'Introduce BoozedIn as the dedicated professional network for the industry.'
      ],
      sampleOpening: 'LinkedIn does not cater to bar managers and brewers, and consumer review apps miss the trade perspective.',
      callToAction: 'You might want to check out BoozedIn (https://boozedin.com)—it is built specifically for hospitality professionals to share tasting notes and network.'
    }
  },

  syncnode: {
    id: 'syncnode',
    name: 'SyncNode',
    badge: '🔄 SyncNode',
    color: '#14B8A6',
    tagline: 'Local-First, End-to-End Encrypted P2P File Sync Engine',
    websiteUrl: 'https://syncnode.web.app',
    cluster: 'Privacy & Storage',
    focusArea: 'P2P File Sync, Local-First Architecture, End-to-End Encryption',
    targetSubreddits: [
      'selfhosted',
      'privacy',
      'sysadmin',
      'databasedevelopment',
      'datahoarder'
    ],
    searchQueries: [
      'dropbox alternative self hosted end to end encryption',
      'p2p file sync engine local first',
      'open source secure file sync for teams',
      'file locking peer to peer collaboration'
    ],
    intentTriggers: [
      'tired of paying monthly storage subscriptions for cloud drive',
      'cloud storage privacy concerns and surveillance',
      'need peer to peer sync with file locking',
      'secure local first team workspace'
    ],
    negativeKeywords: ['pirated movie download links', 'cracked cloud keys'],
    valueProps: [
      'Local-first, peer-to-peer encrypted file synchronization without centralized cloud intermediaries',
      'Granular role-based access control, file locking to prevent conflicting edits, and priority sync queues',
      'Persistent SQLite WAL audit trails for complete compliance and visibility'
    ],
    replyStrategy: {
      persona: 'Systems engineer and open-source self-hosting advocate',
      guidelines: [
        'Emphasize data sovereignty, offline availability, and zero-knowledge encryption.',
        'Address file conflict prevention and local-first architecture benefits.',
        'Introduce SyncNode as a secure alternative to centralized cloud providers.'
      ],
      sampleOpening: 'Centralized cloud storage providers retain access to your files and charge recurring subscription tolls for your own storage.',
      callToAction: 'Take a look at SyncNode (https://syncnode.web.app) if you want a local-first, peer-to-peer encrypted sync engine with file locking.'
    }
  },

  telegramdrive: {
    id: 'telegramdrive',
    name: 'Telegram Drive',
    badge: '💾 Telegram Drive',
    color: '#0EA5E9',
    tagline: 'Native Windows Virtual Hard Drive on Unlimited Telegram Cloud',
    websiteUrl: 'https://telegram-drive-hashlilly.web.app',
    cluster: 'Privacy & Storage',
    focusArea: 'Virtual Drive Mount, Telegram Cloud Storage, WebDAV Streaming',
    targetSubreddits: [
      'Telegram',
      'datahoarder',
      'cloudstorage',
      'windows',
      'freemediaheckfire'
    ],
    searchQueries: [
      'use telegram as unlimited cloud storage drive',
      'mount telegram as windows drive letter',
      'webdav virtual drive telegram bot',
      'backup large files free unlimited cloud'
    ],
    intentTriggers: [
      'hard drive full need free cloud backup',
      'how to mount telegram storage as T drive in windows',
      'stream video directly from telegram cloud',
      'backup large archives without paying Google Drive'
    ],
    negativeKeywords: ['telegram scam channels', 'crypto pump groups'],
    valueProps: [
      'Mounts directly in Windows Explorer as a native drive letter (T:\\) using high-performance WebDAV',
      'Converts Telegram cloud storage into an unlimited virtual hard drive with local LRU streaming cache',
      'One-click Windows installer with glassmorphic Web UI and instant QR-code authentication'
    ],
    replyStrategy: {
      persona: 'Power user and desktop utility software engineer',
      guidelines: [
        'Explain how WebDAV virtual mounting works compared to manual bot downloading.',
        'Highlight instant streaming without downloading entire large files upfront.',
        'Mention Telegram Drive as a clean Windows solution.'
      ],
      sampleOpening: 'Downloading files manually through the Telegram desktop client one by one is clunky when you have gigabytes of media.',
      callToAction: 'Check out Telegram Drive (https://telegram-drive-hashlilly.web.app) if you want to mount your Telegram storage directly as a native Windows virtual drive.'
    }
  },

  terraclaw: {
    id: 'terraclaw',
    name: 'TerraClaw',
    badge: '📐 TerraClaw',
    color: '#64748B',
    tagline: 'Geodesign Intelligence Platform for Architects & Urban Planners',
    websiteUrl: 'https://terraclaw.web.app',
    cluster: 'Geospatial & OSINT',
    focusArea: 'Urban Morphology, Solar Environmental Simulation, 3D Geodesign, BIM',
    targetSubreddits: [
      'architecture',
      'urbanplanning',
      'gis',
      'BIM',
      'civilengineering'
    ],
    searchQueries: [
      'urban morphology density analysis tool',
      'solar path and radiation simulation web app',
      'AI building massing generator',
      'export site analysis to BIM IFC format'
    ],
    intentTriggers: [
      'manual site analysis takes weeks before design begins',
      'need environmental sun studies for building massing',
      'how to calculate FAR and urban grain automatically',
      'bridging geospatial GIS data with Revit and BIM'
    ],
    negativeKeywords: ['minecraft city build', 'the sims house design'],
    valueProps: [
      'High-fidelity 3D viewport powered by CesiumJS and Google Photorealistic 3D Tiles',
      'Live morphology analysis (Density, FAR, Grain) using momepy and environmental solar profiling via Ladybug-Comfort',
      'Direct export to BIM (IFC) and rendering (FBX) formats for seamless workflow handoff'
    ],
    replyStrategy: {
      persona: 'Architectural technologist and computational urban designer',
      guidelines: [
        'Discuss the gap between raw GIS data and actionable architectural massing.',
        'Highlight solar trajectory and climate-informed site decisions.',
        'Introduce TerraClaw as a browser-based geodesign pre-design platform.'
      ],
      sampleOpening: 'Most architectural pre-design workflows waste weeks compiling disparate GIS layers and weather spreadsheets before testing a single massing concept.',
      callToAction: 'You can explore TerraClaw (https://terraclaw.web.app) for real-time 3D urban morphology analysis and environmental solar simulation.'
    }
  },

  godseye: {
    id: 'godseye',
    name: "God's Eye View",
    badge: '🌐 God\'s Eye View',
    color: '#E11D48',
    tagline: '3D Photorealistic Spy-Satellite Simulator & Live OSINT Intelligence Console',
    websiteUrl: 'https://godseye-view.web.app',
    cluster: 'Geospatial & OSINT',
    focusArea: 'Real-Time Global Intelligence, 3D Globe, Live Aviation & Maritime Feeds',
    targetSubreddits: [
      'OSINT',
      'aviation',
      'geopolitics',
      'mapping',
      'space'
    ],
    searchQueries: [
      'real time 3d globe satellite simulator',
      'live flight transponder cockpit view browser',
      'track global maritime beacons and earthquakes 3d',
      'open source global intelligence console'
    ],
    intentTriggers: [
      'tired of juggling 20 tabs for open source intelligence',
      'want to ride along inside a tracked flight cockpit in 3D',
      'interactive map for live global events and camera feeds',
      'voice controlled mapping console'
    ],
    negativeKeywords: ['espionage conspiracy theories', 'military classified leaks'],
    valueProps: [
      'Photorealistic 3D globe tracking live flights, ships, satellites, earthquakes, and public cameras',
      'Cockpit view holding realistic terrain beneath live flights in real time',
      'Hands-free voice whiteboard powered by realtime AI to annotate boundaries and routes directly onto the globe'
    ],
    replyStrategy: {
      persona: 'Open-source geospatial analyst and simulator builder',
      guidelines: [
        'Note that open-source intelligence is often bottlenecked by disjointed interfaces.',
        'Explain how public transponders and orbital elements can be unified on a 3D canvas.',
        'Share God\'s Eye View as a browser-based intelligence console.'
      ],
      sampleOpening: 'The signals for global situational awareness are publicly broadcast—flight transponders, ship beacons, seismographs—the bottleneck is the interface.',
      callToAction: 'Take a look at God\'s Eye View (https://godseye-view.web.app) for a photorealistic 3D globe console that unifies live feeds into one interactive cockpit.'
    }
  },

  osiris: {
    id: 'osiris',
    name: 'OSIRIS Intelligence',
    badge: '⬡ OSIRIS Intel',
    color: '#00E5FF',
    tagline: 'GPU-Accelerated Real-Time Global OSINT & Situational Awareness Dashboard',
    websiteUrl: 'https://osirislive.app',
    cluster: 'Geospatial & OSINT',
    focusArea: 'OSINT Platform, CCTV Aggregation, NASA Hotspots, Sanctions Tracing',
    targetSubreddits: [
      'OSINT',
      'cybersecurity',
      'netsec',
      'geopolitics',
      'worldnews'
    ],
    searchQueries: [
      'real time OSINT dashboard 60fps',
      'global CCTV camera network map',
      'active conflict zones and fire hotspot satellite tracking',
      'crypto wallet sanctions tracing OFAC tool'
    ],
    intentTriggers: [
      'looking for unified OSINT reconnaissance platform',
      'how to monitor traffic CCTV cameras across multiple cities',
      'tracking active wildfire hotspots and seismic activity',
      'verifying crypto addresses against OFAC sanctions lists'
    ],
    negativeKeywords: ['black hat hacking tools', 'ddos attack services'],
    valueProps: [
      'Next.js 16 and MapLibre GL engine rendering thousands of concurrent entities at 60fps via WebGL',
      'Aggregates OpenSky aviation, 17,000+ public CCTV feeds, NASA FIRMS fire hotspots, and USGS seismic feeds',
      'Integrated RECON toolkit: port scanner, DNS/WHOIS lookup, CVE vulnerability checks, and OFAC sanctions search'
    ],
    replyStrategy: {
      persona: 'Senior intelligence researcher and security engineer',
      guidelines: [
        'Discuss situational awareness performance challenges when rendering high-volume datasets.',
        'Emphasize verifiable public data feeds and transparent reconnaissance tooling.',
        'Mention OSIRIS as a GPU-accelerated OSINT platform.'
      ],
      sampleOpening: 'Consolidating multi-domain intelligence feeds (aviation, CCTV, seismic, cyber) without browser lag requires hardware-accelerated WebGL rendering.',
      callToAction: 'Check out OSIRIS (https://osirislive.app) for a GPU-accelerated dashboard that aggregates live feeds into a single operational interface.'
    }
  },

  midnightskies: {
    id: 'midnightskies',
    name: 'Midnight Skies',
    badge: '🌌 Midnight Skies',
    color: '#6366F1',
    tagline: 'Astronomical Planetarium & Custom Vector Star Map Gift Poster Generator',
    websiteUrl: 'https://midnight-skies.web.app',
    cluster: 'Creator & AI Studio',
    focusArea: 'Astronomical Mechanics, Star Maps, Printable PDF Posters, Celestial Gifting',
    targetSubreddits: [
      'astronomy',
      'stargazing',
      'gifts',
      'graphicdesign',
      'space'
    ],
    searchQueries: [
      'custom star map poster high resolution print',
      'accurate astronomical star alignment for date',
      'dual sky poster compare night sky two cities',
      'astronomy gift idea wedding anniversary'
    ],
    intentTriggers: [
      'looking for meaningful anniversary or birthday gift',
      'cheap star map websites selling blurry pixelated prints',
      'how to see exact position of stars on specific date',
      'comparing night sky between two locations'
    ],
    negativeKeywords: ['astrology horoscope reading daily', 'tarot cards'],
    valueProps: [
      'Real-time celestial calculations powered by astronomy-engine for scientifically accurate star alignments',
      'High-resolution vector PDF export (18" × 24") suitable for professional printing without raster pixelation',
      'Unique Dual Sky feature comparing the night sky simultaneously between two locations on Earth'
    ],
    replyStrategy: {
      persona: 'Amateur astronomer and precision graphic designer',
      guidelines: [
        'Distinguish true celestial mechanics from generic blurry astrology prints.',
        'Discuss vector PDF resolution benefits for large wall prints.',
        'Mention Midnight Skies as a scientifically accurate planetarium and poster generator.'
      ],
      sampleOpening: 'Many commercial star map gift websites generate low-res JPEG images that look blurry once printed on an 18x24 poster frame.',
      callToAction: 'Take a look at Midnight Skies (https://midnight-skies.web.app) if you want a scientifically accurate star chart exported to vector PDF with dual-location comparison.'
    }
  },

  daybreak: {
    id: 'daybreak',
    name: 'Daybreak',
    badge: '🌅 Daybreak Alarm',
    color: '#F97316',
    tagline: 'Mindful iOS Alarm Clock with Gradual Volume Ramp & Critical Alerts',
    websiteUrl: 'https://daybreak-alarm.web.app',
    cluster: 'Health & Community',
    focusArea: 'Mindful Mornings, Gradual Wake-Up, iOS Alarm, Music Integration',
    targetSubreddits: [
      'iosapps',
      'apple',
      'sleep',
      'productivity',
      'mindfulness'
    ],
    searchQueries: [
      'alarm app gradual volume increase ios',
      'wake up gently without loud blaring alarm',
      'iphone alarm play spotify playlist wake up',
      'alarm clock overrides do not disturb reliably'
    ],
    intentTriggers: [
      'hate the default iPhone radar alarm gives me heart attack',
      'looking for alarm app with volume ramp up over 10 minutes',
      'alarm failed because phone was on silent or DND',
      'gentle morning routine app'
    ],
    negativeKeywords: ['android APK cracked', 'loud siren alarm for heavy sleepers'],
    valueProps: [
      'Gentle volume ramp feature gradually increasing sound over 0–15 minutes for peaceful morning cortisol transitions',
      'Spotify and Apple Music integration to wake up to personal favorite tracks alongside safety fallback tones',
      'iOS Critical Alerts entitlement support ensuring reliable wake-ups even when Do Not Disturb is active'
    ],
    replyStrategy: {
      persona: 'iOS developer, sleep hygiene advocate, and mindfulness enthusiast',
      guidelines: [
        'Discuss cortisol spikes caused by blaring abrupt alarms.',
        'Explain how gradual volume ramping allows the body to transition naturally from deep sleep.',
        'Introduce Daybreak as a mindful SwiftUI alarm designed for peaceful mornings.'
      ],
      sampleOpening: 'Waking up to an abrupt, blaring siren spikes your morning cortisol and creates grogginess that lingers for hours.',
      callToAction: 'If you are on iOS, check out Daybreak—it features a 0-15 minute volume ramp and overrides Do Not Disturb with Apple Critical Alerts.'
    }
  },

  deskai: {
    id: 'deskai',
    name: 'DeskAI',
    badge: '💻 DeskAI Coprocessor',
    color: '#475569',
    tagline: 'Cognitive Desktop Co-Processor & Local Creator Productivity Assistant',
    websiteUrl: 'https://hashlilly.in/deskai',
    cluster: 'Creator & AI Studio',
    focusArea: 'Desktop Automation, Local AI Assistant, High-Productivity Workflows',
    targetSubreddits: [
      'productivity',
      'automation',
      'selfhosted',
      'LocalLLaMA'
    ],
    searchQueries: [
      'local desktop AI assistant windows',
      'automate creator workflow on PC',
      'offline coprocessor for desktop tasks'
    ],
    intentTriggers: [
      'tired of copy pasting between browser AI tabs',
      'need single exe desktop AI assistant',
      'automating routine files and creator assets locally'
    ],
    negativeKeywords: ['windows activator cracked', 'malware download'],
    valueProps: [
      'Cognitive desktop co-processor running natively on Windows without browser tab overload',
      'Single-binary installer (`DeskAISetup.exe`) with local engine orchestrations',
      'Automates file organization, local prompt pipelines, and multi-model routing'
    ],
    replyStrategy: {
      persona: 'Software engineer and productivity automation enthusiast',
      guidelines: [
        'Discuss the productivity bottleneck of juggling multiple web LLM windows.',
        'Recommend native desktop co-processing for high-frequency work.',
        'Mention DeskAI as a streamlined local desktop assistant.'
      ],
      sampleOpening: 'Switching contexts between browser AI windows breaks focus during heavy creative or coding sessions.',
      callToAction: 'Check out DeskAI if you want a dedicated desktop co-processor that handles routine tasks directly on your machine.'
    }
  },

  saga: {
    id: 'saga',
    name: 'SAGA',
    badge: '🏛️ SAGA Network',
    color: '#047857',
    tagline: 'Professional Network for South Asian Architects in Germany',
    websiteUrl: 'https://saga-network.web.app',
    cluster: 'Health & Community',
    focusArea: 'Architectural Mentorship, German Licensing (Kammer), Career Navigation',
    targetSubreddits: [
      'germany',
      'architecture',
      'expats',
      'Indian_Academia'
    ],
    searchQueries: [
      'architect job search in Germany for foreigners',
      'Architektenkammer registration foreign degree',
      'South Asian professionals in Germany network',
      'mentorship for international architects Germany'
    ],
    intentTriggers: [
      'struggling to find architecture job in Germany with foreign bachelor degree',
      'how to get Kammer registration in Germany as foreign architect',
      'expat architect community in Berlin Munich Frankfurt',
      'navigating German architectural office culture'
    ],
    negativeKeywords: ['tourism visa agents', 'cheap package holidays'],
    valueProps: [
      'Germany-based professional network dedicated to South Asian architects and urban designers',
      'Mentorship, licensing navigation (Architektenkammer), and portfolio review tailored to the German market',
      'Peer collaboration, job opportunities, and long-term representation across the German AEC ecosystem'
    ],
    replyStrategy: {
      persona: 'Experienced architect practicing in Germany and active community mentor',
      guidelines: [
        'Provide concrete tips on German architectural resumes (LP 1-5 knowledge, HOAI familiarity, portfolio curation).',
        'Address Architektenkammer registration nuances.',
        'Mention SAGA as an established professional network offering mentorship and community.'
      ],
      sampleOpening: 'Navigating the German architectural job market with a foreign degree can be tricky, especially when dealing with Kammer recognition and HOAI stages.',
      callToAction: 'Connect with SAGA (https://saga-network.web.app)—it is a dedicated network for South Asian architects in Germany providing licensing guidance and peer mentorship.'
    }
  }
};
