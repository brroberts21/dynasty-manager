import React, { useState } from "react";
import { Coach } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";

interface Props {
  onSubmit: (data: Coach) => void;
  onBack?: () => void;
  initialData?: Coach;
}

const CreateCoach = ({ onSubmit, onBack, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [offensiveStyle, setOffensiveStyle] = useState(
    initialData?.offensive_style || ""
  );
  const [defensiveStyle, setDefensiveStyle] = useState(
    initialData?.defensive_style || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      offensive_style: offensiveStyle,
      defensive_style: defensiveStyle,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Coach Name</label>
        <input
          type="text"
          placeholder="Enter coach name..."
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {/* TODO: Add a select for the styles */}
        <label>Offensive Style</label>
        <input
          type="text"
          placeholder="Enter offensive style..."
          className="input"
          value={offensiveStyle}
          onChange={(e) => setOffensiveStyle(e.target.value)}
          required
        />
        <label>Defensive Style</label>
        <input
          type="text"
          placeholder="Enter defensive style..."
          className="input input-bordered w-full max-w-xs"
          value={defensiveStyle}
          onChange={(e) => setDefensiveStyle(e.target.value)}
          required
        />
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Coach
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

export default CreateCoach;
