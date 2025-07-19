import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const dynasty_events = await prisma.dynastyevents.findMany();
  return NextResponse.json(dynasty_events);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dynasty_event = await prisma.dynastyevents.create({
    data: {
      event_id: body.event_id,
      dynasty_id: body.dynasty_id,
      description: body.description,
      coach_id: body.coach_id,
      year: body.year
    },
  });
  return NextResponse.json(dynasty_event);
}
