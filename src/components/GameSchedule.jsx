import games from "../data/games.json";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function GameSchedule({ selectedProgram, selectedDivision }) {
  const gamesForView =
    !selectedProgram ||
    selectedProgram === "Tee Ball" ||
    selectedDivision === "Tee Ball"
      ? games
      : [];

  return (
    <section className="schedule-overview" aria-labelledby="games-heading">
      <h2 id="games-heading">Game Schedule</h2>
      <p className="schedule-intro">
        Fall 2026 Tee Ball games, filtered by the selected program or division.
      </p>

      {gamesForView.length > 0 ? (
        <div className="field-schedule">
          <div className="schedule-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Home Team</th>
                  <th scope="col">Away Team</th>
                </tr>
              </thead>
              <tbody>
                {gamesForView.map(([date, start, end, home, away]) => (
                  <tr key={`${date}-${start}`}>
                    <td>{formatDate(date)}</td>
                    <td>{start} - {end}</td>
                    <td>{home}</td>
                    <td>{away}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="empty-schedule">
          No games are listed for the selected program or division.
        </p>
      )}
    </section>
  );
}
