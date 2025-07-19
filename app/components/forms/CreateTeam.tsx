import React, { useState } from "react";
import { Team } from "@/app/types";
import { closeModal } from "@/app/hooks/components/useModal";

interface Props {
  onSubmit: (data: Team) => void;
  onBack?: () => void;
  initialData?: Team;
}

const CreateTeam = ({ onSubmit, onBack, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || "");
  const [conference, setConference] = useState(initialData?.conference || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [state, setState] = useState(initialData?.state || "");
  const [latitude, setLatitude] = useState(initialData?.latitude || 0);
  const [longitude, setLongitude] = useState(initialData?.longitude || 0);
  const [primaryColor, setPrimaryColor] = useState(
    initialData?.primary_color || ""
  );
  const [secondaryColor, setSecondaryColor] = useState(
    initialData?.secondary_color || ""
  );
  const [tertiaryColor, setTertiaryColor] = useState(
    initialData?.tertiary_color || ""
  );
  const [logoUrl, setLogoUrl] = useState(initialData?.logo_url || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      conference,
      city,
      state,
      latitude,
      longitude,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      tertiary_color: tertiaryColor,
      logo_url: logoUrl,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Team Name</label>
        <input
          type="text"
          placeholder="Enter team name..."
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Conference</label>
        <input
          type="text"
          placeholder="Enter conference..."
          className="input"
          value={conference}
          onChange={(e) => setConference(e.target.value)}
          required
        />
        <label>City</label>
        <input
          type="text"
          placeholder="Enter city..."
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>State</label>
        <input
          type="text"
          placeholder="Enter state..."
          className="input"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label>Latitude</label>
        <input
          type="number"
          placeholder="Enter latitude..."
          className="input"
          value={latitude}
          onChange={(e) => setLatitude(Number(e.target.value))}
          required
        />
        <label>Longitude</label>
        <input
          type="number"
          placeholder="Enter longitude..."
          className="input"
          value={longitude}
          onChange={(e) => setLongitude(Number(e.target.value))}
          required
        />
        <label>Primary Color</label>
        <input
          type="text"
          placeholder="Enter primary color..."
          className="input"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          required
        />
        <label>Secondary Color</label>
        <input
          type="text"
          placeholder="Enter secondary color..."
          className="input"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
          required
        />
        <label>Tertiary Color</label>
        <input
          type="text"
          placeholder="Enter tertiary color..."
          className="input"
          value={tertiaryColor}
          onChange={(e) => setTertiaryColor(e.target.value)}
          required
        />
        <label>Logo Url</label>
        <input
          type="text"
          placeholder="Enter logo..."
          className="input"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          required
        />
        {onBack && (
          <button type="button" className="btn" onClick={onBack}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Save Team
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

export default CreateTeam;
