import {
  FaFootballBall,
  FaShieldAlt,
  FaStar,
  FaUserTie,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaListOl,
  FaFlag,
  FaTrophy,
} from "react-icons/fa";

export type CoachProfile = {
  biographical: {
    coach_id?: number;
    name: string;
    offensive_style: string;
    defensive_style: string;
    years_exp: number;
    coached_teams: string;
    total_seasons: number;
  };
  record: {
    wins: number;
    losses: number;
    win_pct: number;
    playoff_wins: number;
    playoff_losses: number;
    playoff_win_pct: number;
    undefeated_seasons: number;
  };
  appearances: {
    bowl_app: number;
    bowl_wins: number;
    bowl_win_pct: number;
    cc_app: number;
    cc_wins: number;
    cc_win_pct: number;
    nc_app: number;
    nc_wins: number;
    nc_win_pct: number;
  };
  finishes: {
    top_25_finishes: number;
    top_10_finishes: number;
    top_5_finishes: number;
  };
  recruiting: {
    top_25_recruiting_classes: number;
    top_10_recruiting_classes: number;
    top_5_recruiting_classes: number;
    top_recruiting_class: number;
    five_star_recruits: number;
  };
};

export type Coach = {
  coach_id?: number;
  name: string;
  offensive_style: string;
  defensive_style: string;
};

export type Dynasty = {
  dynasty_id?: number;
  name: string;
  is_active: boolean;
};

export type DynastyState = {
  dynasty_id: number;
  current_season_id: number;
  current_team_id: number;
  current_coach_id: number;
  coach_name: string;
  team_name?: string;
  year?: number;
  is_active?: boolean;
  wins?: number;
  losses?: number;
  overall?: number;
};

export type DynastyEvent = {
  event_id?: number;
  header: string;
  description: string;
  coach_id: number;
  year: number;
  time: string;
};

export type Games = {
  game_id?: number;
  season_id: number;
  team_id: number;
  opponent_id: number;
  team_score: number;
  opponent_score: number;
  location: string;
  conference: boolean;
  occasion: string;
  rivalry: string;
  week: number;
  team_name: string;
  opponent_name: string;
};

export type Recruits = {
  recruit_id?: number;
  season_id: number;
  name: string;
  position: string;
  archetype: string;
  height: number;
  weight: number;
  state: string;
  stars: number;
  gem: boolean;
  bust: boolean;
};

export type Season = {
  season_id?: number;
  year: number;
  team_id: number;
  coach_id: number;
  coach_role: string;
  offensive_overall?: number;
  defensive_overall?: number;
  overall?: number; // Computed by database
  wins?: number;
  losses?: number;
  final_rank?: number;
  recruiting_rank?: number;
  // Additional fields from joined queries
  coach_name?: string;
  team_name?: string;
};

export type SeasonProfile = {
  biographical: {
    season_id: number;
    year: number;
    team_id: number;
    team_name: string;
    coach_id: number;
    coach_name: string;
    coach_role: string;
    offensive_overall: number;
    defensive_overall: number;
    overall: number;
  };
  record: {
    wins: number;
    losses: number;
    win_pct: number;
    conf_wins: number;
    conf_losses: number;
    conf_win_pct: number;
    home_wins: number;
    home_losses: number;
    home_win_pct: number;
    away_wins: number;
    away_losses: number;
    away_win_pct: number;
  };
};

export type Team = {
  team_id?: number;
  name: string;
  conference: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
  logo_url: string;
  stadium: string;
};

export type Theme = {
  team_id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
};
