import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const all_americans = await prisma.allamericans.findMany();
  return NextResponse.json(all_americans);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const all_american = await prisma.allamericans.create({
    data: {
      all_american_id: body.all_american_id,
      pts_id: body.pts_id,
      team_level: body.team_level,
    },
  });
  return NextResponse.json(all_american);
}
