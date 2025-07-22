import { useEffect, useState } from "react";
import { DynastyEvent } from "@/app/types";

export function useFetchDynastyEvents(coach_id: number) {
  const [events, setEvents] = useState<DynastyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/dynasty_events/${coach_id}`);
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [coach_id]);

  return { events, isLoading };
}
