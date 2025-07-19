import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const players = await prisma.players.findMany();
  return NextResponse.json(players);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const player = await prisma.players.create({
    data: {
      player_id: body.player_id,
      name: body.name,
      jersey_number: body.jersey_number,
      position: body.position,
      archetype: body.archetype,
      dev: body.dev,
      height: body.height,
      weight: body.weight
    },
  });
  return NextResponse.json(player);
}
