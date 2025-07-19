import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const coaches = await prisma.coaches.findMany();
  return NextResponse.json(coaches);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const coach = await prisma.coaches.create({
    data: {
      coach_id: body.coach_id,
      name: body.name,
      offensive_style: body.offensive_style,
      defensive_style: body.defensive_style
    },
  });
  return NextResponse.json(coach);
}
