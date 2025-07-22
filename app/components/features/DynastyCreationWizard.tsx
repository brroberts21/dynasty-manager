import React, { useState } from "react";
import Stepper from "@/app/components/ui/Stepper";
import CreateDynasty from "@/app/components/forms/DynastyForm";
import CreateCoach from "@/app/components/forms/CoachForm";
import CreateTeam from "@/app/components/forms/TeamForm";
import CreateSeason from "@/app/components/forms/SeasonForm";
import { Dynasty, Coach, Team, Season } from "@/app/types";
import DynastyConfirmation from "@/app/components/features/Confirmation";
import { closeModal } from "@/app/hooks/components/useModal";
import { useDynastyCreation } from "@/app/hooks/creates/useDynastyCreation";

const DynastyCreationWizard = () => {
  const stepLabels = [
    "Dynasty Info",
    "Coach Info",
    "Team Info",
    "Season Info",
    "Confirmation",
  ];
  const [step, setStep] = useState(1);
  const { createDynasty, isLoading, error, isSuccess, reset } =
    useDynastyCreation();
  const [dynasty, setDynasty] = useState<Dynasty>({
    name: "",
    is_active: false,
  });
  const [coach, setCoach] = useState<Coach>({
    name: "",
    offensive_style: "",
    defensive_style: "",
  });
  const [team, setTeam] = useState<Team>({
    name: "",
    conference: "",
    city: "",
    state: "",
    latitude: 0,
    longitude: 0,
    primary_color: "",
    secondary_color: "",
    tertiary_color: "",
    logo_url: "",
  });
  const [season, setSeason] = useState<Season>({
    year: 0,
    team_id: 0,
    coach_id: 0,
    coach_role: "",
    offensive_overall: 0,
    defensive_overall: 0,
    overall: 0,
    wins: 0,
    losses: 0,
    final_rank: 0,
    conf_champ: false,
    bowl_game: false,
    championship: false,
    recruiting_rank: 0,
  });

  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Stepper labels={stepLabels} currentStep={step} />
      {step === 1 && (
        <CreateDynasty
          onSubmit={(data: Dynasty) => {
            setDynasty(data);
            setStep(step + 1);
          }}
          initialData={dynasty}
          modalId="dynasty-creation-wizard-modal"
        />
      )}
      {step === 2 && (
        <CreateCoach
          onSubmit={(data: Coach) => {
            setCoach(data);
            setStep(step + 1);
          }}
          onBack={handleBack}
          initialData={coach}
          modalId="dynasty-creation-wizard-modal"
        />
      )}
      {step === 3 && (
        <CreateTeam
          onSubmit={(data: Team) => {
            setTeam(data);
            setStep(step + 1);
          }}
          onBack={handleBack}
          initialData={team}
          modalId="dynasty-creation-wizard-modal"
        />
      )}
      {step === 4 && (
        <CreateSeason
          onSubmit={(data: Season) => {
            setSeason(data);
            setStep(step + 1);
          }}
          onBack={handleBack}
          initialData={season}
          modalId="dynasty-creation-wizard-modal"
        />
      )}
      {step === 5 && (
        <DynastyConfirmation
          onSubmit={async () => {
            const result = await createDynasty({
              dynasty,
              coach,
              team,
              season,
            });

            if (result) {
              closeModal("dynasty-creation-wizard-modal");
              reset();
            }
          }}
          onBack={handleBack}
          dynasty={dynasty}
          coach={coach}
          team={team}
          season={season}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default DynastyCreationWizard;
