import { useEffect, useState } from "react";
import { Theme } from "@/app/types";

export function useFetchThemes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch("/api/teams/colors");
        const data = await response.json();
        setThemes(data);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemes();
  }, []);

  return { themes, isLoading };
}

