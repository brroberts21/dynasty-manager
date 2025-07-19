import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const kicker_stats = await prisma.kickerstats.findMany();
  return NextResponse.json(kicker_stats);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const kicker_stats = await prisma.kickerstats.create({
    data: {
      pts_id: body.pts_id,
      fgm: body.fgm,
      fga: body.fga,
      fg_pct: body.fg_pct,
      longest_fg: body.longest_fg,
      xpm: body.xpm,
      xpa: body.xpa,
      xp_pct: body.xp_pct
    },
  });
  return NextResponse.json(kicker_stats);
}
