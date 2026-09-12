import { useRef, useState } from "react";
import schedule from "../data/schedule.json";

function openPrintWindow(scheduleElement) {
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    window.alert("Please allow pop-ups to print your schedule.");
    return;
  }

  const scheduleMarkup = scheduleElement.cloneNode(true);
  scheduleMarkup.querySelector("button")?.remove();

  printWindow.document.write(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Practice Schedule</title>
        <style>
          body {
            color: #111827;
            font-family: Arial, sans-serif;
            margin: 2rem;
          }
          .team-card {
            max-width: 32rem;
          }
          h3 {
            color: #082b63;
            font-size: 1.5rem;
            margin-top: 0;
          }
          p {
            line-height: 1.5;
            margin: 1rem 0;
          }
        </style>
      </head>
      <body>${scheduleMarkup.outerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export default function TeamFinder() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const scheduleRef = useRef(null);

  const teamData = schedule.find(
    (team) => team.id === selectedTeam
  );
  const teamCounts = schedule.reduce((counts, team) => {
    counts[team.team] = (counts[team.team] || 0) + 1;
    return counts;
  }, {});

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
        <div className="team-card" ref={scheduleRef}>
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
            onClick={() => openPrintWindow(scheduleRef.current)}
          >
            Print Schedule
          </button>
        </div>
      )}
    </div>
  );
}
