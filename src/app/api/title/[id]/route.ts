import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.imdbapi.dev";

export async function GET(
  _req: NextRequest,
  context: { params: Record<string, string> }
) {
  const { id } = context.params;
  const apiRes = await fetch(`${BASE_URL}/titles/${encodeURIComponent(id)}`);
  const data = await apiRes.json();
  return NextResponse.json(data);
}
