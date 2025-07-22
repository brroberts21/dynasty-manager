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
      header: body.header,
      description: body.description,
      time: body.time,
      coach_id: body.coach_id,
      year: body.year
    },
  });
  return NextResponse.json(dynasty_event);
}
