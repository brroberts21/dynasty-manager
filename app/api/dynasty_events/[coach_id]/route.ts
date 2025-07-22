import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { coach_id: string } }
) {
  const { coach_id } = params;

  const events = await prisma.dynastyevents.findMany({
    where: {
      coach_id: parseInt(coach_id),
    },
    orderBy: [{ year: "asc" }],
  });

  const timeOrder = ["Preseason", "Season", "Postseason", "Offseason"];

  const sorted = events.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return timeOrder.indexOf(a.time || "") - timeOrder.indexOf(b.time || "");
  });

  return NextResponse.json(sorted);
}
