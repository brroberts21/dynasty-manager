import { useEffect, useState } from "react";
import { DynastyState } from "@/app/types";

export function useFetchDynastyStates() {
  const [dynastyState, setDynastyState] = useState<DynastyState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDynastyState = async () => {
      try {
        const response = await fetch("/api/dynasty_state");
        const data = await response.json();
        setDynastyState(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching dynasty state:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDynastyState();
  }, []);

  return { dynastyState, isLoading };
}
