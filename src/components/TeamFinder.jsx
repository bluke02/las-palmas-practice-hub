import { useState } from "react";
import schedule from "../data/schedule.json";

export default function TeamFinder({
  selectedProgram,
  selectedDivision,
  onProgramChange,
  onDivisionChange,
}) {
  const [selectedTeam, setSelectedTeam] = useState("");

  const programs = [...new Set(schedule.map((team) => team.division.split(" - ")[0]))];
  const divisions = [
    ...new Set(
      schedule
        .filter(
          (team) =>
            !selectedProgram ||
            team.division.startsWith(`${selectedProgram} - `)
        )
        .map((team) => team.division)
    ),
  ];
  const filteredSchedule = schedule.filter(
    (team) =>
      (!selectedProgram ||
        team.division.startsWith(`${selectedProgram} - `)) &&
      (!selectedDivision || team.division === selectedDivision)
  );
  const teamData = filteredSchedule.find((team) => team.id === selectedTeam);
  const teamCounts = schedule.reduce((counts, team) => {
    counts[team.team] = (counts[team.team] || 0) + 1;
    return counts;
  }, {});

  return (
    <div>
      <h2>Find My Team</h2>

      <div className="filter-controls">
        <label>
          Program
          <select
            value={selectedProgram}
            onChange={(e) => {
              onProgramChange(e.target.value);
              setSelectedTeam("");
            }}
          >
            <option value="">All Programs</option>
            {programs.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </label>

        <label>
          Division
          <select
            value={selectedDivision}
            onChange={(e) => {
              onDivisionChange(e.target.value);
              setSelectedTeam("");
            }}
          >
            <option value="">All Divisions</option>
            {divisions.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
        </label>
      </div>

      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
      >
        <option value="">
          Select Your Team
        </option>

        {filteredSchedule.map((team) => (
          <option
            key={team.id}
            value={team.id}
          >
            {team.team}
            {teamCounts[team.team] > 1
              ? ` - ${team.division}`
              : ""}
          </option>
        ))}
      </select>

      {teamData && (
        <div className="team-card">
          <h3>{teamData.team}</h3>

          <p>
            <strong>Day:</strong> {teamData.day}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {teamData.start} - {teamData.end}
          </p>

          <p>
            <strong>Field:</strong> {teamData.field}
          </p>

          <p>
            <strong>Division:</strong>{" "}
            {teamData.division}
          </p>
        </div>
      )}
    </div>
  );
}
