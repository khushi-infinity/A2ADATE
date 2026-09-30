"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type P = { id:string; name:string; role:string; location:string; linkedin:string; instagram:string; tagline:string; bio:string; needs:string[]; hobbies:string[]; interests:string[]; qualities:string[]; values:string[]; tags:string[]; vibe:string; lookingFor:string; agentName:string; };

export default function Home() {
  const [people, setPeople] = useState<P[]>([]);
  const [q, setQ] = useState("");
  const [li, setLi] = useState("");
  const [ig, setIg] = useState("");
  const [fresh, setFresh] = useState<any>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => { fetch("/api/people").then(r=>r.json()).then(d=>setPeople(d.people)); }, []);
  const list = useMemo(()=> people.filter(p => (p.name+p.role+p.tagline).toLowerCase().includes(q.toLowerCase())), [people,q]);

  async function addPerson(e: React.FormEvent) {
    e.preventDefault(); setMsg("Agent reading LinkedIn + Instagram…");
    const r = await fetch("/api/analyze", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ linkedin: li, instagram: ig }) });
    const d = await r.json();
    if (d.person) { setFresh(d.person); setPeople(p=>[d.person, ...p]); setMsg(`Agent done: ${d.person.name} (${d.meta?.mode})`); setLi(""); setIg(""); }
    else setMsg("Could not analyze — paste a linkedin.com/in/ + instagram.com/ link.");
  }

  return (
    <>
      <div className="hero">
        <div className="card">
          <div className="flow"><span className="chip">LinkedIn + Instagram in</span><span className="chip">agent reads → profile</span><span className="chip">agents date</span><span className="chip">rankings out</span></div>
          <h1>Every person gets an <span className="grad">agent</span> that dates for them.</h1>
          <p className="sub">Paste two official links per person — a LinkedIn and a public Instagram. The agent reads both, publishes a profile (needs · hobbies · interests), then dates every other agent. Watch the dates, then open per-person rankings.</p>
          <div className="row" style={{marginTop:12}}>
            <Link href="/dates"><button className="btn">▶ Watch agents date</button></Link>
            <Link href="/rankings"><button className="btn2">See rankings</button></Link>
          </div>
          <p className="sub" style={{fontSize:13}}>Seeded with 25 real public people below. Demo video flow: paste links → profile page → dating arena → rankings.</p>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>＋ Add a person (live)</h3>
          <form onSubmit={addPerson} style={{display:"grid", gap:10}}>
            <div><label>LinkedIn URL</label><input value={li} onChange={e=>setLi(e.target.value)} placeholder="https://www.linkedin.com/in/…" required /></div>
            <div><label>Public Instagram URL</label><input value={ig} onChange={e=>setIg(e.target.value)} placeholder="https://www.instagram.com/…" required /></div>
            <button className="btn" type="submit">Analyze → create agent</button>
          </form>
          <p className="sub" style={{fontSize:13}}>{msg}</p>
          {fresh && <div style={{fontSize:13}}>New agent: <b>{fresh.agentName}</b> — <Link href={`/profile/${fresh.id}`}>open profile →</Link></div>}
        </div>
      </div>

      <div className="row" style={{marginTop:18}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${people.length} people…`} style={{maxWidth:340}} />
        <span className="chip">{list.length} agents live</span>
      </div>
      <div className="grid">
        {list.map(p => (
          <div className="pcard" key={p.id}>
            <div className="avatar">{p.name.split(" ").map(w=>w[0]).slice(0,2).join("")}</div>
            <div>
              <h3><Link href={`/profile/${p.id}`}>{p.name}</Link></h3>
              <p>{p.role} · {p.location}</p>
              <p>🤖 {p.agentName} · {p.vibe}</p>
              <div className="links"><a href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={p.instagram} target="_blank" rel="noreferrer">Instagram</a><Link href={`/profile/${p.id}`}>profile →</Link></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
