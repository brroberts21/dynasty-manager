import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const pts = await prisma.playerteamseason.findMany();
  return NextResponse.json(pts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const pts = await prisma.playerteamseason.create({
    data: {
      pts_id: body.pts_id,
      player_id: body.player_id,
      team_id: body.team_id,
      season_id: body.season_id,
      position: body.position,
      initial_overall: body.initial_overall,
      final_overall: body.final_overall,
      year: body.year,
      redshirt: body.redshirt,
      role: body.role,
    },
  });
  return NextResponse.json(pts);
}
