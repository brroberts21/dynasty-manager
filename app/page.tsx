"use client";
import Card from "./components/ui/Card";
import HomeNavCard from "./components/features/HomeNavCard";
import { links } from "./constants";
import { ScaleLoader } from "react-spinners";
import { useFetchActiveDynasty } from "./hooks/fetches/useFetchActiveDynasty";

export default function Home() {
  const { activeDynasty, isLoading } = useFetchActiveDynasty();
  console.log(activeDynasty);
  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ScaleLoader color="rgba(13, 76, 234, 1)" />
    </div>
  ) : (
    <>
      <div className="p-4 ">
        <h1 className="text-3xl font-bold">Welcome to Dynasty Manager!</h1>
        <br />
        {activeDynasty ? (
          <div className="flex gap-4">
            <Card title="Active Dynasty" size="sm" width="w-1/2">
              <p>Coach: {activeDynasty.coach_name}</p>
              <p>Team: {activeDynasty.team_name}</p>
              <p>Year: {activeDynasty.year}</p>
            </Card>
            <Card title="Record" size="sm" width="w-1/4">
              <p className="text-4xl font-bold">
                {activeDynasty.wins} - {activeDynasty.losses}
              </p>
            </Card>
            <Card title="Next Season" size="sm" width="w-1/4">
              <p>Advance to next season</p>
            </Card>
          </div>
        ) : (
          <div className="flex gap-4">
            <Card title="No Active Dynasty" size="sm" width="w-full">
              <p>No active dynasty found. Create one to get started!</p>
            </Card>
          </div>
        )}
        <div className="divider my-4 w-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {links
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((link) => (
              <HomeNavCard
                key={link.name}
                title={link.name}
                href={link.href}
                icon={link.icon}
                summary={{
                  value: "12",
                  context: "Active players",
                }}
              />
            ))}
        </div>
      </div>
    </>
  );
}
