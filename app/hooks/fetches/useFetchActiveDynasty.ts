import { useEffect, useState } from "react";
import { DynastyState } from "@/app/types";

export function useFetchActiveDynasty() {
  const [activeDynasty, setActiveDynasty] = useState<DynastyState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveDynasty = async () => {
      try {
        const response = await fetch("/api/dynasty_state/active");
        const data = await response.json();
        const singleDynasty = Array.isArray(data) ? data[0] ?? null : data;
        setActiveDynasty(singleDynasty);
      } catch (error) {
        console.error("Error fetching active dynasty:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActiveDynasty();
  }, []);

  return { activeDynasty, isLoading };
}
