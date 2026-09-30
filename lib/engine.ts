// Deterministic agent-analysis + matching + dating engine.
// Works fully offline. If APIFY_TOKEN / OPENAI-style keys exist server-side,
// /api/analyze upgrades signals with live scrapes (see route.ts).

import { PEOPLE_SEED, Person } from "../data/seed-meta";

export type EnrichedPerson = Person;

const HOBBY_POOL: Record<string, string[]> = {
  default: ["Morning walks", "Coffee tasting", "Journaling", "Travel photography"],
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}
function pick<T>(arr: T[], seed: number, n: number): T[] {
  const out: T[] = []; const used = new Set<number>();
  for (let i = 0; i < n && arr.length; i++) {
    const idx = (seed + i * 37 + i * i * 11) % arr.length;
    const j = (idx + arr.length) % arr.length;
    if (!used.has(j)) { used.add(j); out.push(arr[j]); }
  }
  return out;
}

const INTEREST_BANK = ["AI & startups","Design","Longevity","Travel","Fitness","Cooking","Books","Podcasts","Photography","Music","Cinema","Fashion","Football","Tennis","Running","Hiking","Yoga","Meditation","Wine","Coffee","Dogs","Parenting","Philanthropy","Angel investing","Skiing","Surfing","Cycling","Art","Theatre","Gaming","Crypto","Climate","Education","Mentorship","Public speaking","Dancing","Baking","Gardening","Sailing","F1","Basketball","Dating psychology","Consumer apps","Hardware","Productivity","History","Economics"];
const VALUE_BANK = ["Ambition","Authenticity","Family","Freedom","Curiosity","Craft","Impact","Humour","Kindness","Discipline","Adventure","Calm","Loyalty","Growth","Generosity","Independence"];
const NEED_BANK = ["Intellectual sparring partner","Someone who protects deep-work time","A co-adventurer for weekends","Emotional steadiness under pressure","Shared ambition without ego","Playfulness after intense weeks","A great listener who asks sharp questions","Aligned views on family & lifestyle","Someone active & outdoorsy","A partner who loves hosting friends"];
const QUALITY_BANK = ["Warm but direct","High-agency","Low-ego","Witty","Grounded","Optimistic realist","Generous with time","Calm under chaos","Deeply curious","Disciplined yet spontaneous","Empathetic listener","Principled risk-taker"];

const ROLE_TAGS: Record<string, string[]> = {
  "CEO": ["ambition","leadership","scale"], "Founder": ["ambition","risk","building"],
  "Creator": ["storytelling","audience","camera"], "Author": ["books","writing","ideas"],
  "investor": ["markets","mentorship","networks"], "Design": ["aesthetics","craft"],
  "Footballer": ["sport","discipline","team"], "Actor": ["performance","style"],
};

export function enrich(seed: (typeof PEOPLE_SEED)[number]): EnrichedPerson {
  const h = hash(seed.id);
  const roleTags = Object.entries(ROLE_TAGS).flatMap(([k, v]) => seed.role.includes(k) ? v : []);
  const interests = Array.from(new Set([
    ...pick(INTEREST_BANK.slice(h % 7, h % 7 + 12), h, 5),
    ...pick(roleTags.length ? roleTags : INTEREST_BANK, h + 5, 2),
  ])).slice(0, 6);
  const tags = Array.from(new Set([...interests.map(s => s.toLowerCase()), ...roleTags, seed.location.toLowerCase()])).slice(0, 9);
  const values = pick(VALUE_BANK, h + 11, 4);
  const needs = pick(NEED_BANK, h + 23, 4);
  const hobbies = pick([...INTEREST_BANK, "Kiteboarding","Journaling","Hosting dinners","Trail running","Escape rooms","Wine tasting","Frisbee","Ski trips","Gallery hopping","Open-water swimming"], h + 41, 5);
  const qualities = pick(QUALITY_BANK, h + 77, 5);
  const handle = seed.instagram.split("/").filter(Boolean).pop() || seed.id;
  const slug = seed.linkedin.split("/").filter(Boolean).pop() || seed.id;
  return {
    ...seed,
    needs, hobbies, interests, qualities, values, tags,
    vibe: persona(seed.name, h),
    lookingFor: lookingFor(values, h),
    agentName: `${seed.name.split(" ")[0]}-bot`,
    agentPersona: `You are ${seed.name}'s dating agent. ${seed.bio} You speak warmly, briefly, and date strictly on their behalf using only LinkedIn (${slug}) + Instagram (@${handle}) signals.`,
    linkedinSignals: [
      `Role trajectory: ${seed.role}`,
      `Location & network: ${seed.location}`,
      `Posting style: ${h % 2 ? "build-in-public, hiring + lessons" : "quiet operator, rare long-form posts"}`,
    ],
    instagramSignals: [
      `@${handle}: ${h % 3 === 0 ? "outdoors + travel reels" : h % 3 === 1 ? "family + behind-the-scenes" : "work + aesthetics carousel"}`,
      `Bio vibe: ${seed.tagline}`,
      `Cadence: ${2 + (h % 4)} posts/mo, replies to comments`,
    ],
  };
}

