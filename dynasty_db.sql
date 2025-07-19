CREATE DATABASE IF NOT EXISTS dynasty;
USE dynasty;

-- DYNASTIES: manage active dynasty from here
CREATE TABLE Dynasties (
    dynasty_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    is_active BOOLEAN DEFAULT FALSE
);

-- TEAMS
CREATE TABLE Teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    conference VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    primary_color VARCHAR(100),
    secondary_color VARCHAR(100),
    tertiary_color VARCHAR(100),
    logo_url VARCHAR(100)
);

-- COACHES
CREATE TABLE Coaches (
    coach_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    offensive_style VARCHAR(50),
    defensive_style VARCHAR(50)
);

-- SEASONS
CREATE TABLE Seasons (
    season_id INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL,
    team_id INT NOT NULL,
    coach_id INT NOT NULL,
    coach_role VARCHAR(100) NOT NULL, -- Head Coach, Offensive Coordinator, Defensive Coordinator, Special Teams Coordinator, Assistant Coach, etc.
    offensive_overall INT,
    defensive_overall INT,
    overall INT AS (
        CASE
            WHEN offensive_overall IS NOT NULL AND defensive_overall IS NOT NULL THEN (offensive_overall + defensive_overall) / 2
            ELSE NULL
        END
    ) STORED,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0,
    final_rank INT,
    conf_champ BOOLEAN DEFAULT FALSE,
    bowl_game BOOLEAN DEFAULT FALSE,
    championship BOOLEAN DEFAULT FALSE,
    recruiting_rank INT,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id)
);

-- PLAYERS
CREATE TABLE Players (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    jersey_number INT,
    position VARCHAR(10) NOT NULL,
    archetype VARCHAR(100) NOT NULL,
    dev VARCHAR(100) NOT NULL,
    height INT,
    weight INT,
    year VARCHAR(10) NOT NULL DEFAULT "FR", -- FR, SO, JR, SR
    redshirt BOOLEAN DEFAULT FALSE
);

-- RECRUITS
CREATE TABLE Recruits (
    recruit_id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    position VARCHAR(10) NOT NULL,
    archetype VARCHAR(100) NOT NULL,
    height INT,
    weight INT,
    stars INT NOT NULL,
    gem BOOLEAN NOT NULL DEFAULT FALSE,
    bust BOOLEAN NOT NULL DEFAULT FALSE,
    state VARCHAR(100) NOT NULL,
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id)
);

-- OPPONENTS
Create table Opponents (
    opponent_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    conference VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

-- GAMES
Create Table Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    season_id INT NOT NULL,
    team_id INT NOT NULL,
    opponent_id INT NOT NULL,
    team_score INT NOT NULL,
    opponent_score INT NOT NULL,
    location VARCHAR(100) NOT NULL, -- Home, Away, Neutral
    occasion VARCHAR(100) NOT NULL DEFAULT "Regular Season",
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (opponent_id) REFERENCES Opponents(opponent_id)
);

