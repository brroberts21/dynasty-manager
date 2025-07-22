import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const games = await prisma.games.findMany();
  return NextResponse.json(games);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const games = await prisma.games.create({
      data: {
        game_id: body.game_id,
        season_id: body.season_id,
        team_id: body.team_id,
        opponent_id: body.opponent_id,
        team_score: body.team_score,
        opponent_score: body.opponent_score,
        week: body.week,
        location: body.location,
        occasion: body.occasion,
        rivalry: body.rivalry,
        conference: body.conference,
      },
    });
    return NextResponse.json({ success: true, data: games });
  } catch (error) {
    console.error("Error creating game:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create game",
      },
      { status: 500 }
    );
  }
}
