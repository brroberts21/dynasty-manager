import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { coach_id: string } }
) {
  const coach_id = parseInt(params.coach_id);
  if (isNaN(coach_id)) {
    return NextResponse.json({ error: "Invalid coach ID" }, { status: 400 });
  }
  try {
    const profile = await prisma.$queryRaw`
  SELECT
  -- Biographical Information --
  c.coach_id, c.name, c.offensive_style, c.defensive_style,
  -- Destinations and Years Experience --
  GROUP_CONCAT(DISTINCT t.name ORDER BY t.name SEPARATOR ', ') AS coached_teams,
  COUNT(DISTINCT s.season_id) AS total_seasons,
  -- Career Record --
  SUM(s.wins) AS total_wins,
  SUM(s.losses) AS total_losses,
  ROUND(SUM(s.wins) / NULLIF(SUM(s.wins + s.losses), 0), 3) AS win_pct,
  SUM(CASE 
      WHEN g.occasion IN ("First Round", "Quarter-Final", "Semi-Final", "National Championship") 
           AND g.team_score > g.opponent_score 
      THEN 1 
      ELSE 0 
  END) AS playoff_wins,
  SUM(CASE 
      WHEN g.occasion IN ("First Round", "Quarter-Final", "Semi-Final", "National Championship") 
           AND g.team_score < g.opponent_score 
      THEN 1 
      ELSE 0 
  END) AS playoff_losses,
  ROUND(
    SUM(CASE 
      WHEN g.occasion IN ("First Round", "Quarter-Final", "Semi-Final", "National Championship") 
           AND g.team_score > g.opponent_score 
      THEN 1 
      ELSE 0 
    END) / NULLIF(
      SUM(CASE 
        WHEN g.occasion IN ("First Round", "Quarter-Final", "Semi-Final", "National Championship") 
             AND (g.team_score > g.opponent_score OR g.team_score < g.opponent_score)
        THEN 1 
        ELSE 0 
      END), 0), 
  3
  ) AS playoff_win_pct,
  
  -- Career Appearances --
  SUM(CASE WHEN g.occasion = 'Bowl Game' THEN 1 ELSE 0 END) AS bowl_app,
  SUM(CASE WHEN g.occasion = 'Bowl Game' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS bowl_wins,
  ROUND(
    SUM(CASE WHEN g.occasion = 'Bowl Game' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) / NULLIF(SUM(CASE WHEN g.occasion = 'Bowl Game' THEN 1 ELSE 0 END), 0), 
    3
  ) AS bowl_win_pct,
  SUM(CASE WHEN g.occasion = 'Conference Championship' THEN 1 ELSE 0 END) AS cc_app,
  SUM(CASE WHEN g.occasion = 'Conference Championship' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS cc_wins,
  ROUND(
    SUM(CASE WHEN g.occasion = 'Conference Championship' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) / NULLIF(SUM(CASE WHEN g.occasion = 'Conference Championship' THEN 1 ELSE 0 END), 0), 
    3
  ) AS cc_win_pct,
  SUM(CASE WHEN g.occasion = 'National Championship' THEN 1 ELSE 0 END) AS nc_app,
  SUM(CASE WHEN g.occasion = 'National Championship' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) AS nc_wins,
  ROUND(
    SUM(CASE WHEN g.occasion = 'National Championship' AND g.team_score > g.opponent_score THEN 1 ELSE 0 END) / NULLIF(SUM(CASE WHEN g.occasion = 'National Championship' THEN 1 ELSE 0 END), 0), 
    3
  ) AS nc_win_pct,
  SUM(CASE WHEN s.wins = 12 AND s.losses = 0 THEN 1 ELSE 0 END) AS undefeated_seasons,
  
  -- Career Finishes -- 
  SUM(CASE WHEN s.final_rank >= 25 THEN 1 ELSE 0 END) AS t25_finish,
  SUM(CASE WHEN s.final_rank >= 10 THEN 1 ELSE 0 END) AS t10_finish,
  SUM(CASE WHEN s.final_rank >= 5 THEN 1 ELSE 0 END) AS t5_finish,
  
  -- Career Recruiting -- 
  SUM(CASE WHEN s.recruiting_rank >= 25 THEN 1 ELSE 0 END) AS t25_rc,
  SUM(CASE WHEN s.recruiting_rank >= 10 THEN 1 ELSE 0 END) AS t10_rc,
  SUM(CASE WHEN s.recruiting_rank >= 5 THEN 1 ELSE 0 END) AS t5_rc,
  SUM(CASE WHEN s.recruiting_rank = 1 THEN 1 ELSE 0 END) AS t1_rc,
  SUM(CASE WHEN r.stars = 5 THEN 1 ELSE 0 END) AS five_stars
  
  FROM coaches c
  LEFT JOIN seasons s ON s.coach_id = c.coach_id
  LEFT JOIN games g ON g.season_id = s.season_id AND g.team_id = s.team_id
  LEFT JOIN teams t ON s.team_id = t.team_id
  LEFT JOIN recruits r on r.season_id = s.season_id
  WHERE c.coach_id = ${coach_id}
  GROUP BY c.coach_id;
  `;

    // Convert BigInt values to regular numbers for JSON serialization
    const serializedProfile = JSON.parse(
      JSON.stringify(profile, (key, value) =>
        typeof value === "bigint" ? Number(value) : value
      )
    );

    // Transform the flat response into the expected nested structure
    const transformedProfile = {
      biographical: {
        coach_id: serializedProfile[0]?.coach_id,
        name: serializedProfile[0]?.name,
        offensive_style: serializedProfile[0]?.offensive_style,
        defensive_style: serializedProfile[0]?.defensive_style,
        years_exp: serializedProfile[0]?.total_seasons || 0,
        coached_teams: serializedProfile[0]?.coached_teams || "",
        total_seasons: serializedProfile[0]?.total_seasons || 0,
      },
      record: {
        wins: serializedProfile[0]?.total_wins || 0,
        losses: serializedProfile[0]?.total_losses || 0,
        win_pct: serializedProfile[0]?.win_pct || 0,
        playoff_wins: serializedProfile[0]?.playoff_wins || 0,
        playoff_losses: serializedProfile[0]?.playoff_losses || 0,
        playoff_win_pct: serializedProfile[0]?.playoff_win_pct || 0,
        undefeated_seasons: serializedProfile[0]?.undefeated_seasons || 0,
      },
      appearances: {
        bowl_app: serializedProfile[0]?.bowl_app || 0,
        bowl_wins: serializedProfile[0]?.bowl_wins || 0,
        bowl_win_pct: serializedProfile[0]?.bowl_win_pct || 0,
        cc_app: serializedProfile[0]?.cc_app || 0,
        cc_wins: serializedProfile[0]?.cc_wins || 0,
        cc_win_pct: serializedProfile[0]?.cc_win_pct || 0,
        nc_app: serializedProfile[0]?.nc_app || 0,
        nc_wins: serializedProfile[0]?.nc_wins || 0,
        nc_win_pct: serializedProfile[0]?.nc_win_pct || 0,
      },
      finishes: {
        top_25_finishes: serializedProfile[0]?.t25_finish || 0,
        top_10_finishes: serializedProfile[0]?.t10_finish || 0,
        top_5_finishes: serializedProfile[0]?.t5_finish || 0,
      },
      recruiting: {
        top_25_recruiting_classes: serializedProfile[0]?.t25_rc || 0,
        top_10_recruiting_classes: serializedProfile[0]?.t10_rc || 0,
        top_5_recruiting_classes: serializedProfile[0]?.t5_rc || 0,
        top_recruiting_class: serializedProfile[0]?.t1_rc || 0,
        five_star_recruits: serializedProfile[0]?.five_stars || 0,
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
