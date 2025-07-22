import { useState } from "react";
import { Dynasty, Coach, Team, Season } from "@/app/types";

interface DynastyCreationData {
  dynasty: Dynasty;
  coach: Coach;
  team: Team;
  season: Season;
}

interface DynastyCreationResult {
  dynasty: Dynasty & { dynasty_id: number };
  coach: Coach & { coach_id: number };
  team: Team & { team_id: number };
  season: Season & { season_id: number };
  dynastyState: {
    dynasty_id: number;
    current_coach_id: number;
    current_season_id: number;
    current_team_id: number;
  };
}

interface UseDynastyCreationReturn {
  createDynasty: (
    data: DynastyCreationData
  ) => Promise<DynastyCreationResult | null>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  reset: () => void;
}

export const useDynastyCreation = (): UseDynastyCreationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createDynasty = async (
    data: DynastyCreationData
  ): Promise<DynastyCreationResult | null> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/dynasty-creation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create dynasty");
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to create dynasty");
      }

      setIsSuccess(true);
      console.log("Dynasty created successfully:", result.data);
      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error creating dynasty:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
  };

  return {
    createDynasty,
    isLoading,
    error,
    isSuccess,
    reset,
  };
};
