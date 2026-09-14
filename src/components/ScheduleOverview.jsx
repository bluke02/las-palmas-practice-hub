import schedule from "../data/schedule.json";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const fieldOrder = ["East", "West", "Tee Ball"];

function timeToMinutes(time) {
  const [clock, meridiem] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
}

function sortSchedule(a, b) {
  const dayDifference =
    dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);

  return dayDifference || timeToMinutes(a.start) - timeToMinutes(b.start);
}

export default function ScheduleOverview({
  selectedProgram,
  selectedDivision,
  selectedTeam,
}) {
  const schedulesByField = fieldOrder.map((field) => ({
    field,
    teams: schedule
      .filter(
        (team) =>
          team.field === field &&
          (!selectedTeam || team.id === selectedTeam) &&
          (!selectedProgram ||
            team.division.startsWith(`${selectedProgram} - `)) &&
          (!selectedDivision || team.division === selectedDivision)
      )
      .sort(sortSchedule),
  }));

  return (
    <section className="schedule-overview" aria-labelledby="schedule-heading">
      <h2 id="schedule-heading">Recurring Practice Schedule</h2>
      <p className="schedule-intro">
        Weekly practice assignments grouped by field
        {selectedProgram || selectedDivision ? " for the selected filters." : "."}
      </p>

      <div className="field-schedules">
        {schedulesByField
          .filter(({ teams }) => teams.length > 0)
          .map(({ field, teams }) => (
            <div className="field-schedule" key={field}>
              <h3>{field} Field</h3>
              <div className="schedule-table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Time</th>
                      <th scope="col">Team</th>
                      <th scope="col">Division</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id}>
                        <td>{team.day}</td>
                        <td>
                          {team.start} - {team.end}
                        </td>
                        <td>{team.team}</td>
                        <td>{team.division}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