-- DRAFTED
Create Table Drafted (
    drafted_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    round INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- AWARDS
Create Table Awards (
    award_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    award_name VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- ALL AMERICANS
Create Table AllAmericans (
    all_american_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    team_level VARCHAR(100) NOT NULL, -- 1st, 2nd, 3rd, Freshman Team, Honorable Mention
    year INT NOT NULL,
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- RING OF HONOR
Create Table RingOfHonor (
    ring_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    year INT NOT NULL,
    description VARCHAR(1000), -- Optional description of the player's achievements/strengths
    FOREIGN KEY (player_id) REFERENCES Players(player_id)
);

-- DYNASTY STATE: manage who is where when in each dynasty save here
CREATE TABLE DynastyState (
    dynasty_id INT PRIMARY KEY,
    current_season_id INT NOT NULL,
    current_team_id INT NOT NULL,
    current_coach_id INT NOT NULL,
    FOREIGN KEY (dynasty_id) REFERENCES Dynasties(dynasty_id),
    FOREIGN KEY (current_season_id) REFERENCES Seasons(season_id),
    FOREIGN KEY (current_team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (current_coach_id) REFERENCES Coaches(coach_id)
);

-- DYNASTY EVENTS: Records the events that happen in the dynasty
CREATE TABLE DynastyEvents (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    dynasty_id INT NOT NULL,
    description VARCHAR(1000),
    coach_id INT NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (dynasty_id) REFERENCES Dynasties(dynasty_id),
    FOREIGN KEY (coach_id) REFERENCES Coaches(coach_id)
);

-- PLAYER TEAM SEASON
CREATE TABLE PlayerTeamSeason (
    pts_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    team_id INT NOT NULL,
    season_id INT NOT NULL,
    position VARCHAR(10),
    initial_overall INT,
    final_overall INT,
    role VARCHAR(100) NOT NULL, -- Starter, Rotation, Bench, Special Teams, etc.
    FOREIGN KEY (player_id) REFERENCES Players(player_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (season_id) REFERENCES Seasons(season_id),
    UNIQUE KEY unique_player_season (player_id, season_id)
);

-- OFFENSE
CREATE TABLE QuarterbackStats (
    pts_id INT PRIMARY KEY,
    games_played INT,
    pass_yards INT,
    pass_touchdowns INT,
    pass_attempts INT,
    pass_completions INT,
    completion_percentage DECIMAL(5, 2)
        AS (
            CASE
                WHEN pass_attempts > 0 THEN (pass_completions / pass_attempts) * 100
                ELSE 0
            END
        ) STORED,
    pass_ypa DECIMAL(5, 2)
        AS (
            CASE
                WHEN pass_attempts > 0 THEN pass_yards / pass_attempts
                ELSE 0
            END
        ) STORED,
    pass_ypc DECIMAL(5, 2)
        AS (
            CASE
                WHEN pass_completions > 0 THEN pass_yards / pass_completions
                ELSE 0
            END
        ) STORED,
    pass_ypg DECIMAL(5, 2) AS (
        CASE
            WHEN games_played > 0 THEN pass_yards / games_played
            ELSE 0
        END
    ) STORED,
    pass_tdpg DECIMAL(5, 2) AS (
        CASE
            WHEN games_played > 0 THEN pass_touchdowns / games_played
            ELSE 0
        END
    ) STORED,
    longest_pass INT,
    interceptions INT,
    ti_ratio DECIMAL(5, 2) AS (
        CASE
            WHEN interceptions > 0 THEN pass_touchdowns / interceptions
            ELSE 0
        END
    ) STORED,
    rushes INT,
    rush_yards INT,
    rush_touchdowns INT,
    rush_ypa DECIMAL(5, 2)
        AS (
            CASE
                WHEN rushes > 0 THEN rush_yards / rushes
                ELSE 0
            END
        ) STORED,
    longest_rush INT,
    sacks INT,
    FOREIGN KEY (pts_id) REFERENCES PlayerTeamSeason(pts_id)
);

-- SKILL PLAYER STATS
CREATE TABLE SkillPlayerStats (
    pts_id INT PRIMARY KEY,
    games_played INT,
    rushes INT,
    rush_yards INT,
    rush_touchdowns INT,
    rush_ypc DECIMAL(5, 2) AS (
        CASE
            WHEN rushes > 0 THEN rush_yards / rushes
            ELSE 0
        END
    ) STORED,
    rush_ypg DECIMAL(5, 2) AS (
        CASE
            WHEN games_played > 0 THEN rush_yards / games_played
            ELSE 0
        END
    ) STORED,
    rush_tdpg DECIMAL(5, 2) AS (
        CASE
            WHEN games_played > 0 THEN rush_touchdowns / games_played
            ELSE 0
        END
    ) STORED,
    yards_after_contact INT,
    explosive_rush INT, -- 20+ yards
    longest_rush INT,
    rec INT,
    rec_yards INT,
    rec_touchdowns INT,
    rec_ypc DECIMAL(5, 2) AS (
        CASE
            WHEN rec > 0 THEN rec_yards / rec
            ELSE 0
        END
    ) STORED,
    rec_ypg DECIMAL(5, 2) AS (
        CASE
            WHEN games_played > 0 THEN rec_yards / games_played
            ELSE 0
        END
    ) STORED,
    rec_tdpg DECIMAL(5, 2) AS (
        CASE
            WHEN games_played > 0 THEN rec_touchdowns / games_played
            ELSE 0
        END
    ) STORED,
    run_after_catch INT,
    longest_catch INT,
    FOREIGN KEY (pts_id) REFERENCES PlayerTeamSeason(pts_id)
);

-- DEFENSE
CREATE TABLE DefensiveStats (
    pts_id INT PRIMARY KEY,
    tackles INT,
    tfl INT,
    sacks INT,
    interceptions INT,
    fumbles_forced INT,
    touchdowns INT,
    FOREIGN KEY (pts_id) REFERENCES PlayerTeamSeason(pts_id)
);

-- SPECIAL TEAMS
CREATE TABLE KickerStats (
    pts_id INT PRIMARY KEY,
    fgm INT,
    fga INT,
    fg_pct DECIMAL(5, 2) AS (
        CASE
            WHEN fga > 0 THEN fgm / fga
            ELSE 0
        END
    ) STORED,
    longest_fg INT,
    xpm INT,
    xpa INT,
    xp_pct DECIMAL(5, 2) AS (
        CASE
            WHEN xpa > 0 THEN xpm / xpa
            ELSE 0
        END
    ) STORED,
    FOREIGN KEY (pts_id) REFERENCES PlayerTeamSeason(pts_id)
);


