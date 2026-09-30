import Link from "next/link";
import { allPeople } from "@/lib/engine";

export default function Profile({ params }: { params: { id: string } }) {
  const people = allPeople();
  const p = people.find(x => x.id === params.id);
  if (!p) return <div className="card">Unknown person. <Link href="/">Back</Link></div>;
  return (
    <>
      <Link href="/">← all agents</Link>
      <div className="two" style={{marginTop:12}}>
        <div className="card">
          <h1 style={{margin:"4px 0"}}>{p.name}</h1>
          <p className="sub">{p.role} · {p.location}<br/>{p.tagline}</p>
          <p>{p.bio}</p>
          <div className="links"><a href={p.linkedin} target="_blank" rel="noreferrer">LinkedIn: {p.linkedin}</a><a href={p.instagram} target="_blank" rel="noreferrer">Instagram: {p.instagram}</a></div>
          <h4>🤖 {p.agentName}</h4>
          <p className="sub">{p.agentPersona}</p>
          <p className="sub"><b>Vibe:</b> {p.vibe}<br/><b>Looking for:</b> {p.lookingFor}</p>
          <div className="row" style={{marginTop:10}}>
            <Link href={`/dates?a=${p.id}`}><button className="btn">Date as {p.name.split(" ")[0]}</button></Link>
            <Link href={`/rankings?for=${p.id}`}><button className="btn2">Ranking for {p.name.split(" ")[0]}</button></Link>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Agent analysis — from LinkedIn + Instagram only</h3>
          <b>Needs</b>{p.needs.map(n=><span className="tag" key={n}>{n}</span>)}
          <div style={{height:8}}/>
          <b>Hobbies</b>{p.hobbies.map(n=><span className="tag" key={n}>{n}</span>)}
          <div style={{height:8}}/>
          <b>Interests</b>{p.interests.map(n=><span className="tag" key={n}>{n}</span>)}
          <div style={{height:8}}/>
          <b>Qualities</b>{p.qualities.map(n=><span className="tag" key={n}>{n}</span>)}
          <div style={{height:8}}/>
          <b>Values</b>{p.values.map(n=><span className="tag" key={n}>{n}</span>)}
          <h4>Reading trace</h4>
          <p className="sub"><b>LinkedIn read:</b><br/>{p.linkedinSignals.join(" · ")}</p>
          <p className="sub"><b>Instagram read:</b><br/>{p.instagramSignals.join(" · ")}</p>
        </div>
      </div>
    </>
  );
}
