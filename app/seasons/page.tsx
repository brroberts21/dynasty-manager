"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Subheader from "../components/ui/Subheader";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import { ScaleLoader } from "react-spinners";
import { useFetchSeasonProfile } from "../hooks/fetches/useFetchSeasonProfile";
import { useFetchGames } from "../hooks/fetches/useFetchGames";
import { useFetchActiveDynasty } from "../hooks/fetches/useFetchActiveDynasty";
import { useFetchSelectSeasons } from "../hooks/fetches/useFetchSelectSeasons";
import { closeModal, openModal } from "../hooks/components/useModal";
import Select from "react-select";
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
  FaPlus,
  FaEdit,
  FaHome,
  FaRoad,
  FaTrash,
} from "react-icons/fa";
import { Season } from "../types";
import GameForm from "../components/forms/GameForm";
import { useCreateGame } from "../hooks/creates/useCreateGame";

const Seasons = () => {
  const { activeDynasty, isLoading: dynastyLoading } = useFetchActiveDynasty();
  const { seasons, isLoading: seasonsLoading } = useFetchSelectSeasons();
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);

  // Set default selected season to active dynasty's season on load
  useEffect(() => {
    if (activeDynasty && seasons.length > 0) {
      const defaultSeason = seasons.find(
        (season) => season.season_id === activeDynasty.current_season_id
      );
      if (defaultSeason) {
        setSelectedSeason(defaultSeason);
      }
    }
  }, [activeDynasty, seasons]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validSeasonId =
    selectedSeason?.season_id && selectedSeason.season_id > 0
      ? selectedSeason.season_id
      : undefined;
  const { profile, isLoading } = useFetchSeasonProfile(validSeasonId);
  const { games, isLoading: gamesLoading } = useFetchGames(validSeasonId);
  const {
    createGame,
    isLoading: isCreatingGame,
    error: createGameError,
    reset: resetCreateGame,
  } = useCreateGame();

  // Group seasons by coach for react-select
  const groupedSeasonOptions = React.useMemo(() => {
    const groupedByCoach = seasons.reduce((acc, season) => {
      const coachName = season.coach_name || "Unknown Coach";
      if (!acc[coachName]) {
        acc[coachName] = [];
      }
      acc[coachName].push(season);
      return acc;
    }, {} as Record<string, Season[]>);
    return Object.entries(groupedByCoach).map(([coachName, coachSeasons]) => ({
      label: coachName,
      options: coachSeasons
        .sort((a, b) => b.year - a.year)
        .map((season) => ({
          value: season,
          label: `${season.team_name}: ${season.year}`,
        })),
    }));
  }, [seasons]);

  // Calculate home and away records from games
  const homeGames = games.filter((g) => g.location.toLowerCase() === "home");
  const homeWins = homeGames.filter(
    (g) => g.team_score > g.opponent_score
  ).length;
  const homeLosses = homeGames.filter(
    (g) => g.team_score < g.opponent_score
  ).length;
  const homeRecord = `${homeWins}-${homeLosses}`;
  const homeWinPct =
    homeGames.length > 0 ? (homeWins / homeGames.length) * 100 : 0;

  const awayGames = games.filter((g) => g.location.toLowerCase() === "away");
  const awayWins = awayGames.filter(
    (g) => g.team_score > g.opponent_score
  ).length;
  const awayLosses = awayGames.filter(
    (g) => g.team_score < g.opponent_score
  ).length;
  const awayRecord = `${awayWins}-${awayLosses}`;
  const awayWinPct =
    awayGames.length > 0 ? (awayWins / awayGames.length) * 100 : 0;

  return (
    <>
      <Header title="Seasons" />
      {isLoading || dynastyLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ScaleLoader color="rgba(13, 76, 234, 1)" />
        </div>
      ) : profile ? (
        <>
          <Subheader title="Season Profile" />
          <Card width="w-full" title={""}>
            {/* Card Header: Team/Year left, Select right */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-primary leading-tight">
                  {profile.biographical.team_name}
                </h2>
                <span className="text-gray-600 text-lg font-medium">
                  {profile.biographical.year}
                </span>
              </div>
              <div className="w-full md:w-80 md:ml-auto">
                <Select
                  options={groupedSeasonOptions}
                  value={
                    selectedSeason
                      ? {
                          value: selectedSeason,
                          label: `${selectedSeason.team_name}: ${selectedSeason.year}`,
                        }
                      : null
                  }
                  onChange={(option: any) =>
                    setSelectedSeason(option?.value || null)
                  }
                  isClearable
                  placeholder="Select a season..."
                  isLoading={seasonsLoading}
                  className="text-sm"
                />
              </div>
            </div>
            {/* Card Body: Three Columns */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-x-8">
              {/* Left Column: Coach & Records, spaced evenly */}
              <div className="flex flex-col gap-4 py-2 px-2 items-start">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaUserTie className="text-primary" />
                    <span>Coach:</span>
                    <span className="font-semibold">
                      {profile.biographical.coach_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaChalkboardTeacher className="text-primary" />
                    <span>Role:</span>
                    <span className="font-semibold">
                      {profile.biographical.coach_role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaListOl className="text-primary" />
                    <span className="font-semibold text-gray-700">
                      Overall:
                    </span>
                    <span className="text-primary font-bold">
                      {profile.record.wins}-{profile.record.losses}
                    </span>
                    <span className="ml-2 text-gray-500">
                      ({(profile.record.win_pct * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFlag className="text-primary" />
                    <span className="font-semibold text-gray-700">
                      Conference:
                    </span>
                    <span className="text-primary font-bold">
                      {profile.record.conf_wins}-{profile.record.conf_losses}
                    </span>
                    <span className="ml-2 text-gray-500">
                      ({(profile.record.conf_win_pct * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHome className="text-primary" />
                    <span className="font-semibold text-gray-700">Home:</span>
                    <span className="text-primary font-bold">{homeRecord}</span>
                    <span className="ml-2 text-gray-500">
                      ({homeWinPct.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRoad className="text-primary" />
                    <span className="font-semibold text-gray-700">Away:</span>
                    <span className="text-primary font-bold">{awayRecord}</span>
                    <span className="ml-2 text-gray-500">
                      ({awayWinPct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </div>
              {/* Center Column: Radial Progresses stacked vertically */}
              <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-3 grid-rows-2 gap-y-4 gap-x-8 items-center justify-items-center">
                  {/* Top: Overall in the center */}
                  <div className="col-start-2 row-start-1 flex flex-col items-center">
                    <div
                      className="radial-progress text-primary font-bold"
                      style={
                        {
                          ["--value"]: profile.biographical.overall,
                        } as React.CSSProperties
                      }
                      aria-valuenow={profile.biographical.overall}
                      role="progressbar"
                    >
                      {profile.biographical.overall}
                    </div>
                    <div className="mt-2 text-md text-gray-700 font-semibold flex items-center gap-2">
                      Overall <FaStar className="text-yellow-500 ml-1" />
                    </div>
                  </div>

                  {/* Bottom left: Offense */}
                  <div className="col-start-1 row-start-2 flex flex-col items-center">
                    <div
                      className="radial-progress text-primary font-bold"
                      style={
                        {
                          ["--value"]: profile.biographical.offensive_overall,
                        } as React.CSSProperties
                      }
                      aria-valuenow={profile.biographical.offensive_overall}
                      role="progressbar"
                    >
                      {profile.biographical.offensive_overall}
                    </div>
                    <div className="mt-2 text-md text-gray-700 font-semibold flex items-center gap-2">
                      Offense{" "}
                      <FaFootballBall className="text-orange-500 ml-1" />
                    </div>
                  </div>

                  {/* Bottom right: Defense */}
                  <div className="col-start-3 row-start-2 flex flex-col items-center">
                    <div
                      className="radial-progress text-primary font-bold"
                      style={
                        {
                          ["--value"]: profile.biographical.defensive_overall,
                        } as React.CSSProperties
                      }
                      aria-valuenow={profile.biographical.defensive_overall}
                      role="progressbar"
                    >
                      {profile.biographical.defensive_overall}
                    </div>
                    <div className="mt-2 text-md text-gray-700 font-semibold flex items-center gap-2">
                      Defense <FaShieldAlt className="text-blue-500 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Season Actions */}
              <div className="flex flex-col gap-4 items-end justify-center">
                <h3 className="text-lg font-semibold text-primary mb-2 tracking-wide">
                  Season Actions
                </h3>
                <button
                  className="btn btn-outline btn-primary btn-sm w-full mb-1 flex items-center gap-2"
                  onClick={() => openModal("add-game-modal")}
                >
                  <FaPlus className="text-primary" /> Add Game
                </button>
                <button className="btn btn-outline btn-secondary btn-sm w-full mb-1 flex items-center gap-2">
                  <FaEdit className="text-secondary" /> Edit Season
                </button>
                <button className="btn btn-outline btn-success btn-sm w-full mb-1 flex items-center gap-2">
                  <FaTrophy className="text-success" /> Playoff Berth
                </button>
                <button className="btn btn-outline btn-info btn-sm w-full mb-1 flex items-center gap-2">
                  <FaFlag className="text-info" /> Conference Championship
                </button>
                <button className="btn btn-outline btn-warning btn-sm w-full mb-1 flex items-center gap-2">
                  <FaStar className="text-warning" /> National Championship
                </button>
              </div>
            </div>
          </Card>
          <Subheader title={`${profile.biographical.year} Games`} />
          <Table
            headers={[
              "Week",
              "Opponent",
              "Location",
              "Score",
              "Occasion",
              "Rivalry",
              "Actions",
            ]}
            rows={games.map((game) => ({
              Week: `Week ${game.week}`,
              Opponent: game.opponent_name,
              Location: game.location,
              Score:
                game.team_score > game.opponent_score ? (
                  <span className="text-emerald-500 font-bold">
                    {game.team_score} - {game.opponent_score}
                  </span>
                ) : (
                  <span className="text-red-500 font-bold">
                    {game.team_score} - {game.opponent_score}
                  </span>
                ),
              Occasion: game.occasion,
              Rivalry: game.rivalry === "None" ? "N/A" : game.rivalry,
              Actions: (
                <div className="flex justify-center gap-4">
                  <button className="text-yellow-500 hover:underline transition-colors cursor-pointer">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline transition-colors cursor-pointer">
                    Delete
                  </button>
                </div>
              ),
            }))}
          />
        </>
      ) : null}
      {isClient && (
        <Modal
          id="add-game-modal"
          header="Add Game"
          size="xl"
          body={
            <GameForm
              onSubmit={async (data) => {
                await createGame(data);
                closeModal("add-game-modal");
                window.location.reload();
              }}
              modalId="add-game-modal"
              team_id={selectedSeason?.team_id || 0}
              team_name={selectedSeason?.team_name || ""}
              season_id={selectedSeason?.season_id || 0}
            />
          }
        />
      )}
    </>
  );
};

export default Seasons;
