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

## 🎯 Target Project Matrix & Focus

| Project | Primary Focus Area | Monitored Subreddits | Intent Triggers |
| :--- | :--- | :--- | :--- |
| **🌿 Hashlilly (Resume Engine & ATS Hub)** | AI Resume Builder, ATS Score Optimizer, Job Description Tailoring, STAR Metrics | `r/resumes`, `r/jobs`, `r/careerguidance`, `r/recruitinghell`, `r/cscareerquestions`, `r/EngineeringResumes`, `r/jobsearchhacks` | "applied to 200 jobs 0 callbacks", "ATS friendly resume", "ATS score checker", "tailor resume to JD", "2-column resume failure" |
| **📊 That's Missing** | Autonomous Market Signal Sentinel & Startup Validation | `r/startups`, `r/Entrepreneur`, `r/SideProject`, `r/SaaS`, `r/IndieHackers`, `r/roastmystartup` | "how to find SaaS ideas", "validate startup idea", "unaddressed software complaints", "market gaps" |
| **🌸 Soulamore** | Anonymous Peer Mental Wellness Ecosystem & Safe Spaces | `r/mentalhealth`, `r/anxiety`, `r/lonely`, `r/depression_help`, `r/KindVoice`, `r/CasualConversation` | "need someone to talk to", "feeling isolated/overwhelmed", "anonymous place to vent", "safe emotional space" |
| **🧬 AYUOS** | Sovereign Health OS & AI Biomarker Tracking | `r/Biohackers`, `r/QuantifiedSelf`, `r/HealthIT`, `r/digitalhealth`, `r/Fitness`, `r/longevity` | "track blood tests over time", "organize lab PDF reports", "extract biomarkers with OCR", "E2EE health records" |

---

## 🛡️ Value-First Anti-Spam Strategy

Reddit communities aggressively filter self-promotion and bots. The Sentinel enforces a **Value-First Conversational Protocol**:
1. **80% Organic Help Upfront**: Solves the user's specific problem in expert, empathetic language (e.g. diagnosing why multi-column resumes break ATS parsers).
2. **20% Contextual Product Introduction**: Naturally introduces your tool as a free/helpful resource.
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

```bash
# Scan specifically for Hashlilly Resume Engine
npm run scan:hashlilly

# Scan specifically for That's Missing
npm run scan:thatsmissing

# Scan specifically for Soulamore
npm run scan:soulamore

# Scan specifically for AYUOS
npm run scan:ayuos

# Scan across all studio ventures
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
