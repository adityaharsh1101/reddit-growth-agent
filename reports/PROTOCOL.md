# Universal Reporting Protocol (HARD) — reddit-growth-agent

> [!IMPORTANT]
> This protocol governs all AI agent modifications, architectural logs, and operational reports for the **Reddit Growth & Lead Sentinel Agent**.

## 📝 1. Reporting Requirements
1. Every active session MUST generate a sequential Markdown report under `reports/ADITYA/{AGENT_NAME}/`.
2. Format: `NNN_YYYY-MM-DD_AGENT_TYPE_Title.md` (e.g. `001_2026-09-02_ANTIGRAVITY_ARC_Reddit_Sentinel_Initialization.md`).
3. Update `reports/ADITYA/MANIFEST.md` upon completion of each task.

## 💎 2. UI & Design Standard
- Modern dark mode aesthetic, responsive cards, glassmorphic accents, clear visual hierarchy, accessible touch targets, and high contrast typography.

## 🛡️ 3. Security & Anti-Spam Guardrails
- **Zero Raw Secrets in Git**: Store keys in `.env` (ignored).
- **Anti-Spam Strategy**: Generate authentic, value-first Reddit replies that solve problems upfront and introduce tools contextually without spamming.
