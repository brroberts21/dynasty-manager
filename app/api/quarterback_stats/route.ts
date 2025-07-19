import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const quarterback_stats = await prisma.quarterbackstats.findMany();
  return NextResponse.json(quarterback_stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const quarterback_stats = await prisma.quarterbackstats.create({
    data: {
      pts_id: body.pts_id,
      games_played: body.games_played,
      pass_yards: body.pass_yards,
      pass_touchdowns: body.pass_touchdowns,
      pass_attempts: body.pass_attempts,
      pass_completions: body.pass_completions,
      completion_percentage: body.completion_percentage,
      pass_ypa: body.pass_ypa,
      pass_ypc: body.pass_ypc,
      pass_ypg: body.pass_ypg,
      pass_tdpg: body.pass_tdpg,
      longest_pass: body.longest_pass,
      interceptions: body.interceptions,
      ti_ratio: body.ti_ratio,
      rushes: body.rushes,
      rush_yards: body.rush_yards,
      rush_touchdowns: body.rush_touchdowns,
      rush_ypa: body.rush_ypa,
      longest_rush: body.longest_rush,
      sacks: body.sacks
    },
  });
  return NextResponse.json(quarterback_stats);
}
