import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest, { params }: { params: { season_id: string } }) {
  const seasonId = parseInt(params.season_id);
  const recruits = await prisma.recruits.findMany({
    where: { season_id: seasonId },
  });
  return NextResponse.json(recruits);
}
