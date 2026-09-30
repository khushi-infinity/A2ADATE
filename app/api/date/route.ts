import { NextResponse } from "next/server";
import { allPeople, simulateDate } from "@/lib/engine";
export async function POST(req: Request) {
  const { a, b } = await req.json();
  const people = allPeople();
  const pa = people.find(p=>p.id===a), pb = people.find(p=>p.id===b);
  if (!pa || !pb) return NextResponse.json({ error:"pick two valid agent ids" }, { status:400 });
  return NextResponse.json({ a: pa.id, b: pb.id, ...simulateDate(pa, pb) });
}
