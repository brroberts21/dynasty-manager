import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const drafted = await prisma.drafted.findMany();
  return NextResponse.json(drafted);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const drafted = await prisma.drafted.create({
    data: {
      drafted_id: body.drafted_id,
      player_id: body.player_id,
      round: body.round
    },
  });
  return NextResponse.json(drafted);
}
