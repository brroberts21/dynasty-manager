"use client";
import React from "react";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import DynastyCreationWizard from "../components/features/DynastyCreationWizard";
import { ScaleLoader } from "react-spinners";
import { useDynastyStateFetch } from "../hooks/fetches/useDynastyStateFetch";
import { useFetchThemes } from "../hooks/fetches/useFetchThemes";
import { closeModal, openModal } from "../hooks/components/useModal";

const Settings = () => {
  const { dynastyState, isLoading } = useDynastyStateFetch();
  const { themes, isLoading: themesLoading } = useFetchThemes();
  return (
    <>
      <div>
        {/* Main header with underline */}
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <div className="h-1 w-16 bg-primary rounded mb-6" />

        {/* Section: Set Active Dynasty */}
        <h3 className="text-xl font-semibold mt-6 mb-2 border-l-4 border-primary pl-3">
          Set the Active Dynasty
        </h3>
        <p className="pb-4">
          In this section, users can create new dynasties, set the active
          dynasty, and delete dynasties. Creating a new dynasty will create a
          new coach, team, and season, which culmiates into a new dynasty. 
        </p>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="rgba(13, 76, 234, 1)" />
          </div>
        ) : dynastyState ? (
          <Table
            headers={["Coach", "Team", "Year", "Active", "Activate"]}
            rows={dynastyState.map((dynasty) => ({
              Coach: dynasty.coach_name,
              Team: dynasty.team_name,
              Year: dynasty.year,
              Active: dynasty.is_active ? "Yes" : "No",
              Activate: (
                <div className="flex justify-center gap-4">
                  {dynasty.is_active ? (
                    <button
                      className="text-orange-500 hover:underline transition-colors"
                      onClick={() => {
                        // TODO: Implement deactivate/activate logic and make sure that it is correct
                      }}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      className="text-blue-700 hover:underline transition-colors"
                      onClick={() => {
                        // TODO: Implement deactivate/activate logic and make sure that it is correct
                      }}
                    >
                      Activate
                    </button>
                  )}

                  <button className="text-red-600 hover:underline transition-colors">
                    Delete
                  </button>
                </div>
              ),
            }))}
          />
        ) : (
          <div className="mb-4 text-red-500">No dynasty data found.</div>
        )}

        <button
          onClick={() => openModal("dynasty-creation-wizard-modal")}
          className="btn btn-primary mt-4"
        >
          Create Dynasty
        </button>

        {/* Section: Themes for the Site */}
        <h3 className="text-xl font-semibold mt-8 mb-2 border-l-4 border-primary pl-3">
          Themes for the Site
        </h3>
        {themesLoading ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="rgba(13, 76, 234, 1)" />
          </div>
        ) : themes ? (
          <Table
            headers={[
              "Team",
              "Primary Color",
              "Secondary Color",
              "Tertiary Color",
              "Edit",
            ]}
            rows={themes.map((theme) => ({
              Team: theme.name,
              "Primary Color": theme.primary_color,
              "Secondary Color": theme.secondary_color,
              "Tertiary Color": theme.tertiary_color,
              Edit: (
                <button className="text-yellow-500 hover:underline transition-colors">
                  Edit
                </button>
              ),
            }))}
          />
        ) : (
          <div className="mb-4 text-red-500">No themes found.</div>
        )}
      </div>
      <Modal
        id="dynasty-creation-wizard-modal"
        header="Dynasty Creation Wizard"
        body={<DynastyCreationWizard />}
        size="xl"
      />
    </>
  );
};

export default Settings;
