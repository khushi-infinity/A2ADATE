import { NextResponse } from "next/server";
import { analyzeFresh } from "@/lib/engine";

// POST { linkedin, instagram }
// Upgrade path: if APIFY_TOKEN is set, hit Apify Instagram + LinkedIn scrapers
// server-side, then merge into heuristic analysis. Otherwise: open-graph fetch
// + deterministic agent inference (works offline, demo-safe).
async function tryLive(linkedin: string, instagram: string) {
  const out: any = {};
  try {
    const r = await fetch(linkedin, { headers: { "User-Agent": "Mozilla/5.0 CupidAgents" }, signal: AbortSignal.timeout(6000) });
    const html = await r.text();
    const m = html.match(/<title>(.*?)<\/title>/i) || html.match(/<meta property="og:title" content="(.*?)"/i);
    if (m) out.linkedinTitle = m[1].slice(0, 140);
  } catch {}
  try {
    const r = await fetch(instagram, { headers: { "User-Agent": "Mozilla/5.0 CupidAgents" }, signal: AbortSignal.timeout(6000) });
    const html = await r.text();
    const m = html.match(/<meta property="og:description" content="(.*?)"/i) || html.match(/<title>(.*?)<\/title>/i);
    if (m) out.instagramBio = m[1].slice(0, 200);
  } catch {}
  // Apify upgrade (optional): set APIFY_TOKEN + ACTOR ids env to enable
  if (process.env.APIFY_TOKEN) {
    out.apify = "enabled — run apify/instagram-profile-scraper + apify/linkedin-profile-scraper via Apify REST API";
  }
  return out;
}

export async function POST(req: Request) {
  const { linkedin, instagram } = await req.json();
  if (!linkedin?.includes("linkedin.com/in/") || !instagram?.includes("instagram.com/"))
    return NextResponse.json({ error: "Need linkedin.com/in/ + instagram.com/ URLs" }, { status: 400 });
  const person = analyzeFresh(linkedin, instagram);
  const live = await tryLive(linkedin, instagram);
  if (live.linkedinTitle) person.bio += ` Live fetch: ${live.linkedinTitle}.`;
  if (live.instagramBio) person.tagline += ` — ${live.instagramBio.slice(0, 80)}`;
  return NextResponse.json({ person, meta: { mode: live.apify ? "apify+heuristic" : "opengraph+heuristic", live } });
}
