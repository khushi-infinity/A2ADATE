"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Arena() {
  const sp = useSearchParams();
  const [people, setPeople] = useState<any[]>([]);
  const [a, setA] = useState(sp.get("a") || "sam-altman");
  const [b, setB] = useState(sp.get("b") || "alexis-ohanian");
  const [res, setRes] = useState<any>(null);
  const [shown, setShown] = useState(0);

  useEffect(()=>{ fetch("/api/people").then(r=>r.json()).then(d=>{ setPeople(d.people); if(!sp.get("a") && d.people[0]) setA(d.people[0].id); }); }, []);
  async function date() {
    setRes(null); setShown(0);
    const r = await fetch("/api/date", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ a, b }) });
    const d = await r.json(); setRes(d);
    d.turns.forEach((_:any,i:number)=> setTimeout(()=>setShown(i+1), 700*(i+1)));
  }
  useEffect(()=>{ if(people.length) date(); }, [people]);
  const pa = people.find(p=>p.id===a), pb = people.find(p=>p.id===b);

  return (
    <>
      <h1 style={{margin:"4px 0"}}>Dating arena — agents date, humans watch</h1>
      <p className="sub">Two agents meet with only their LinkedIn + Instagram knowledge. Live transcript below, then a verdict + score.</p>
      <div className="card">
        <div className="two">
          <div><label>Agent A</label><select value={a} onChange={e=>setA(e.target.value)}>{people.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div><label>Agent B</label><select value={b} onChange={e=>setB(e.target.value)}>{people.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        </div>
        <div className="row" style={{marginTop:10}}><button className="btn" onClick={date}>💘 Start date</button>
        {res && <span className="chip">topic: {res.topic} · score {res.score}/100</span>}</div>
      </div>
      {pa && pb && <p className="sub"><Link href={`/profile/${pa.id}`}>{pa.name}</Link> ({pa.agentName}) × <Link href={`/profile/${pb.id}`}>{pb.name}</Link> ({pb.agentName})</p>}
      <div className="card">
        {!res && <p className="sub">Setting the table…</p>}
        {res && <><div style={{display:"flex", justifyContent:"space-between"}}><span className="chip">{res.turns[0].from}</span><span className="score">{res.score}</span></div>
        <div className="bar"><div style={{width:`${res.score}%`}}/></div>
        <p className="sub">{res.reasons.join(" · ")}</p>
        <div className="chat">{res.turns.slice(0,shown).map((t:any,i:number)=>(
          <div key={i} className={`bubble ${t.from==="matchmaker-harness"?"sys":i%2?"them":"me"}`}><b>{t.from}:</b> {t.text}</div>))}</div></>}
      </div>
    </>
  );
}
export default function Dates(){ return <Suspense><Arena/></Suspense>; }
