import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.imdbapi.dev";

type RouteContext = {
  params: Promise<{ genreId: string }>;
};

export async function GET( _req: NextRequest, {params}: RouteContext) {
    const { genreId } = await params;
    const apiRes = await fetch(`${BASE_URL}/titles?interestIds=${encodeURIComponent(genreId)}`);
    const data = await apiRes.json();

    return NextResponse.json(data);
}
