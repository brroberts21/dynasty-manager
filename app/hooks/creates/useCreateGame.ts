import { useState } from "react";
import { Games } from "@/app/types";

interface UseCreateGameReturn {
  createGame: (data: Games) => Promise<Games | null>;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

export const useCreateGame = (): UseCreateGameReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGame = async (
    data: Games
  ): Promise<Games | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create game");
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to create game");
      }

      console.log("Game created successfully:", result.data);
      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error creating game:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
  };

  return {
    createGame,
    isLoading,
    error,
    reset,
  };
};
