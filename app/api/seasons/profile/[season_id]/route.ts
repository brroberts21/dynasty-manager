import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { season_id: string } }
) {
  const { season_id } = await params;
  try {
    const season = await prisma.$queryRaw`
      SELECT 
      s.season_id,
      s.year,
      s.team_id,
      t.name AS team_name,
      s.coach_id,
      c.name AS coach_name,
      s.coach_role,
      s.offensive_overall,
      s.defensive_overall,
      s.overall,
      
      -- Derived wins/losses
      SUM(CASE WHEN g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS wins,
      SUM(CASE WHEN g.team_score < g.opponent_score THEN 1 ELSE 0 END) AS losses,
      ROUND(
          SUM(CASE WHEN g.team_score > g.opponent_score THEN 1 ELSE 0 END) / 
          NULLIF(COUNT(g.game_id), 0),
          3
      ) AS win_pct,

      -- Home/Away breakdown
      SUM(CASE WHEN g.location = 'home' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS home_wins,
      SUM(CASE WHEN g.location = 'home' AND g.team_score < g.opponent_score THEN 1 ELSE 0 END) AS home_losses,
      ROUND(
          SUM(CASE WHEN g.location = 'home' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) /
          NULLIF(SUM(CASE WHEN g.location = 'home' THEN 1 ELSE 0 END), 0),
          3
      ) AS home_win_pct,

      SUM(CASE WHEN g.location = 'away' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS away_wins,
      SUM(CASE WHEN g.location = 'away' AND g.team_score < g.opponent_score THEN 1 ELSE 0 END) AS away_losses,
      ROUND(
          SUM(CASE WHEN g.location = 'away' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) /
          NULLIF(SUM(CASE WHEN g.location = 'away' THEN 1 ELSE 0 END), 0),
          3
      ) AS away_win_pct,

      -- Conference breakdown
      SUM(CASE WHEN g.conference = TRUE AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS conf_wins,
      SUM(CASE WHEN g.conference = TRUE AND g.team_score < g.opponent_score THEN 1 ELSE 0 END) AS conf_losses,
      ROUND(
          SUM(CASE WHEN g.conference = TRUE AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) /
          NULLIF(SUM(CASE WHEN g.conference = TRUE THEN 1 ELSE 0 END), 0),
          3
      ) AS conf_win_pct

      FROM seasons s
      LEFT JOIN teams t ON s.team_id = t.team_id
      LEFT JOIN coaches c ON s.coach_id = c.coach_id
      LEFT JOIN games g ON s.season_id = g.season_id
      WHERE s.season_id = ${season_id}
      GROUP BY 
          s.season_id, s.year, s.team_id, t.name, 
          s.coach_id, c.name, s.coach_role, 
          s.offensive_overall, s.defensive_overall, s.overall;
    `;
    // Convert BigInt values to regular numbers for JSON serialization
    const serializedProfile = JSON.parse(
      JSON.stringify(season, (key, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

    // Transform the flat response into the expected nested structure
    const transformedProfile = {
      biographical: {
        season_id: serializedProfile[0]?.season_id,
        year: serializedProfile[0]?.year,
        team_id: serializedProfile[0]?.team_id,
        team_name: serializedProfile[0]?.team_name,
        coach_id: serializedProfile[0]?.coach_id,
        coach_name: serializedProfile[0]?.coach_name,
        coach_role: serializedProfile[0]?.coach_role,
        offensive_overall: serializedProfile[0]?.offensive_overall,
        defensive_overall: serializedProfile[0]?.defensive_overall,
        overall: serializedProfile[0]?.overall,
      },
      record: {
        wins: serializedProfile[0]?.wins || 0,
        losses: serializedProfile[0]?.losses || 0,
        win_pct: serializedProfile[0]?.win_pct || 0,
        conf_wins: serializedProfile[0]?.conf_wins || 0,
        conf_losses: serializedProfile[0]?.conf_losses || 0,
        conf_win_pct: serializedProfile[0]?.conf_win_pct || 0,
        home_wins: serializedProfile[0]?.home_wins || 0,
        home_losses: serializedProfile[0]?.home_losses || 0,
        home_win_pct: serializedProfile[0]?.home_win_pct || 0,
        away_wins: serializedProfile[0]?.away_wins || 0,
        away_losses: serializedProfile[0]?.away_losses || 0,
        away_win_pct: serializedProfile[0]?.away_win_pct || 0,
      },
    };

    return NextResponse.json(transformedProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
