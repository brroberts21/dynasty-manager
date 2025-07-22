import { useEffect, useState } from "react";
import { Games } from "@/app/types";

export function useFetchGames(season_id: number | undefined) {
  const [games, setGames] = useState<Games[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!season_id || season_id <= 0) {
      setGames([]);
      setIsLoading(false);
      return;
    }
    const fetchGames = async () => {
      try {
        const response = await fetch(`/api/games/${season_id}`);
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
  }, [season_id]);

  return { games, isLoading };
}
