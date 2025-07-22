import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  const team = await prisma.teams.findUnique({
    where: { team_id: parseInt(params.team_id) },
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  return NextResponse.json(team);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  const team = await prisma.teams.findUnique({
    where: { team_id: parseInt(params.team_id) },
  });

  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const body = await request.json();

  const updatedTeam = await prisma.teams.update({
    where: { team_id: team.team_id },
    data: {
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
      stadium: body.stadium,
    },
  });

  return NextResponse.json(updatedTeam);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { team_id: string } }
) {
  const team = await prisma.teams.delete({
    where: { team_id: parseInt(params.team_id) },
  });
  return NextResponse.json(team);
}
