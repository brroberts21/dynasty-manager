import { useEffect, useState } from "react";
import {
  FaCalendar,
  FaUsers,
  FaPeopleCarry,
  FaUserGraduate,
  FaChessKing,
  FaChartBar,
  FaTrophy,
  FaUserPlus,
  FaMedal,
} from "react-icons/fa";

export const links = [
  {
    name: "Seasons",
    href: "/seasons",
    icon: FaCalendar,
  },
  {
    name: "Players",
    href: "/players",
    icon: FaUsers,
  },
  {
    name: "Teams",
    href: "/teams",
    icon: FaPeopleCarry,
  },
  {
    name: "Drafted",
    href: "/drafted",
    icon: FaUserGraduate,
  },
  {
    name: "Coaches",
    href: "/coach",
    icon: FaChessKing,
  },
  {
    name: "Awards",
    href: "/awards",
    icon: FaTrophy,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: FaChartBar,
  },
  {
    name: "Recruiting",
    href: "/recruiting",
    icon: FaUserPlus,
  },
  {
    name: "Ring of Honor",
    href: "/honored",
    icon: FaMedal,
  },
];

export const summaryConfig: Record<
  string,
  { label?: string; type: "sum" | "avg" | "count" }
> = {
  Player: { type: "count" },
  "Star Rating": { type: "avg" },
  Height: { type: "avg" },
  Weight: { type: "avg" },
  "Gem": { type: "count" },
  Bust: { type: "count" },
};

export const heightConverter = (height: number) => {
  const feet = Math.floor(height / 12);
  const inches = height % 12;
  return `${feet}' ${inches}"`;
};


export const Positions = [
  "QB",
  "HB",
  "WR",
  "TE",
  "LT",
  "LG",
  "C",
  "RG",
  "RT",
  "DT",
  "DE",
  "LB",
  "MLB",
  "ILB",
  "OLB",
  "CB",
  "S",
  "SS",
  "FS",
  "K",
  "P",
];

export const States = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA", 
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];