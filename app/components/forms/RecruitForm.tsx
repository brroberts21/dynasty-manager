import React, { useState } from "react";
import { Recruits } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";
import { Positions, States } from "@/app/constants";
import Select from "react-select";

interface Props {
  onSubmit: (data: Recruits) => void;
  onBack?: () => void;
  initialData?: Recruits;
  season_id?: number;
  modalId: string;
}

const CreateRecruit = ({
  onSubmit,
  onBack,
  initialData,
  season_id = 0,
  modalId,
}: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [archetype, setArchetype] = useState(initialData?.archetype || "");
  const [height, setHeight] = useState<number | undefined>(
    initialData?.height || undefined
  );
  const [weight, setWeight] = useState<number | undefined>(
    initialData?.weight || undefined
  );
  const [state, setState] = useState(initialData?.state || "");
  const [stars, setStars] = useState(initialData?.stars || 0);
  const [gem, setGem] = useState(initialData?.gem || false);
  const [bust, setBust] = useState(initialData?.bust || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      position,
      archetype,
      height: height ?? 0,
      weight: weight ?? 0,
      state,
      stars,
      gem,
      bust,
      season_id,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Player Name</label>
        <input
          type="text"
          placeholder="Enter player name..."
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Position</label>
        <Select
          options={Positions.map((position) => ({
            value: position,
            label: position,
          }))}
          value={position ? { value: position, label: position } : null}
          onChange={(option: any) => setPosition(option?.value || "")}
          isClearable
          placeholder="Select position..."
        />
        <label>Archetype</label>
        <input
          type="text"
          placeholder="Enter archetype..."
          className="input input-bordered w-full"
          value={archetype}
          onChange={(e) => setArchetype(e.target.value)}
          required
        />
        <div className="flex gap-6 justify-center">
          <div className="flex flex-col gap-2">
            <label>Height (inches)</label>
            <input
              type="text"
              placeholder="Enter height..."
              className="input input-bordered w-full"
              value={height?.toString() ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setHeight(undefined);
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue) && numValue > 0) {
                    setHeight(numValue);
                  }
                }
              }}
              required
            />
          </div>

          <div className="flex flex-col gap-2 justify-between">
            <label>Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter weight..."
              className="input input-bordered w-full"
              value={weight?.toString() ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setWeight(undefined);
                } else {
                  const numValue = parseInt(value);
                  if (!isNaN(numValue) && numValue > 0) {
                    setWeight(numValue);
                  }
                }
              }}
              required
            />
          </div>
        </div>

        <label>State</label>
        <Select
          options={States.map((state) => ({ value: state, label: state }))}
          value={state ? { value: state, label: state } : null}
          onChange={(option: any) => setState(option?.value || "")}
          isClearable
          placeholder="Select state..."
        />
        <label>Star Rating</label>
        <div className="rating">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star bg-primary"
            aria-label="1 star"
            checked={stars === 1}
            onChange={() => setStars(1)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star bg-primary"
            aria-label="2 star"
            checked={stars === 2}
            onChange={() => setStars(2)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star bg-primary"
            aria-label="3 star"
            checked={stars === 3}
            onChange={() => setStars(3)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star bg-primary"
            aria-label="4 star"
            checked={stars === 4}
            onChange={() => setStars(4)}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star bg-primary"
            aria-label="5 star"
            checked={stars === 5}
            onChange={() => setStars(5)}
          />
        </div>
        <div className="flex gap-6 justify-center">
          <label>Gem</label>
          <input
            type="checkbox"
            checked={gem}
            onChange={(e) => setGem(e.target.checked)}
          />
          <label>Bust</label>
          <input
            type="checkbox"
            checked={bust}
            onChange={(e) => setBust(e.target.checked)}
          />
        </div>

        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Recruit
        </button>
        <button
          type="button"
          className="btn btn-error"
          onClick={() => closeModal(modalId)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default CreateRecruit;
