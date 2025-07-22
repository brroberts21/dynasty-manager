import React from "react";
import { Team } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";
import { usePopulateForm } from "@/app/hooks/components/usePopulateForm";

interface Props {
  onSubmit: (data: Team) => void;
  onBack?: () => void;
  initialData?: Team;
  modalId: string;
}

const CreateTeam = ({ onSubmit, onBack, initialData, modalId }: Props) => {
  // Default values for new team creation - memoized to prevent re-renders
  const defaultTeamValues = React.useMemo<Partial<Team>>(
    () => ({
      name: "",
      conference: "",
      city: "",
      state: "",
      latitude: 0,
      longitude: 0,
      primary_color: "",
      secondary_color: "",
      tertiary_color: "",
      logo_url: "",
      stadium: "",
    }),
    []
  );

  const { formData, updateField, getFieldValue, isPopulated } =
    usePopulateForm<Team>(initialData || null, defaultTeamValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSubmit({
        ...formData,
        team_id: initialData?.team_id,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Team Name</label>
        <input
          type="text"
          placeholder="Enter team name..."
          className="input"
          value={getFieldValue("name")}
          onChange={(e) => updateField("name", e.target.value)}
          required
        />
        <label>Conference</label>
        <input
          type="text"
          placeholder="Enter conference..."
          className="input"
          value={getFieldValue("conference")}
          onChange={(e) => updateField("conference", e.target.value)}
          required
        />
        <label>City</label>
        <input
          type="text"
          placeholder="Enter city..."
          className="input"
          value={getFieldValue("city")}
          onChange={(e) => updateField("city", e.target.value)}
          required
        />
        <label>State</label>
        <input
          type="text"
          placeholder="Enter state..."
          className="input"
          value={getFieldValue("state")}
          onChange={(e) => updateField("state", e.target.value)}
          required
        />
        <label>Latitude</label>
        <input
          type="number"
          placeholder="Enter latitude..."
          className="input"
          value={getFieldValue("latitude")}
          onChange={(e) => updateField("latitude", Number(e.target.value))}
          required
        />
        <label>Longitude</label>
        <input
          type="number"
          placeholder="Enter longitude..."
          className="input"
          value={getFieldValue("longitude")}
          onChange={(e) => updateField("longitude", Number(e.target.value))}
          required
        />
        <label>Primary Color</label>
        <input
          type="text"
          placeholder="Enter primary color..."
          className="input"
          value={getFieldValue("primary_color")}
          onChange={(e) => updateField("primary_color", e.target.value)}
          required
        />
        <label>Secondary Color</label>
        <input
          type="text"
          placeholder="Enter secondary color..."
          className="input"
          value={getFieldValue("secondary_color")}
          onChange={(e) => updateField("secondary_color", e.target.value)}
          required
        />
        <label>Tertiary Color</label>
        <input
          type="text"
          placeholder="Enter tertiary color..."
          className="input"
          value={getFieldValue("tertiary_color")}
          onChange={(e) => updateField("tertiary_color", e.target.value)}
          required
        />
        <label>Logo Url</label>
        <input
          type="text"
          placeholder="Enter logo..."
          className="input"
          value={getFieldValue("logo_url")}
          onChange={(e) => updateField("logo_url", e.target.value)}
          required
        />
        <label>Stadium</label>
        <input
          type="text"
          placeholder="Enter stadium..."
          className="input"
          value={getFieldValue("stadium")}
          onChange={(e) => updateField("stadium", e.target.value)}
          required
        />
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {isPopulated ? "Update Team" : "Create Team"}
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

export default CreateTeam;
