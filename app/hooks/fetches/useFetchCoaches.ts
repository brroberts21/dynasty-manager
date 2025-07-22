import { useEffect, useState } from "react";
import { Coach } from "@/app/types";

export function useFetchCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("/api/coaches");
        const data = await response.json();
        setCoaches(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  return { coaches, isLoading };
}