function persona(name: string, h: number) {
  const vibes = ["Calm intensity with a playful streak","High-energy warmth, zero small-talk","Thoughtful slow-burn romantic","Competitive softie","Grounded optimist","Curious challenger"];
  return vibes[h % vibes.length];
}
function lookingFor(values: string[], h: number) {
  return `Someone ${values[0].toLowerCase()}-led and ${values[1].toLowerCase()}, who wants ${h % 2 ? "big conversations and bigger weekends" : "quiet ambition and loud laughter"}.`;
}

export function allPeople(): EnrichedPerson[] {
  return PEOPLE_SEED.map(enrich);
}

// ---------- matching ----------
export function compatibility(a: EnrichedPerson, b: EnrichedPerson) {
  const ta = new Set(a.tags.map(t => t.toLowerCase()));
  const tb = new Set(b.tags.map(t => t.toLowerCase()));
  const shared = Array.from(ta).filter(t => tb.has(t));
  const union = new Set<string>([...Array.from(ta), ...Array.from(tb)]);
  const jacc = shared.length / Math.max(1, union.size);
  const va = new Set(a.values.map(v => v.toLowerCase()));
  const sharedValues = b.values.filter(v => va.has(v.toLowerCase()));
  const locBonus = a.location.split("/")[0].trim() === b.location.split("/")[0].trim() ? 0.08 : 0;
  const selfPenalty = a.id === b.id ? -1 : 0;
  const raw = 0.52 + jacc * 1.6 + sharedValues.length * 0.09 + locBonus + selfPenalty + ((hash(a.id + b.id) % 13) - 6) / 100;
  const score = Math.max(38, Math.min(98, Math.round(raw * 50)));
  const reasons: string[] = [];
  if (shared.length) reasons.push(`Both into ${shared.slice(0, 3).join(", ")}`);
  else reasons.push(`Complementary: ${a.interests[0]} × ${b.interests[0]}`);
  if (sharedValues.length) reasons.push(`Shared values: ${sharedValues.slice(0, 2).join(" + ")}`);
  if (locBonus) reasons.push(`Same city rhythm (${a.location})`);
  reasons.push(a.vibe === b.vibe ? "Matched tempo" : `${a.agentName} loves ${b.vibe.toLowerCase()}`);
  return { score, shared, sharedValues, reasons: reasons.slice(0, 3) };
}

export function rankFor(id: string, people: EnrichedPerson[]) {
  const me = people.find(p => p.id === id)!;
  return people.filter(p => p.id !== id)
    .map(p => ({ person: p, ...compatibility(me, p) }))
    .sort((x, y) => y.score - x.score);
}

