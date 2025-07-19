import React from "react";
import Card from "@/app/components/ui/Card";
import { Dynasty, Coach, Team, Season } from "@/app/types";

interface Props {
  onSubmit: () => void | Promise<void>;
  onBack: () => void;
  dynasty: Dynasty;
  coach: Coach;
  team: Team;
  season: Season;
  isLoading?: boolean;
  error?: string | null;
}

const DynastyConfirmation = ({
  onSubmit,
  onBack,
  dynasty,
  coach,
  team,
  season,
  isLoading = false,
  error = null,
}: Props) => {
  return (
    <div className="space-y-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center text-primary">
        Confirm Your Dynasty
      </h2>
      <p className="text-center text-gray-600">
        Please review all the information before creating your dynasty
      </p>

      {/* Dynasty Info */}
      <Card title="Dynasty Information" width="w-full">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {dynasty.name}
          </p>
          <p>
            <span className="font-semibold">Active:</span>{" "}
            {dynasty.is_active ? "Yes" : "No"}
          </p>
        </div>
      </Card>

      {/* Coach Info */}
      <Card title="Coach Information" width="w-full">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {coach.name}
          </p>
          <p>
            <span className="font-semibold">Offensive Style:</span>{" "}
            {coach.offensive_style}
          </p>
          <p>
            <span className="font-semibold">Defensive Style:</span>{" "}
            {coach.defensive_style}
          </p>
        </div>
      </Card>

      {/* Team Info */}
      <Card title="Team Information" width="w-full">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {team.name}
          </p>
          <p>
            <span className="font-semibold">Conference:</span> {team.conference}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {team.city},{" "}
            {team.state}
          </p>
          <p>
            <span className="font-semibold">Coordinates:</span> {team.latitude},{" "}
            {team.longitude}
          </p>
          <p>
            <span className="font-semibold">Colors:</span> {team.primary_color},{" "}
            {team.secondary_color}, {team.tertiary_color}
          </p>
          {team.logo_url && (
            <p>
              <span className="font-semibold">Logo:</span> {team.logo_url}
            </p>
          )}
        </div>
      </Card>

      {/* Season Info */}
      <Card title="Season Information" width="w-full">
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Year:</span> {season.year}
          </p>
          <p>
            <span className="font-semibold">Coach Role:</span>{" "}
            {season.coach_role}
          </p>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          className={`btn btn-primary ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating Dynasty..." : "Create Dynasty"}
        </button>
        <button className="btn" onClick={onBack} disabled={isLoading}>
          Back
        </button>
      </div>
    </div>
  );
};

export default DynastyConfirmation;
