import React, { useState } from "react";
import { Dynasty } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";

interface Props {
  onSubmit: (data: Dynasty) => void;
  onBack?: () => void;
  initialData?: Dynasty;
}

const CreateDynasty = ({ onSubmit, onBack, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [isActive, setIsActive] = useState(initialData?.is_active || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, is_active: isActive });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Dynasty Name</label>
        <input
          type="text"
          placeholder="Enter dynasty name..."
          className="input input-bordered w-full max-w-xs"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="mt-2 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active Dynasty
          </label>
        </div>
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Dynasty
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

export default CreateDynasty;
