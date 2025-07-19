import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { Dynasty, Coach, Team, Season } from "@/app/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { dynasty, coach, team, season } = body;

    // Use a transaction to ensure all operations succeed or fail together
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Dynasty
      const createdDynasty = await tx.dynasties.create({
        data: {
          name: dynasty.name,
          is_active: dynasty.is_active,
        },
      });

      // 2. Create Coach
      const createdCoach = await tx.coaches.create({
        data: {
          name: coach.name,
          offensive_style: coach.offensive_style,
          defensive_style: coach.defensive_style,
        },
      });

      // 3. Create Team
      const createdTeam = await tx.teams.create({
        data: {
          name: team.name,
          conference: team.conference,
          city: team.city,
          state: team.state,
          latitude: team.latitude,
          longitude: team.longitude,
          primary_color: team.primary_color,
          secondary_color: team.secondary_color,
          tertiary_color: team.tertiary_color,
          logo_url: team.logo_url,
        },
      });

      // 4. Create Season with the IDs from previous operations
      const createdSeason = await tx.seasons.create({
        data: {
          year: season.year,
          team_id: createdTeam.team_id,
          coach_id: createdCoach.coach_id,
          coach_role: season.coach_role,
          offensive_overall: season.offensive_overall,
          defensive_overall: season.defensive_overall,
          wins: season.wins,
          losses: season.losses,
          final_rank: season.final_rank,
          conf_champ: season.conf_champ,
          bowl_game: season.bowl_game,
          championship: season.championship,
          recruiting_rank: season.recruiting_rank,
        },
      });

      // 5. Create DynastyState with all the IDs
      const createdDynastyState = await tx.dynastystate.create({
        data: {
          dynasty_id: createdDynasty.dynasty_id,
          current_coach_id: createdCoach.coach_id,
          current_season_id: createdSeason.season_id,
          current_team_id: createdTeam.team_id,
        },
      });

      return {
        dynasty: createdDynasty,
        coach: createdCoach,
        team: createdTeam,
        season: createdSeason,
        dynastyState: createdDynastyState,
      };
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error creating dynasty:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create dynasty",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
