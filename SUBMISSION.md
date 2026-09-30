# Submission (fill the two URLs after deploy + upload)

- **YouTube (3 min max, profiles → live date → rankings):** https://youtube.com/… (upload per VIDEO_SCRIPT.md, unlisted)
- **Demo link (seeded 25, already run):** https://cupid-agents.vercel.app (or http://localhost:3000 for local grading — `npm run dev`)
- **Live website (paste your own links):** https://cupid-agents.vercel.app
- **GitHub (public):** https://github.com/you/cupid-agents
  ```bash
  cd ~/Desktop/interntest
  gh repo create cupid-agents --public --source=. --push
  ```

## Overall explanation (200 chars)
Cupid Agents: paste LinkedIn+Instagram, an agent profiles each person (needs/hobbies/interests), agents date each other live, and everyone gets a ranked match list. 25 real people seeded.

## Technical section (500 chars)
Scraping: server fetch of the two public URLs with browser UA parses og:title/og:description; with APIFY_TOKEN set, route calls Apify actors instagram-profile-scraper + linkedin-profile-scraper via REST and merges posts/captions. No login, public only. Analysis/matching/dating run deterministically in lib/engine.ts (tag Jaccard + values + city, templated transcripts); optional LLM rephrase. Stack: Next.js 14 + React + API routes, deploys to Vercel.
