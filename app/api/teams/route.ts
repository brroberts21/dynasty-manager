import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
    const teams = await prisma.teams.findMany();
    return NextResponse.json(teams);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const team = await prisma.teams.create({
        data: {
            team_id: body.team_id,
            name: body.name,
            conference: body.conference,
            city: body.city,
            state: body.state,
            latitude: body.latitude,
            longitude: body.longitude,
            primary_color: body.primary_color,
            secondary_color: body.secondary_color,
            tertiary_color: body.tertiary_color,
            logo_url: body.logo_url,
            stadium: body.stadium
        }
    });
    return NextResponse.json(team);
}
