import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const seasons = await prisma.$queryRaw`
    SELECT 
    s.season_id, 
    s.team_id, 
    s.coach_id,
    c.name AS coach_name,
    t.name AS team_name,
    s.year
    FROM seasons s
    JOIN teams t ON s.team_id = t.team_id
    JOIN coaches c ON s.coach_id = c.coach_id
    `;
  return NextResponse.json(seasons);
}
