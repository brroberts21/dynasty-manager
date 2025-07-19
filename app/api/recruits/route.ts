import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const recruits = await prisma.recruits.findMany();
  return NextResponse.json(recruits);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const recruits = await prisma.recruits.create({
    data: {
      recruit_id: body.recruit_id,
      season_id: body.season_id,
      name: body.name,
      position: body.position,
      archetype: body.archetype,
      height: body.height,
      weight: body.weight,
      state: body.state,
      stars: body.stars,
      gem: body.gem,
      bust: body.bust
    },
  });
  return NextResponse.json(recruits);
}
