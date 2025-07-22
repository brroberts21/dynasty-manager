import { useState } from "react";
import { DynastyEvent } from "@/app/types";

interface UseCreateEventReturn {
  createEvent: (
    data: DynastyEvent
  ) => Promise<DynastyEvent | null>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  reset: () => void;
}

export const useCreateEvent = (): UseCreateEventReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createEvent = async (
    data: DynastyEvent
  ): Promise<DynastyEvent | null> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/dynasty_events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create event");
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to create event");
      }

      setIsSuccess(true);
      console.log("Event created successfully:", result.data);
      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Error creating event:", err);
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
    createEvent,
    isLoading,
    error,
    isSuccess,
    reset,
  };
};
