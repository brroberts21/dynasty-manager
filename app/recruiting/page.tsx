"use client";
import React, { useEffect, useState } from "react";
import Modal from "../components/ui/Modal";
import Table from "../components/ui/Table";
import Header from "../components/ui/Header";
import Searchbar from "../components/ui/Searchbar";
import Tabs from "../components/ui/Tabs";
import CreateRecruit from "../components/forms/RecruitForm";
import Select from "react-select";
import { useFetchRecruits } from "../hooks/fetches/useFetchRecruits";
import { useFetchActiveDynasty } from "../hooks/fetches/useFetchActiveDynasty";
import { useFetchSelectSeasons } from "../hooks/fetches/useFetchSelectSeasons";
import { openModal, closeModal } from "../hooks/components/useModal";
import { Recruits, Season } from "../types";
import { heightConverter } from "../constants";
import { ScaleLoader } from "react-spinners";
import { useTabs } from "../hooks/components/useTabs";
import { useSearchbar } from "../hooks/components/useSearchbar";
import { FaStar } from "react-icons/fa";

const RecruitingPage = () => {
  const { activeDynasty, isLoading } = useFetchActiveDynasty();
  const { seasons, isLoading: seasonsLoading } = useFetchSelectSeasons();
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [isClient, setIsClient] = useState(false);
  // Set default selected season to active dynasty's season
  useEffect(() => {
    if (activeDynasty && seasons.length > 0) {
      const defaultSeason = seasons.find(
        (season) => season.season_id === activeDynasty.current_season_id
      );
      if (defaultSeason) {
        setSelectedSeason(defaultSeason);
      }
    }
  }, [activeDynasty, seasons]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch recruits based on selected season
  const { recruits, isLoading: recruitsLoading } = useFetchRecruits(
    selectedSeason?.season_id ?? 0
  );

  const {
    tabs,
    activeTab,
    filteredItems: tabFilteredItems,
    handleTabChange,
  } = useTabs(recruits, "position", "All Positions");

  const { filteredItems, handleSearch } = useSearchbar(
    tabFilteredItems,
    "name"
  );

  const handleCreateRecruit = async (recruit: Recruits) => {
    // Use the selected season's ID
    const recruitWithSeasonId = {
      ...recruit,
      season_id: selectedSeason?.season_id ?? 0,
    };

    const response = await fetch("/api/recruits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recruitWithSeasonId),
    });
    const data = await response.json();
    console.log(data);
    closeModal("recruit-creation-wizard-modal");
    window.location.reload();
  };

  return isClient ? (
    <>
      <Header title="Recruiting" />

      {/* Page Description */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mt-6 mb-2 border-l-4 border-primary pl-3">
          Recruiting Dashboard
        </h3>
        <p className="text-gray-600 mb-6">
          Manage your recruiting classes and track potential prospects for your
          dynasty.
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
          {/* Season Selection */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Recruiting Class
            </label>
            <div className="w-full max-w-md">
              <Select
                options={(() => {
                  // Group seasons by coach
                  const groupedByCoach = seasons.reduce((acc, season) => {
                    const coachName = season.coach_name;
                    if (coachName) {
                      if (!acc[coachName]) {
                        acc[coachName] = [];
                      }
                      acc[coachName].push(season);
                    }
                    return acc;
                  }, {} as Record<string, Season[]>);

                  // Create grouped options
                  return Object.entries(groupedByCoach).map(
                    ([coachName, coachSeasons]) => ({
                      label: coachName,
                      options: coachSeasons
                        .sort((a, b) => b.year - a.year) // Sort by year descending
                        .map((season) => ({
                          value: season,
                          label: `${season.team_name}: ${season.year}`,
                        })),
                    })
                  );
                })()}
                value={
                  selectedSeason
                    ? {
                        value: selectedSeason,
                        label: `${selectedSeason.team_name}: ${selectedSeason.year}`,
                      }
                    : null
                }
                onChange={(option: any) =>
                  setSelectedSeason(option?.value || null)
                }
                isClearable
                placeholder="Select a recruiting class..."
                isLoading={seasonsLoading}
                className="text-sm"
              />
            </div>
          </div>

          {/* Create Button */}
          <div className="flex-shrink-0">
            <button
              className="btn btn-primary btn-sm lg:btn-md shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => openModal("recruit-creation-wizard-modal")}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Recruit
            </button>
          </div>
        </div>

        {/* Search and Filter Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 min-w-0">
            <Searchbar
              onSearch={handleSearch}
              placeholder="Search recruits by name..."
            />
          </div>
          <div className="flex-shrink-0">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {recruitsLoading ? (
          <div className="flex justify-center items-center py-12">
            <ScaleLoader color="rgba(13, 76, 234, 1)" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">
              {selectedSeason
                ? "No recruits found for this class."
                : "Please select a recruiting class to view recruits."}
            </div>
            <p className="text-sm text-gray-400">
              {selectedSeason
                ? "Try adjusting your search or position filters."
                : "Choose a season from the dropdown above to get started."}
            </p>
          </div>
        ) : (
          <Table
            headers={[
              "Player",
              "Position",
              "Star Rating",
              "Height",
              "Weight",
              "State",
              "Gem",
              "Bust",
            ]}
            rows={filteredItems.map((recruit) => ({
              id: recruit.recruit_id || `recruit-${recruit.name}`,
              Player: recruit.name,
              Position: recruit.position,
              "Star Rating": (
                <div className="flex gap-1 justify-center">
                  {[...Array(recruit.stars)].map((_, index) => (
                    <FaStar key={index} className="w-4 h-4 text-blue-700" />
                  ))}
                </div>
              ),
              Height: heightConverter(recruit.height),
              Weight: recruit.weight + " lbs",
              State: recruit.state,
              Gem: recruit.gem ? (
                <span className="text-green-600 font-semibold">Yes</span>
              ) : (
                <span className="text-gray-400">No</span>
              ),
              Bust: recruit.bust ? (
                <span className="text-red-600 font-semibold">Yes</span>
              ) : (
                <span className="text-gray-400">No</span>
              ),
            }))}
          />
        )}
      </div>
      <Modal
        id="recruit-creation-wizard-modal"
        header="Create Recruit"
        body={
          <CreateRecruit
            onSubmit={handleCreateRecruit}
            season_id={0}
            modalId="recruit-creation-wizard-modal"
          />
        }
        size="lg"
      />
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <ScaleLoader color="rgba(13, 76, 234, 1)" />
    </div>
  );
};

export default RecruitingPage;
