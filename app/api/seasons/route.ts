import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const seasons = await prisma.seasons.findMany();
  return NextResponse.json(seasons);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const season = await prisma.seasons.create({
    data: {
      season_id: body.season_id,
      team_id: body.team_id,
      coach_id: body.coach_id,
      coach_role: body.coach_role,
      year: body.year,
      offensive_overall: body.offensive_overall,
      defensive_overall: body.defensive_overall,
      overall: body.overall,
      wins: body.wins,
      losses: body.losses,
      final_rank: body.final_rank,
      conf_champ: body.conf_champ,
      bowl_game: body.bowl_game,
      championship: body.championship,
      recruiting_rank: body.recruiting_rank,
    },
  });
  return NextResponse.json(season);
}
