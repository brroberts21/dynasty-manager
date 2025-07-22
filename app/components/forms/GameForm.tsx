import React, { useState } from "react";
import Select from "react-select";
import { useFetchOpponents } from "@/app/hooks/fetches/useFetchOpponents";
import { closeModal } from "@/app/hooks/components/useModal";
import { Games } from "@/app/types";

interface Props {
  onSubmit: (data: Games) => void;
  onBack?: () => void;
  initialData?: Games;
  modalId: string;
  team_id: number;
  team_name: string;
  season_id: number;
}

const OCCASION_OPTIONS = [
  { value: "Regular Season", label: "Regular Season" },
  { value: "Conference Championship", label: "Conference Championship" },
  { value: "First Round", label: "First Round" },
  { value: "Quarter-Final", label: "Quarter-Final" },
  { value: "Semi-Final", label: "Semi-Final" },
  { value: "National Championship", label: "National Championship" },
];

const CreateGame = ({
  onSubmit,
  onBack,
  initialData,
  modalId,
  team_id,
  team_name,
  season_id,
}: Props) => {
  const [opponent, setOpponent] = useState<any>(
    initialData
      ? { value: initialData.opponent_id, label: initialData.opponent_name }
      : null
  );
  const [team_score, setTeamScore] = useState(
    initialData?.team_score.toString() || ""
  );
  const [opponent_score, setOpponentScore] = useState(
    initialData?.opponent_score.toString() || ""
  );
  const [location, setLocation] = useState(initialData?.location || "Home");
  const [occasion, setOccasion] = useState(
    initialData?.occasion || OCCASION_OPTIONS[0].value
  );
  const [rivalryType, setRivalryType] = useState(
    initialData?.rivalry && initialData.rivalry !== "None" ? "Named" : "None"
  );
  const [rivalryName, setRivalryName] = useState(
    initialData?.rivalry && initialData.rivalry !== "None"
      ? initialData.rivalry
      : ""
  );
  const [week, setWeek] = useState(
    initialData && typeof initialData.week === "number" && initialData.week > 0
      ? initialData.week.toString()
      : "1"
  );
  const [conference, setConference] = useState(
    initialData?.conference ?? false
  );

  const { opponents, isLoading } = useFetchOpponents(team_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opponent) return;
    const parsedWeek = Number.isNaN(parseInt(week, 10))
      ? 1
      : parseInt(week, 10);
    const postBody = {
      season_id,
      team_id,
      team_name,
      opponent_id: opponent.value,
      opponent_name: opponent.label,
      team_score: parseInt(team_score, 10),
      opponent_score: parseInt(opponent_score, 10),
      location,
      occasion,
      rivalry: rivalryType === "Named" ? rivalryName : "None",
      week: parsedWeek,
      conference,
    };
    console.log("Submitting POST body:", postBody);
    onSubmit(postBody);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Opponent Select */}
      <label>Opponent</label>
      <Select
        options={opponents
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter((op) => op.team_id !== team_id)
          .map((op) => ({ value: op.team_id, label: op.name }))}
        value={opponent}
        onChange={(val) => setOpponent(val)}
        isLoading={isLoading}
        placeholder="Select opponent..."
        required
      />
      {/* Scores */}
      <div className="flex gap-4 justify-between">
        <label className="pl-2">Team Score</label>
        <label className="pr-2">Opponent Score</label>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter team score..."
          className="input input-bordered w-full"
          value={team_score}
          onChange={(e) => setTeamScore(e.target.value.replace(/[^0-9]/g, ""))}
          required
        />
        <input
          type="text"
          placeholder="Enter opponent score..."
          className="input input-bordered w-full"
          value={opponent_score}
          onChange={(e) =>
            setOpponentScore(e.target.value.replace(/[^0-9]/g, ""))
          }
          required
        />
      </div>
      {/* Location Radio */}
      <label>Location</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="location"
            value="Home"
            checked={location === "Home"}
            onChange={() => setLocation("Home")}
          />
          Home
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="location"
            value="Away"
            checked={location === "Away"}
            onChange={() => setLocation("Away")}
          />
          Away
        </label>
      </div>
      {/* Week Range Slider */}
      <label htmlFor="week-range">Week</label>
      <div className="flex items-center gap-4">
        <input
          id="week-range"
          type="range"
          min={1}
          max={17}
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="range range-primary w-full"
          required
        />
        <span className="font-bold w-8 text-center">{week}</span>
      </div>
      {/* Conference/Non-Conference Radio */}
      <label>Game Type</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="conference"
            value="false"
            checked={!conference}
            onChange={() => setConference(false)}
          />
          Non-Conference
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="conference"
            value="true"
            checked={conference}
            onChange={() => setConference(true)}
          />
          Conference
        </label>
      </div>
      {/* Occasion Select */}
      <label>Occasion</label>
      <Select
        options={OCCASION_OPTIONS}
        value={OCCASION_OPTIONS.find((opt) => opt.value === occasion) || null}
        onChange={(val: any) => setOccasion(val?.value || "")}
        isLoading={isLoading}
        placeholder="Select occasion..."
        required
      />
      {/* Rivalry Radio and Input */}
      <label>Rivalry</label>
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="rivalry"
            value="None"
            checked={rivalryType === "None"}
            onChange={() => setRivalryType("None")}
          />
          None
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="rivalry"
            value="Named"
            checked={rivalryType === "Named"}
            onChange={() => setRivalryType("Named")}
          />
          Named
        </label>
        {rivalryType === "Named" && (
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter rivalry name..."
            value={rivalryName}
            onChange={(e) => setRivalryName(e.target.value)}
            required
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-2">
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Game
        </button>
        <button
          type="button"
          className="btn btn-error"
          onClick={() => closeModal(modalId)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateGame;
