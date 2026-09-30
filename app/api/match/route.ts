import { NextResponse } from "next/server";
import { allPeople, rankFor } from "@/lib/engine";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const forId = searchParams.get("for") || "sam-altman";
  const people = allPeople();
  if (!people.find(p=>p.id===forId)) return NextResponse.json({ error:"unknown id" }, { status:404 });
  return NextResponse.json({ for: forId, ranking: rankFor(forId, people) });
}
