import { Team } from "@/app/types";
import { useState } from "react";

interface Props {
  onSuccess?: () => void;
}

export const useUpdateTeam = ({ onSuccess }: Props = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateTeam = async (teamId: string, team: Team) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update team.");
        return false;
      }

      setSuccess(true);
      onSuccess?.();
      return true;
    } catch (err) {
      setError("Failed to update team.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    updateTeam,
    loading,
    error,
    success,
    reset,
  };
};
