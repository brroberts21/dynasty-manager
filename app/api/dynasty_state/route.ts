import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

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
  d.is_active
  FROM dynastystate ds
  JOIN teams t ON ds.current_team_id = t.team_id
  JOIN coaches c ON ds.current_coach_id = c.coach_id
  JOIN seasons s ON ds.current_season_id = s.season_id
  JOIN dynasties d ON ds.dynasty_id = d.dynasty_id
  `;
  return NextResponse.json(dynasty_state);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dynasty_state = await prisma.dynastystate.create({
    data: {
      dynasty_id: body.dynasty_id,
      current_coach_id: body.current_coach_id,
      current_season_id: body.current_season_id,
      current_team_id: body.current_team_id,
    },
  });
  return NextResponse.json(dynasty_state);
}
