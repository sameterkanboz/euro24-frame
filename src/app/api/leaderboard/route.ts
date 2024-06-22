import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  const leaderboard = await redis.zrange("leaderboard", 0, -1, {
    withScores: true,
    byScore: true,
  });
  return NextResponse.json(leaderboard);
}
