import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.imdbapi.dev";

export async function GET(_req: NextRequest) {
  const apiRes = await fetch(`${BASE_URL}/titles`);
  const data = await apiRes.json();

  return NextResponse.json(data);
}
