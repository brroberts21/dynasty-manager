import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { season_id: string } }
) {
  const { season_id } = await params;
  const games = await prisma.$queryRaw`
    SELECT 
      g.game_id,
      g.season_id,
      g.team_id,
      g.opponent_id,
      g.team_score,
      g.opponent_score,
      g.location,
      g.occasion,
      g.rivalry,
      g.week,
      t.name as team_name,
      o.name as opponent_name
    FROM games g 
    LEFT JOIN teams t on g.team_id = t.team_id
    LEFT JOIN teams o on g.opponent_id = o.team_id
    WHERE g.season_id = ${season_id}
  `;
  return NextResponse.json(games);
}
