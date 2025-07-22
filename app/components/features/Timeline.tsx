import React from "react";
import { DynastyEvent } from "@/app/types";
import { FaFlagCheckered } from "react-icons/fa";

interface Props {
  events: DynastyEvent[];
}

const Timeline = ({ events }: Props) => {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      {events.map((event, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <li key={event.event_id || idx}>
            {/* Render <hr /> before every event except the first */}
            {idx !== 0 && <hr />}
            <div className="timeline-middle">
              <FaFlagCheckered className="h-5 w-5 text-primary" />
            </div>
            <div
              className={`${
                isLeft ? "timeline-start md:text-end" : "timeline-end"
              } mb-10`}
            >
              <time className="font-mono italic text-sm text-gray-500">
                {event.year}
                {event.time ? ` - ${event.time}` : ""}
              </time>
              <div className="text-lg font-bold text-primary mt-1">
                {event.header}
              </div>
              <div className="text-gray-700">{event.description}</div>
            </div>
            {/* Render <hr /> after every event except the last */}
            {idx !== events.length - 1 && <hr />}
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
