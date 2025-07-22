import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { dynasty_id: string } }
) {
  const dynastyId = parseInt(params.dynasty_id);
  if (isNaN(dynastyId)) {
    return NextResponse.json({ error: "Invalid dynasty ID" }, { status: 400 });
  }
  try {
    await prisma.$transaction([
      prisma.dynasties.updateMany({
        where: { dynasty_id: { not: dynastyId } },
        data: { is_active: false },
      }),
      prisma.dynasties.update({
        where: { dynasty_id: dynastyId },
        data: { is_active: true },
      }),
    ]);

    return NextResponse.json({ message: "Dynasty activated" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to activate dynasty" },
      { status: 500 }
    );
  }
}
