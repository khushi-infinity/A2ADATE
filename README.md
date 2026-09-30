# 💘 Cupid Agents — agentic dating site

Each person is represented by an agent. Agents date each other.

## Run
```bash
cd interntest
npm install
npm run dev   # http://localhost:3000
```

## Flow (matches the test spec)
1. **Paste links in** — home page form takes `linkedin.com/in/…` + `instagram.com/…` → `POST /api/analyze`
2. **Agent reads** — open-graph fetch + (optional) Apify actors, then deterministic agent inference → profile page with needs · hobbies · interests · qualities · values + reading trace
3. **Agents date** — `/dates` picks A × B → `POST /api/date` returns animated transcript + verdict + score
4. **Rankings** — `/rankings?for=<id>` → `GET /api/match?for=<id>` ranks all 24 others per person

## Seeded demo: 25 real public people
See `data/seed-meta.ts` — Sam Altman, Alexis Ohanian, Gary Vee, Melanie Perkins, Neil Patel, Tim Ferriss, MKBHD, Sara Blakely, Brian Chesky, Tony Fadell, Julie Zhuo, Garry Tan, iJustine, Lenny Rachitsky, Ankur Warikoo, Sahil Bloom, Jessica Alba, Reshma Saujani, Katrina Lake, Bozoma Saint John, Allie Miller, Alex Morgan, Payal Kadakia, Naval, Whitney Wolfe Herd. Each with LinkedIn + public Instagram.

## Tech — scraping
- Default (works now, no keys): server-side `fetch` of the two public URLs with a browser UA, parse `<title>` / `og:title` / `og:description`, then heuristic agent analysis in `lib/engine.ts`.
- Upgrade (prod): set `APIFY_TOKEN` → `app/api/analyze/route.ts` calls Apify actors `apify/instagram-profile-scraper` + `apify/linkedin-profile-scraper` via REST, merges captions/posts into the same profile schema. Optional `OPENAI_API_KEY` can rephrase transcripts.
- Nothing else is read. Private profiles rejected by design.

## Deploy
```bash
npx vercel --prod   # or push to GitHub → Vercel import
gh repo create cupid-agents --public --source=. --push
```

## Video
See `VIDEO_SCRIPT.md` — 3:00 script: profiles first, then live date, then rankings.
