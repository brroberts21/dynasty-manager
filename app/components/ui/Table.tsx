import React, { useState, useMemo } from "react";

interface TableProps {
  headers: string[];
  rows: any[];
}

export default function Table({ headers, rows }: TableProps) {
  const [sortKey, setSortKey] = useState<string>(headers[0]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (header: string) => {
    if (sortKey === header) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(header);
      setSortDirection("asc");
    }
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [rows, sortKey, sortDirection]);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="text-center cursor-pointer select-none hover:underline"
                onClick={() => handleSort(header)}
              >
                {header}
                {sortKey === header && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIndex) => (
            <tr
              key={row.id || `row-${rowIndex}`}
              className="hover:bg-blue-100 transition-all duration-200 ease-in-out"
            >
              {headers.map((header) => (
                <td
                  key={`${row.id || rowIndex}-${header}`}
                  className="text-center"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
