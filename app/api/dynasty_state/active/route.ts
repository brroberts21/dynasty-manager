import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const dynasty_state = await prisma.$queryRaw`
    SELECT 
    ds.dynasty_id, 
    ds.current_season_id, 
    ds.current_team_id, 
    ds.current_coach_id,
    c.name AS coach_name,
    t.name AS team_name,
    s.year,
    s.overall,
    SUM(CASE WHEN g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN g.team_score < g.opponent_score THEN 1 ELSE 0 END) AS losses,
    d.is_active
    FROM dynastystate ds
    JOIN teams t ON ds.current_team_id = t.team_id
    JOIN coaches c ON ds.current_coach_id = c.coach_id
    JOIN seasons s ON ds.current_season_id = s.season_id
    JOIN dynasties d ON ds.dynasty_id = d.dynasty_id
    JOIN games g ON s.season_id = g.season_id
    WHERE d.is_active = true
    GROUP BY ds.dynasty_id, ds.current_season_id, ds.current_team_id, ds.current_coach_id, c.name, t.name, s.year, s.overall, d.is_active
    `;
  return NextResponse.json(dynasty_state);
}
