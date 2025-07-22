import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  const { team_id } = params;
  const opponents = await prisma.teams.findMany({
    where: {
      team_id: { not: parseInt(team_id) },
    },
  });

  return NextResponse.json(opponents);
}
