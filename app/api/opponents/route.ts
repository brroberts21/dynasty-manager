import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const opponents = await prisma.opponents.findMany();
  return NextResponse.json(opponents);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const opponents = await prisma.opponents.create({
    data: {
      opponent_id: body.opponent_id,
      name: body.name,
      conference: body.conference,
      city: body.city,
      state: body.state,
      longitude: body.longitude,
      latitude: body.latitude
    },
  });
  return NextResponse.json(opponents);
}
