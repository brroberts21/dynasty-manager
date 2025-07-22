import { useState } from "react";

export function useActivateDynasty() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const activateDynasty = async (dynastyId: number) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(`/api/dynasties/${dynastyId}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Failed to activate dynasty");
      }
      setIsSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isSuccess, activateDynasty };
}
