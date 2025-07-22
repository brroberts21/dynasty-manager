"use client";
import React, { useState } from "react";
import Table from "../components/ui/Table";
import Header from "../components/ui/Header";
import Modal from "../components/ui/Modal";
import TeamForm from "../components/forms/TeamForm";
import Searchbar from "../components/ui/Searchbar";
import Tabs from "../components/ui/Tabs";

import { ScaleLoader } from "react-spinners";
import { useFetchTeams } from "../hooks/fetches/useFetchTeams";
import { useUpdateTeam } from "../hooks/updates/useUpdateTeam";
import { Team } from "../types";
import { closeModal, openModal } from "../hooks/components/useModal";
import { useDeleteTeam } from "../hooks/deletes/useDeleteTeam";
import { useSearchbar } from "../hooks/components/useSearchbar";
import { useTabs } from "../hooks/components/useTabs";
import { FaPlus } from "react-icons/fa";

const Teams = () => {
  const { teams, isLoading } = useFetchTeams();

  // Use tabs hook to filter by conference
  const {
    tabs,
    activeTab,
    filteredItems: tabFilteredItems,
    handleTabChange,
  } = useTabs(teams, "conference", "All Conferences");

  // Use searchbar hook to search within tab-filtered items
  const { filteredItems, handleSearch } = useSearchbar(
    tabFilteredItems,
    "name"
  );
  const {
    updateTeam,
    loading,
    error: updateError,
    success: updateSuccess,
    reset: updateReset,
  } = useUpdateTeam();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const {
    deleteTeam,
    isDeleting,
    isSuccess,
    error: deleteError,
  } = useDeleteTeam();

  const handleCreateTeam = async (team: Team) => {
    const response = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });
    const data = await response.json();
    closeModal("create-team-modal");
    window.location.reload();
  };

  const handleEditTeam = async (team: Team) => {
    const response = await updateTeam(team.team_id?.toString() || "", team);
    if (response) {
      closeModal("edit-team-modal");
      window.location.reload();
    }
  };

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
    openModal("edit-team-modal");
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <ScaleLoader color="rgba(13, 76, 234, 1)" />
    </div>
  ) : (
    <>
      <Header title="Teams" />
      <h3 className="text-xl font-semibold mt-6 mb-2 border-l-4 border-primary pl-3">
        Current Teams
      </h3>
      <p className="text-gray-600 mb-6">
        On this page, users can create, edit, and delete teams that can be used
        to create dynasties.
      </p>

      {/* Controls Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        {/* Search and Button Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <Searchbar onSearch={handleSearch} placeholder="Search teams..." />
          </div>
          <div className="flex-shrink-0">
            <button
              className="btn btn-primary btn-sm lg:btn-md shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => openModal("create-team-modal")}
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Create Team
            </button>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="w-full">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <Table
          headers={["Team", "Conference", "Location", "Colors", "Actions"]}
          rows={filteredItems.map((team) => ({
            id: team.team_id || `team-${team.name}`,
            Team: team.name,
            Conference: team.conference,
            Location: `${team.city}, ${team.state}`,
            Colors: `${team.primary_color}, ${team.secondary_color}, ${team.tertiary_color}`,
            Actions: (
              <div className="flex gap-2 justify-center">
                <button
                  className="text-yellow-500 hover:underline transition-colors"
                  onClick={() => handleEditClick(team)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline transition-colors"
                  onClick={() => {
                    deleteTeam(team.team_id || 0);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            ),
          }))}
        />
      </div>

      <Modal
        header="Create Team"
        body={
          <TeamForm onSubmit={handleCreateTeam} modalId="create-team-modal" />
        }
        id="create-team-modal"
        size="lg"
      />
      <Modal
        header="Edit Team"
        body={
          <TeamForm
            onSubmit={handleEditTeam}
            initialData={selectedTeam || undefined}
            modalId="edit-team-modal"
          />
        }
        id="edit-team-modal"
        size="lg"
      />
    </>
  );
};

export default Teams;
