import { useEffect, useState } from "react";
import { CoachProfile } from "@/app/types";

export function useFetchCoachProfile(coach_id: number) {
  const [profile, setProfile] = useState<CoachProfile>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/coaches/profile/${coach_id}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [coach_id]);

  return { profile, isLoading };
}