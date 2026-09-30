"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Inner() {
  const sp = useSearchParams();
  const [people, setPeople] = useState<any[]>([]);
  const [forId, setForId] = useState(sp.get("for") || "sam-altman");
  const [rows, setRows] = useState<any[]>([]);
  useEffect(()=>{ fetch("/api/people").then(r=>r.json()).then(d=>setPeople(d.people)); }, []);
  useEffect(()=>{ if(forId) fetch(`/api/match?for=${forId}`).then(r=>r.json()).then(d=>setRows(d.ranking||[])); }, [forId]);
  const me = people.find(p=>p.id===forId);
  return (
    <>
      <h1 style={{margin:"4px 0"}}>Rankings — who fits each person best</h1>
      <div className="card"><label>Rank matches for</label>
        <select value={forId} onChange={e=>setForId(e.target.value)}>{people.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>
        {me && <p className="sub">{me.name} · {me.tagline} · wants: {me.lookingFor}</p>}
      </div>
      <div className="card" style={{marginTop:12}}>
        {rows.map((r,i)=>(<div className="rankrow" key={r.person.id}>
          <div><b>#{i+1} <Link href={`/profile/${r.person.id}`}>{r.person.name}</Link></b> <span className="chip">{r.score}/100</span>
            <div className="sub" style={{fontSize:13}}>{r.reasons.join(" · ")}</div>
            <div className="bar" style={{width:260, maxWidth:"100%"}}><div style={{width:`${r.score}%`}}/></div></div>
          <div className="row"><Link href={`/dates?a=${forId}&b=${r.person.id}`}><button className="btn2">watch date</button></Link></div>
        </div>))}
      </div>
    </>
  );
}
export default function Rankings(){ return <Suspense><Inner/></Suspense>; }
