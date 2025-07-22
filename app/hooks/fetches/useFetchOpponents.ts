import { useEffect, useState } from "react";
import { Team } from "@/app/types";

export function useFetchOpponents(team_id: number) {
  const [opponents, setOpponents] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        const response = await fetch(`/api/opponents/${team_id}`);
        if (!response.ok) {
          setOpponents([]);
          return;
        }
        const text = await response.text();
        if (!text) {
          setOpponents([]);
          return;
        }
        const data = JSON.parse(text);
        setOpponents(data);
      } catch (error) {
        console.error("Error fetching opponents:", error);
        setOpponents([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpponents();
  }, [team_id]);

  return { opponents, isLoading };
}
