import Link from "next/link";
import React from "react";

interface SummaryData {
  value: string | number;
  context: string;
}

interface Props {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  summary?: SummaryData;
  className?: string;
}

const HomeNavCard = ({
  title,
  href,
  icon: Icon,
  summary,
  className = "",
}: Props) => {
  return (
    <Link href={href} className="block">
      <div
        className={`card w-auto bg-base-100 card-sm shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      >
        <div className="card-body p-4">
          {/* Header with Icon and Title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-shrink-0">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h2 className="card-title text-lg font-semibold flex-1">{title}</h2>
          </div>

          {/* Summary Content */}
          {summary && (
            <div className="mt-auto">
              <div className="text-2xl font-bold text-primary">
                {summary.value}
              </div>
              <div className="text-sm text-base-content/70">
                {summary.context}
              </div>
            </div>
          )}

          {/* Fallback content when no summary */}
          {!summary && (
            <div className="text-sm text-base-content/70 mt-auto">
              Click to view details
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HomeNavCard;
