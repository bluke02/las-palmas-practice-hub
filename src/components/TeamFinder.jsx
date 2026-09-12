import { useState } from "react";
import schedule from "../data/schedule.json";

export default function TeamFinder() {
  const [selectedTeam, setSelectedTeam] = useState("");

  const teamData = schedule.find(
    (team) => team.team === selectedTeam
  );

  return (
    <div>
      <h2>Find My Team</h2>

      <select
        value={selectedTeam}
        onChange={(e) =>
          setSelectedTeam(e.target.value)
        }
      >
        <option value="">
          Select Your Team
        </option>

        {schedule.map((team) => (
          <option
            key={team.team}
            value={team.team}
          >
            {team.team}
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

          <button
            onClick={() => window.print()}
          >
            Print Schedule
          </button>
        </div>
      )}
    </div>
  );
}
