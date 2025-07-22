import { useEffect, useState } from "react";
import { Season } from "@/app/types";

export function useFetchSelectSeasons() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`/api/seasons/season_select`);
        const data = await response.json();
        setSeasons(data);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeasons();
  }, []);

  return { seasons, isLoading };
}
