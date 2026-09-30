import { NextResponse } from "next/server";
import { allPeople } from "@/lib/engine";
export async function GET() {
  return NextResponse.json({ people: allPeople(), count: 25 });
}
