import React, { useState } from "react";
import { Season } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";

interface Props {
  onSubmit: (data: Season) => void;
  onBack?: () => void;
  initialData?: Season;
}

const CreateSeason = ({ onSubmit, onBack, initialData }: Props) => {
  const [year, setYear] = useState(initialData?.year || 0);
  const [coachRole, setCoachRole] = useState(initialData?.coach_role || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, only pass year and coach_role, other fields can be filled later
    onSubmit({
      year,
      coach_role: coachRole,
      team_id: 0,
      coach_id: 0,
      offensive_overall: 0,
      defensive_overall: 0,
      overall: 0,
      wins: 0,
      losses: 0,
      final_rank: 0,
      conf_champ: false,
      bowl_game: false,
      championship: false,
      recruiting_rank: 0,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Year</label>
        <input
          type="number"
          placeholder="Enter year..."
          className="input"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          required
        />
        <label>Coach Role</label>
        <input
          type="text"
          placeholder="Enter coach role..."
          className="input"
          value={coachRole}
          onChange={(e) => setCoachRole(e.target.value)}
          required
        />
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Season
        </button>
        <button
          type="button"
          className="btn btn-error"
          onClick={() => closeModal("dynasty-creation-wizard-modal")}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default CreateSeason;
