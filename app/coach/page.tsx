"use client";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import Subheader from "../components/ui/Subheader";
import EventForm from "../components/forms/EventForm";
import Modal from "../components/ui/Modal";
import Timeline from "../components/features/Timeline";
import Select from "react-select";
import { ScaleLoader } from "react-spinners";
import { useFetchCoachProfile } from "../hooks/fetches/useFetchCoachProfile";
import { useFetchDynastyStates } from "../hooks/fetches/useFetchDynastyStates";
import { useFetchCoaches } from "../hooks/fetches/useFetchCoaches";
import { useFetchDynastyEvents } from "../hooks/fetches/useFetchDynastyEvents";
import { useCreateEvent } from "../hooks/creates/useCreateEvent";
import { useState, useEffect } from "react";
import { closeModal, openModal } from "../hooks/components/useModal";
import { DynastyState, Coach } from "../types";
import { FaPlus } from "react-icons/fa";

const CoachPage = () => {
  const { dynastyState, isLoading: dynastyStateLoading } =
    useFetchDynastyStates();
  const { coaches, isLoading: coachesLoading } = useFetchCoaches();
  const [selectedDynastyState, setSelectedDynastyState] =
    useState<DynastyState | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const { createEvent, isLoading: createEventLoading } = useCreateEvent();

  // Set selectedCoach to the active coach by default
  useEffect(() => {
    if (!selectedCoach && coaches.length > 0) {
      const defaultCoachId = dynastyState?.[0]?.current_coach_id || 1;
      const defaultCoach = coaches.find((c) => c.coach_id === defaultCoachId);
      if (defaultCoach) setSelectedCoach(defaultCoach);
    }
  }, [coaches, dynastyState, selectedCoach]);

  // Get the active coach ID from dynasty state or use selected coach
  const defaultCoachId = dynastyState?.[0]?.current_coach_id || 1;
  const coachIdToFetch = selectedCoach?.coach_id || defaultCoachId;
  const { profile, isLoading: coachProfileLoading } =
    useFetchCoachProfile(coachIdToFetch);
  const { events, isLoading: eventsLoading } =
    useFetchDynastyEvents(coachIdToFetch);
  if (coachProfileLoading || dynastyStateLoading || coachesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="rgba(13, 76, 234, 1)" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Coach Not Found
          </h2>
          <p className="text-gray-500">Unable to load coach profile.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title="Coach Profile" />
      <Subheader title={`About ${profile.biographical.name}`} />

      {/* Coach Overview Section */}
      <Card title={profile.biographical.name} width="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.biographical.name.charAt(0)}
            </div>
            <div>
              <p className="text-gray-600">
                {profile.biographical.years_exp} years of coaching experience
                {profile.biographical.coached_teams &&
                  ` at ${profile.biographical.coached_teams}`}
              </p>
            </div>
          </div>

          {/* Coach Selector */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Coach
            </label>
            <div className="w-48">
              <Select
                options={coaches.map((coach) => ({
                  value: coach.coach_id,
                  label: coach.name,
                }))}
                value={
                  coaches.find((coach) => coach.coach_id === coachIdToFetch)
                    ? {
                        value: coachIdToFetch,
                        label:
                          coaches.find(
                            (coach) => coach.coach_id === coachIdToFetch
                          )?.name || "",
                      }
                    : null
                }
                onChange={(option: any) => {
                  if (option) {
                    const selectedCoachData = coaches.find(
                      (coach) => coach.coach_id === option.value
                    );
                    setSelectedCoach(selectedCoachData || null);
                  }
                }}
                isClearable={false}
                placeholder="Select a coach..."
                isLoading={coachesLoading}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Coaching Style */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Coaching Style
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Offensive:
                </span>
                <p className="text-gray-900">
                  {profile.biographical.offensive_style || "N/A"}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Defensive:
                </span>
                <p className="text-gray-900">
                  {profile.biographical.defensive_style || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Career Record */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Career Record
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Overall:
                </span>
                <p className="text-gray-900 font-semibold">
                  {profile.record.wins} - {profile.record.losses} (
                  {(profile.record.win_pct * 100).toFixed(1)}%)
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Playoffs:
                </span>
                <p className="text-gray-900">
                  {profile.record.playoff_wins} -{" "}
                  {profile.record.playoff_losses} (
                  {(profile.record.playoff_win_pct * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>

          {/* Championships */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Post-Season Record
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Bowls:
                </span>
                <p className="text-gray-900">
                  {profile.appearances.bowl_wins} -{" "}
                  {profile.appearances.bowl_app - profile.appearances.bowl_wins}{" "}
                  ({(profile.appearances.bowl_win_pct * 100).toFixed(1)}%)
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Conference Championships:
                </span>
                <p className="text-gray-900">
                  {profile.appearances.cc_wins} -{" "}
                  {profile.appearances.cc_app - profile.appearances.cc_wins} (
                  {(profile.appearances.cc_win_pct * 100).toFixed(1)}%)
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  National Championships:
                </span>
                <p className="text-gray-900">
                  {profile.appearances.nc_wins} -{" "}
                  {profile.appearances.nc_app - profile.appearances.nc_wins} (
                  {(profile.appearances.nc_win_pct * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>

          {/* Season Performance */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Season Performance
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Top 25 Finishes:
                  </span>
                  <p className="text-gray-900">
                    {profile.finishes.top_25_finishes} finishes
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Top 10 Finishes:
                  </span>
                  <p className="text-gray-900">
                    {profile.finishes.top_10_finishes} finishes
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Top 5 Finishes:
                  </span>
                  <p className="text-gray-900">
                    {profile.finishes.top_5_finishes} finishes
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Undefeated Seasons:
                  </span>
                  <p className="text-gray-900">
                    {profile.record.undefeated_seasons} seasons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <br />
      {/* Detailed Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Appearances & Achievements */}
        <Card title="Appearances & Achievements" width="w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-2xl font-bold text-blue-600">
                  {profile.appearances.bowl_app}
                </div>
                <div className="text-sm text-gray-600">Bowl Appearances</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-2xl font-bold text-green-600">
                  {profile.appearances.cc_app}
                </div>
                <div className="text-sm text-gray-600">
                  Conference Championships
                </div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.appearances.nc_app}
                </div>
                <div className="text-sm text-gray-600">
                  National Championships
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-2xl font-bold text-blue-600">
                  {profile.appearances.bowl_wins}
                </div>
                <div className="text-sm text-gray-600">Bowl Wins</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-2xl font-bold text-green-600">
                  {profile.appearances.cc_wins}
                </div>
                <div className="text-sm text-gray-600">Conference Wins</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.appearances.nc_wins}
                </div>
                <div className="text-sm text-gray-600">National Wins</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Recruiting Success */}
        <Card title="Recruiting Success" width="w-full">
          <div className="space-y-4">
            <div className="text-center p-3 bg-fuchsia-50 rounded-lg hover:bg-fuchsia-100 transition-colors">
              <div className="text-2xl font-bold text-purple-600">
                {profile.recruiting.top_recruiting_class}
              </div>
              <div className="text-sm text-gray-600">#1 Recruiting Classes</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <div className="text-2xl font-bold text-yellow-600">
                  {profile.recruiting.top_25_recruiting_classes}
                </div>
                <div className="text-sm text-gray-600">Top 25 Classes</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="text-2xl font-bold text-orange-600">
                  {profile.recruiting.top_10_recruiting_classes}
                </div>
                <div className="text-sm text-gray-600">Top 10 Classes</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <div className="text-2xl font-bold text-red-600">
                  {profile.recruiting.top_5_recruiting_classes}
                </div>
                <div className="text-sm text-gray-600">Top 5 Classes</div>
              </div>
              <div className="text-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                <div className="text-2xl font-bold text-pink-600">
                  {profile.recruiting.five_star_recruits}
                </div>
                <div className="text-sm text-gray-600">5-Star Recruits</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <Subheader title={`${profile.biographical.name}'s Career Timeline`} />
        <button
          className="btn btn-primary btn-sm flex items-center gap-2"
          onClick={() => openModal("eventForm")}
        >
          <FaPlus className="w-4 h-4" />
          Add Event
        </button>
      </div>
      <Modal
        id="eventForm"
        header="Add Event"
        body={
          <EventForm
            onSubmit={(eventData) => {
              if (!selectedCoach?.coach_id) {
                alert("Please select a coach before creating an event.");
                return;
              }
              createEvent({ ...eventData, coach_id: selectedCoach.coach_id });
              closeModal("eventForm");
              window.location.reload();
            }}
            modalId="eventForm"
            initialData={{
              coach_id: selectedCoach?.coach_id || 0,
              header: "",
              description: "",
              year: 0,
              time: "",
            }}
          />
        }
      />
      <Timeline events={events} />
    </>
  );
};

export default CoachPage;
