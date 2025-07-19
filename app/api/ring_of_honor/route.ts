import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const ring_of_honor = await prisma.ringofhonor.findMany();
  return NextResponse.json(ring_of_honor);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const ring_of_honor = await prisma.ringofhonor.create({
    data: {
      ring_id: body.ring_id,
      player_id: body.player_id,
      description: body.description
    },
  });
  return NextResponse.json(ring_of_honor);
}
