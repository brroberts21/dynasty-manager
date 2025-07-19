import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const defensive_stats = await prisma.defensivestats.findMany();
  return NextResponse.json(defensive_stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
    const defensive_stats = await prisma.defensivestats.create({
    data: {
      pts_id: body.pts_id,
      tackles: body.tackles,
      tfl: body.tfl,
      sacks: body.sacks,
      interceptions: body.interceptions,
      fumbles_forced: body.fumbles_forced,
      touchdowns: body.touchdowns
    },
  });
  return NextResponse.json(defensive_stats);
}
