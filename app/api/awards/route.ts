import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const awards = await prisma.awards.findMany();
  return NextResponse.json(awards);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const award = await prisma.awards.create({
    data: {
      award_id: body.award_id,
      pts_id: body.pts_id,
      award_name: body.award_name,
    },
  });
  return NextResponse.json(award);
}
