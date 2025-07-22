import { useEffect, useState } from "react";
import { Team } from "@/app/types";

export function useFetchTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchTeams = async () => {
      try {
        const response = await fetch(`/api/teams`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return { teams, isLoading };
}
