import React, { useState } from "react";
import Select from "react-select";
import { DynastyEvent } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";

interface Props {
  onSubmit: (data: DynastyEvent) => void;
  onBack?: () => void;
  initialData?: DynastyEvent;
  modalId: string;
}

const CreateEvent = ({ onSubmit, onBack, initialData, modalId }: Props) => {
  const [header, setHeader] = useState(initialData?.header || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [year, setYear] = useState(initialData?.year?.toString() || "");
  const [time, setTime] = useState(initialData?.time || "");
  const timeOptions = [
    { value: "Preseason", label: "Preseason" },
    { value: "Season", label: "Season" },
    { value: "Postseason", label: "Postseason" },
    { value: "Offseason", label: "Offseason" },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      header,
      description,
      coach_id: initialData?.coach_id || 0,
      year: parseInt(year, 10),
      time: time,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Event Year</label>
        <input
          type="text"
          placeholder="Enter year..."
          className="input input-bordered w-full"
          value={year}
          onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, ""))}
          required
        />
        <label>Event Header</label>
        <input
          type="text"
          placeholder="Enter event header..."
          className="input input-bordered w-full"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          required
        />
        <label>Event Time</label>
        <Select
          options={timeOptions}
          value={timeOptions.find((option) => option.value === time)}
          onChange={(selectedOption) => setTime(selectedOption?.value || "")}
        />
        <label>Event Description</label>
        <textarea
          placeholder="Enter event description..."
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Event
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

export default CreateEvent;
