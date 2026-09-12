import { useState } from "react";
import TeamFinder from "../components/TeamFinder";
import ScheduleOverview from "../components/ScheduleOverview";
import MakeupSlots from "../components/MakeupSlots";

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <>
      <section className="hero">
        <img
          className="hero-logo"
          src="/logo.png"
          alt="Las Palmas"
        />

        <h1>Las Palmas Practice Hub</h1>

        <p>
          Fall 2026 Practice Schedules,
          Team Information,
          and Field Assignments.
        </p>
      </section>

      <div className="container">
        <div className="card">
          <TeamFinder
            selectedProgram={selectedProgram}
            selectedDivision={selectedDivision}
            onProgramChange={(program) => {
              setSelectedProgram(program);
              setSelectedDivision("");
            }}
            onDivisionChange={setSelectedDivision}
          />
        </div>

        <div className="schedule-tabs" role="tablist" aria-label="Schedule views">
          <button
            className={activeTab === "schedule" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("schedule")}
            role="tab"
            aria-selected={activeTab === "schedule"}
          >
            Recurring Schedule
          </button>
          <button
            className={activeTab === "makeup" ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab("makeup")}
            role="tab"
            aria-selected={activeTab === "makeup"}
          >
            Makeup Slots
          </button>
        </div>

        {activeTab === "schedule" ? (
          <ScheduleOverview
            selectedProgram={selectedProgram}
            selectedDivision={selectedDivision}
          />
        ) : (
          <MakeupSlots />
        )}
      </div>
    </>
  );
}
