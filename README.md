# ⚡ Reddit Growth & Lead Sentinel Agent

> Autonomous AI-driven Reddit growth engine that scans high-intent communities, identifies prospective users seeking solutions, categorizes leads across your venture suite, and crafts authentic, value-first conversion replies.

[![Live Demo](https://img.shields.io/badge/Live_App-Firebase_Hosting-blue?style=for-the-badge&logo=firebase)](https://reddit-lead-sentinel.web.app)
[![Node Version](https://img.shields.io/badge/Node.js-v20%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-purple?style=for-the-badge)](LICENSE)

---

## 🌐 Live Production Deployment

- **Primary Web App**: [https://reddit-lead-sentinel.web.app](https://reddit-lead-sentinel.web.app)
- **Firebase Mirror**: [https://reddit-lead-sentinel.firebaseapp.com](https://reddit-lead-sentinel.firebaseapp.com)
- **Local Dashboard**: `http://localhost:3800`

---

## 🌟 Core Architecture & Capabilities

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      REDDIT INGESTION SENTINEL                          │
│  - Multi-Subreddit RSS Atom Ingestion (r/resumes, r/jobs, r/startups)   │
│  - Anti-Rate-Limit Throttling & Deduplication Cache                     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     AI CLASSIFICATION & INTENT SCORING                  │
│  - Multi-Project Knowledge Base (Hashlilly, ThatsMissing, Soulamore)    │
│  - Multi-Tier LLM Gateway (OpenRouter -> LLM Router Hub -> Direct)      │
│  - 0–100 Conversion Scoring & Pain Point Extraction                     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              INTERACTIVE GLASSMORPHIC LEAD DASHBOARD & CLI              │
│  - 1-Click "Copy Reply & Open Reddit" (Anti-Spam Optimized)             │
│  - Real-time Lead Inbox with Multi-Project Filtering                    │
│  - Background Autonomous Daemon (Every 30 mins)                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Target Project Matrix & Clusters (20 Ventures)

### 1. Career, Talent & Creator Growth
| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **🌿 Hashlilly (Resume Engine & ATS Hub)** | AI Resume Builder, ATS Score Optimizer, JD Tailoring, STAR Metrics | `r/resumes`, `r/jobs`, `r/careerguidance`, `r/recruitinghell`, `r/cscareerquestions`, `r/EngineeringResumes` | 0 callbacks, ATS rejection, multi-column template failure, resume tailoring |
| **⭐ Hashlilly Influence OS** | Influencer Marketing OS, Brand Fit Index (BFI), Fake Follower Audit, Escrow | `r/influencermarketing`, `r/Instagrammarketing`, `r/ecommerce`, `r/marketing`, `r/smallbusiness` | influencer ROI calculator, spotting fake followers, influencer contract template |
| **📱 LilyPost & Social** | Social Media Scheduler, Carousel Publishing, Cold Email Mail Merge | `r/socialmediamarketing`, `r/content_marketing`, `r/digitalmarketing`, `r/Emailmarketing`, `r/smallbusiness` | free carousel scheduler, schedule Instagram carousel without watermark, cold email mail merge |
| **🏛️ SAGA** | Network for South Asian Architects & Designers in Germany (Kammer Registration) | `r/germany`, `r/IndiansInGermany`, `r/architecture`, `r/berlin`, `r/munich` | architect registration in Germany, Anerkennung architect degree Germany, Architektenkammer approval |

### 2. Startup Validation, SaaS & Finance
| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **📊 That's Missing** | Autonomous Market Signal Sentinel & Startup Validation | `r/startups`, `r/Entrepreneur`, `r/SideProject`, `r/SaaS`, `r/IndieHackers`, `r/roastmystartup` | how to find SaaS ideas, validate startup idea, unaddressed software complaints |
| **💰 Paisa** | Co-Founder Expense Splitting, Runway Calculator & Financial Health Tracker | `r/startups`, `r/Entrepreneur`, `r/smallbusiness`, `r/IndiaInvestments`, `r/SaaS` | split expenses between cofounders, startup runway calculator, tracking founder equity dilution |
| **📈 SignalPro Dashboard** | Real-Time Market Terminal, Futures Screener, $10k Paper Trading, ELI5 Gemini Summaries | `r/Daytrading`, `r/stocks`, `r/options`, `r/cryptocurrency`, `r/algotrading`, `r/wallstreetbets` | free real-time futures screener, paper trading platform with realistic fills, crypto liquidation heatmap |
| **🖥️ DeskAI** | Desktop AI Co-Processor, Offline Workflows, Native Windows Hotkey | `r/productivity`, `r/software`, `r/windows`, `r/LocalLLaMA`, `r/ArtificialInteligence` | desktop AI assistant with local context, global hotkey AI wrapper, run models locally on Windows |

### 3. Creative AI & Media Tools
| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **🎨 NeonStudio / Unflag** | C2PA Metadata Stripper, AI Watermark Eraser, Directional Portrait Relighting | `r/StableDiffusion`, `r/midjourney`, `r/ArtificialInteligence`, `r/graphic_design`, `r/photoshop` | remove C2PA metadata from image, AI generated image flagged, portrait relighting tool |
| **🖌️ Draftly Studio** | Node-Based Visual AI Canvas (Flux.1 Dev, Wan 2.1, AnimateDiff) | `r/comfyui`, `r/StableDiffusion`, `r/AI_Art`, `r/generative`, `r/videoediting` | node based canvas for AI image gen, run Flux on local GPU, web alternative to ComfyUI |
| **🌌 Midnight Skies** | Celestial Planetarium, 300 DPI Vector PDF Star Map Posters, Dual-Sky Date Comparison | `r/astronomy`, `r/Stargazing`, `r/giftideas`, `r/weddingplanning`, `r/graphic_design` | custom star map high resolution printable, print your own star map vector PDF, anniversary star map |

### 4. Sovereign Health, Wellness & Community
| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **🌸 Soulamore** | Anonymous Peer Mental Wellness Ecosystem & Safe Spaces | `r/mentalhealth`, `r/anxiety`, `r/lonely`, `r/depression_help`, `r/KindVoice`, `r/CasualConversation` | need someone to talk to, feeling isolated or overwhelmed, anonymous place to vent |
| **🧬 AYUOS** | Sovereign Health OS, E2EE Medical Records & 50+ Biomarker OCR Tracking | `r/Biohackers`, `r/QuantifiedSelf`, `r/HealthIT`, `r/digitalhealth`, `r/Fitness`, `r/longevity` | track blood tests over time, organize lab PDF reports, extract biomarkers with OCR, E2EE health records |
| **🍷 BoozedIn** | Beverage Industry Professional Network, 5-Axis Radar Flavor Profiles | `r/bartenders`, `r/cocktails`, `r/beverage`, `r/distilling`, `r/sommelier` | beverage industry networking, cocktail flavor matrix database, radar chart for spirits tasting |
| **⏰ Daybreak** | Mindful iOS Alarm Clock (SwiftUI) with 0-15 Min Volume Ramp & Apple Critical Alerts | `r/iphone`, `r/sleep`, `r/productivity`, `r/iosapps`, `r/insomnia` | gentle alarm clock app iOS, alarm that ramps volume slowly, Spotify alarm clock app |

### 5. Privacy, Storage & P2P Systems
| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **🔒 SyncNode** | Local-First P2P E2EE File Sync Engine, Multi-Device Delta Sync, Zero Cloud Relay | `r/selfhosted`, `r/privacy`, `r/DataHoarder`, `r/sysadmin`, `r/opensource` | peer to peer file sync without third party cloud, Syncthing alternative with instant discovery |
| **💾 Telegram Drive** | Native Windows Virtual Drive Mount (T:\) on Unlimited Telegram Cloud Storage | `r/selfhosted`, `r/DataHoarder`, `r/piracy`, `r/Telegram`, `r/windows` | mount Telegram as local drive Windows, free cloud backup unlimited, Dokan drive wrapper Telegram |

### 6. Geospatial, OSINT & Surveillance
| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **🌍 TerraClaw** | Geodesign Intelligence Platform, CesiumJS 3D Photorealistic Tiles, FAR Density, BIM | `r/urbanplanning`, `r/gis`, `r/architecture`, `r/civilengineering`, `r/surveying` | 3D site analysis in browser, calculate FAR and setbacks on 3D terrain, CesiumJS photorealistic tiles |
| **🛰️ God's Eye View** | 3D Spy-Satellite Simulator & OSINT Globe (Live ADS-B Flights, AIS Ships, USGS Quakes) | `r/OSINT`, `r/aviation`, `r/maritime`, `r/geopolitics`, `r/intelligence` | real-time OSINT 3D globe tracker, ADS-B and AIS visualizer on one map, satellite pass predictor |
| **🛡️ OSIRIS Intelligence** | GPU WebGL Situational Awareness Dashboard (17,000+ CCTVs, FIRMS Fires, Sanctions) | `r/OSINT`, `r/homelandsecurity`, `r/geopolitics`, `r/infosec`, `r/disastermanagement` | public CCTV feeds map global, NASA FIRMS active fire layer webgl, live crisis situational awareness |

---

## 🛡️ Value-First Anti-Spam Strategy

Reddit communities aggressively filter self-promotion and bots. The Sentinel enforces a **Value-First Conversational Protocol**:
1. **80% Organic Help Upfront**: Solves the user's specific problem in expert, empathetic language (e.g. diagnosing why multi-column resumes break ATS parsers or explaining how CesiumJS handles 3D tiles).
2. **20% Contextual Product Introduction**: Naturally introduces your tool as an open, free, or founder-built resource to solve that exact pain point.
3. **Multi-Tone Switching**: Pre-generates responses in 3 distinct angles:
   - **⚡ Expert Breakdown**: In-depth technical breakdown and formatting best practices.
   - **🤝 Founder Casual**: Transparent builder perspective sharing lessons learned.
   - **📋 Actionable Checklist**: Rapid 3-bullet action plan.

---

## 🚀 Quick Start & Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/adityaharsh1101/reddit-growth-agent.git
cd reddit-growth-agent
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and supply your AI gateway keys:
```env
PORT=3800

# Tier 0: OpenRouter (Primary Fast Provider)
OPENROUTER_API_KEY="sk-or-v1-..."
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"
OPENROUTER_MODEL="google/gemini-2.0-flash-exp:free"

# Tier 1: LLM Router Gateway
LLM_ROUTER_GATEWAY_URL="https://api-eqegtlejaq-uc.a.run.app/v1"
LLM_HUB_API_KEY="router_..."
RESUME_HUB_API_KEY="router_..."
```

### 3. Launch Local Dashboard & API Server
```bash
npm run dev
```
Visit `http://localhost:3800` to interact with the glassmorphic lead inbox.

---

## ⚙️ CLI Commands

Run targeted scans for any of your 20 venture profiles:

```bash
# Career & Creator Suite
npm run scan:hashlilly       # Hashlilly Resume Engine
npm run scan:influenceos     # Hashlilly Influence OS
npm run scan:lilypost        # LilyPost & Social
npm run scan:saga            # SAGA German Architecture Network

# Startup & Finance Suite
npm run scan:thatsmissing    # That's Missing
npm run scan:paisa           # Paisa Co-Founder Expense Splitting
npm run scan:signalpro       # SignalPro Trading Terminal
npm run scan:deskai          # DeskAI Desktop Co-Processor

# Creative AI Suite
npm run scan:neonstudio      # NeonStudio / Unflag
npm run scan:draftly         # Draftly Studio
npm run scan:midnightskies   # Midnight Skies Star Maps

# Health & Community Suite
npm run scan:soulamore       # Soulamore
npm run scan:ayuos           # AYUOS Sovereign Health
npm run scan:boozedin        # BoozedIn Beverage Network
npm run scan:daybreak        # Daybreak iOS Alarm

# Privacy & Storage Suite
npm run scan:syncnode        # SyncNode P2P Sync
npm run scan:telegramdrive   # Telegram Drive (T:\)

# Geospatial & OSINT Suite
npm run scan:terraclaw       # TerraClaw Geodesign
npm run scan:godseye         # God's Eye View OSINT Globe
npm run scan:osiris          # OSIRIS Intelligence Dashboard

# Full scan across all ventures
npm run scan

# Run continuous background monitoring daemon (every 30 mins)
npm run watch-daemon
```

---

## ☁️ Firebase Deployment

Deploy to Firebase Hosting multi-site:
```bash
firebase deploy --only hosting:reddit-lead-sentinel
```

---

## 🏢 Corporate & Project Standards

- **Project Lead**: [Aditya Harsh](https://github.com/adityaharsh1101)
- **Protocol**: Built in compliance with `CORE_INTELLIGENCE/Architecture_and_Standards/INSTRUCTIONS/PROTOCOL.md`.
- **Master Manifest**: [`reports/ADITYA/MANIFEST.md`](file:///c:/Users/adity/Desktop/Projects/reddit-growth-agent/reports/ADITYA/MANIFEST.md)
