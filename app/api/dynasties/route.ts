import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  const dynasties = await prisma.dynasties.findMany();
  return NextResponse.json(dynasties);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const dynasty = await prisma.dynasties.create({
    data: {
      dynasty_id: body.dynasty_id,
      name: body.name,
      is_active: body.is_active
    },
  });
  return NextResponse.json(dynasty);
}
