import TeamFinder from "../components/TeamFinder";

export default function Home() {
  return (
    <>
      <section className="hero">
        /logo.png

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
      </div>
    </>
  );
}
