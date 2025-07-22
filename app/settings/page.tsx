"use client";
import React from "react";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Header from "../components/ui/Header";
import Subheader from "../components/ui/Subheader";
import DynastyCreationWizard from "../components/features/DynastyCreationWizard";
import { ScaleLoader } from "react-spinners";
import { useFetchDynastyStates } from "../hooks/fetches/useFetchDynastyStates";
import { useActivateDynasty } from "../hooks/updates/useActivateDynasty";
import { useFetchThemes } from "../hooks/fetches/useFetchThemes";
import { closeModal, openModal } from "../hooks/components/useModal";

const Settings = () => {
  const { dynastyState, isLoading } = useFetchDynastyStates();
  const { themes, isLoading: themesLoading } = useFetchThemes();
  const {
    isLoading: activateLoading,
    error,
    isSuccess,
    activateDynasty,
  } = useActivateDynasty();
  return (
    <>
      <Header title="Settings" />
      <div>
        {/* Section: Set Active Dynasty */}
        <Subheader title="Set the Active Dynasty" />
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
                  {dynasty.is_active ? null : (
                    <button
                      className="text-blue-700 hover:underline transition-colors"
                      onClick={() => {
                        activateDynasty(dynasty.dynasty_id);
                        window.location.reload();
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
        <Subheader title="Themes for the Site" />
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
