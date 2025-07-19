import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
    const teams = await prisma.$queryRaw`
        SELECT 
            t.team_id,
            t.name,
            t.primary_color,
            t.secondary_color,
            t.tertiary_color
        FROM teams t
    `
    return NextResponse.json(teams);
}