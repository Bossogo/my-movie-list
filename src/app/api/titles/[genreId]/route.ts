import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.imdbapi.dev";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET( _req: NextRequest, {params}: RouteContext) {
    const { id } = await params;
    const apiRes = await fetch(`${BASE_URL}/titles?interestIds=${encodeURIComponent(id)}`);
    const data = await apiRes.json();

    return NextResponse.json(data);
}
