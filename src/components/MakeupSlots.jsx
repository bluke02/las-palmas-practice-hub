const makeupSlots = [
  {
    day: "Monday - Thursday",
    time: "3:00 PM - 5:00 PM",
    field: "East and West Fields",
  },
  {
    day: "Monday and Friday",
    time: "5:00 PM - 7:00 PM",
    field: "Tee Ball Field",
  },
  {
    day: "Monday",
    time: "7:00 PM - 8:30 PM",
    field: "West Field",
  },
];

export default function MakeupSlots() {
  return (
    <section className="makeup-slots" aria-labelledby="makeup-heading">
      <h2 id="makeup-heading">Makeup Slots</h2>
      <p className="makeup-note">
        Contact Benjamin Luke to book a makeup practice before using an open
        slot.
      </p>

      <div className="makeup-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Time</th>
              <th scope="col">Field</th>
            </tr>
          </thead>
          <tbody>
            {makeupSlots.map((slot) => (
              <tr key={`${slot.day}-${slot.field}`}>
                <td>{slot.day}</td>
                <td>{slot.time}</td>
                <td>{slot.field}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
