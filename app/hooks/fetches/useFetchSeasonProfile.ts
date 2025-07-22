import { useEffect, useState } from "react";
import { SeasonProfile } from "@/app/types";

export function useFetchSeasonProfile(season_id: number | undefined) {
  const [profile, setProfile] = useState<SeasonProfile>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!season_id || season_id <= 0) {
      setProfile(undefined);
      setIsLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/seasons/profile/${season_id}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching season profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [season_id]);

  return { profile, isLoading };
}