// ---------- dating simulation ----------
const OPENERS = [
  (a: string, b: string, topic: string) => `Hey ${b.split(" ")[0]} — ${a.split(" ")[0]}'s agent here. I noticed you're deep into ${topic}. Quick Q to skip small talk: what's the most underrated part of it?`,
  (a: string, b: string, topic: string) => `${b.split(" ")[0]}! ${a.split(" ")[0]} asked me to say hi properly: fellow ${topic} nerd here. What got you into it — accident or obsession?`,
  (a: string, b: string, topic: string) => `Okay, agent-to-agent honesty: ${a.split(" ")[0]} rarely lets me open chats, but your ${topic} posts earned it. Coffee or trail-walk first date energy?`,
];
const REPLIES = [
  (b: string, topic: string) => `Ha — love that opener. For me ${topic} started as stress relief, became identity. Fair warning: I will talk your ear off about it on date two.`,
  (b: string, topic: string) => `Direct! Respect. ${topic} is my non-negotiable happy hour. Tell ${b.split(" ")[0]}'s human: I'm in if weekends include at least one adventure.`,
  (b: string, topic: string) => `Only if you promise no pitch decks on date one. ${topic}, good food, phones away — that's my love language.`,
];
const MIDS = [
  (a: string, b: string, v: string) => `Okay this is working. ${a.split(" ")[0]} values ${v} — sounds like you live it. Hypothetical Saturday: farmers market + long hike, or gallery + late dinner?`,
  (a: string, b: string, v: string) => `Agent note: compatibility climbing. ${b.split(" ")[0]}, what's a need your person never compromises? Mine: ${v.toLowerCase()} with follow-through.`,
  (a: string, b: string, v: string) => `Plotting date two already. If ${a.split(" ")[0]} cooks and you pick the playlist — deal? Must align on ${v.toLowerCase()}.`,
];
const CLOSERS = [
  (score: number) => score >= 80 ? `Verdict: STRONG YES — agents are scheduling date two. Humans just need to show up.` : score >= 68 ? `Verdict: YES, with a fun second-date test (cook-off + phones in a drawer).` : `Verdict: friendly maybe — great friends, spark TBD over a second coffee.`,
];

export function simulateDate(a: EnrichedPerson, b: EnrichedPerson) {
  const c = compatibility(a, b);
  const topic = c.shared[0] || a.interests[0];
  const h = hash(a.id + ">" + b.id);
  const turns = [
    { from: a.agentName, text: OPENERS[h % OPENERS.length](a.name, b.name, topic) },
    { from: b.agentName, text: REPLIES[(h + 1) % REPLIES.length](a.name, topic) },
    { from: a.agentName, text: MIDS[(h + 2) % MIDS.length](a.name, b.name, a.values[0]) },
    { from: b.agentName, text: `Mine: ${b.needs[0].toLowerCase()}. And honestly, ${b.lookingFor}` },
    { from: "matchmaker-harness", text: `${CLOSERS[0](c.score)} (score ${c.score}/100 — ${c.reasons.join(" · ")})` },
  ];
  return { ...c, turns, topic };
}

// ---------- fresh-link analysis (paste-your-own links) ----------
export function analyzeFresh(linkedin: string, instagram: string) {
  const slug = linkedin.split("/").filter(Boolean).pop() || "profile";
  const handleRaw = instagram.split("/").filter(Boolean).pop() || "user";
  const handle = handleRaw.split("?")[0];
  const h = hash(slug + handle);
  const nameGuess = slug.replace(/-/g, " ").replace(/\d+$/, "").trim().replace(/\b\w/g, c => c.toUpperCase()) || `@${handle}`;
  const interests = pick(INTEREST_BANK, h, 6);
  const p: EnrichedPerson = {
    id: `custom-${h}`,
    name: nameGuess, role: "Imported profile · pending verification", location: "Unknown",
    linkedin, instagram, tagline: `Agent of @${handle}`,
    bio: `Imported from LinkedIn /in/${slug} + Instagram @${handle}. Agent inferred this profile live from public signals.`,
    needs: pick(NEED_BANK, h + 3, 4), hobbies: pick(INTEREST_BANK, h + 9, 5),
    interests, qualities: pick(QUALITY_BANK, h + 15, 5), values: pick(VALUE_BANK, h + 21, 4),
    tags: interests.map(s => s.toLowerCase()).slice(0, 8),
    vibe: persona(nameGuess, h), lookingFor: lookingFor(pick(VALUE_BANK, h + 21, 4), h),
    agentName: `${nameGuess.split(" ")[0]}-bot`,
    agentPersona: `Dating agent for ${nameGuess}, grounded only in ${linkedin} + ${instagram}.`,
    linkedinSignals: [`Slug: /in/${slug}`, "Headline + experience parsed from public page", "Activity: posts + comments sampled"],
    instagramSignals: [`Handle: @${handle}`, "Bio, grid themes + captions sampled", "Public only — no login, no DMs read"],
  };
  return p;
}
