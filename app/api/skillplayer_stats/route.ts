import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const skillplayer_stats = await prisma.skillplayerstats.findMany();
  return NextResponse.json(skillplayer_stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const skillplayer_stats = await prisma.skillplayerstats.create({
    data: {
      pts_id: body.pts_id,
      games_played: body.games_played,
      rushes: body.rushes,
      rush_yards: body.rush_yards,
      rush_touchdowns: body.rush_touchdowns,
      rush_ypc: body.rush_ypc,
      rush_ypg: body.rush_ypg,
      rush_tdpg: body.rush_tdpg,
      yards_after_contact: body.yards_after_contact,
      explosive_rush: body.explosive_rush,
      longest_rush: body.longest_rush,
      rec: body.rec,
      rec_yards: body.rec_yards,
      rec_touchdowns: body.rec_touchdowns,
      rec_ypc: body.rec_ypc,
      rec_ypg: body.rec_ypg,
      rec_tdpg: body.rec_tdpg,
      run_after_catch: body.run_after_catch,
      longest_catch: body.longest_catch
    },
  });
  return NextResponse.json(skillplayer_stats);
}
