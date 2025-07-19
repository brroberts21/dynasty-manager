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
  conf_champ?: boolean;
  bowl_game?: boolean;
  championship?: boolean;
  recruiting_rank?: number;
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
};

export type Theme = {
  team_id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color: string;
};
