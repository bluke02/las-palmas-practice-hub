import TeamFinder from "../components/TeamFinder";
import ScheduleOverview from "../components/ScheduleOverview";

export default function Home() {
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
          <TeamFinder />
        </div>

        <ScheduleOverview />
      </div>
    </>
  );
}
