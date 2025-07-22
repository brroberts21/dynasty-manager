import { useEffect, useState } from "react";
import { Recruits } from "@/app/types";

export function useFetchRecruits(season_id: number) {
  const [recruits, setRecruits] = useState<Recruits[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch if we have a valid season_id
    if (season_id <= 0) {
      setRecruits([]);
      setIsLoading(false);
      return;
    }

    const fetchRecruits = async () => {
      try {
        const response = await fetch(`/api/recruits/${season_id}`);
        const data = await response.json();
        setRecruits(data);
      } catch (error) {
        console.error("Error fetching recruits:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecruits();
  }, [season_id]);

  return { recruits, isLoading };
}
