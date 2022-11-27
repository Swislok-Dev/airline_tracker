import React from "react";

const convertDate = (date: Date) => {
  if (date) {
    const toDateString = new Date(date);
    const newDate = toDateString.toLocaleDateString();
    const newTime = toDateString.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    });

    const newDateAndTime = newTime + " " + newDate;
    return newDateAndTime;
  }
};

const placeDate = () => {
  let date: Date = new Date();
  return convertDate(date);
};

function FlightItem({ nextFlight, flightNumber }: any) {
  const getOriginAirportName = () => {
    return nextFlight.origin.name;
  };
  const getDestinationAirportName = () => {
    return nextFlight.destination.name;
  };
  return (
    <div>
      <div>
        <h2 className="m-4 text-2xl font-bold">
          Flight
          <br />
          {flightNumber.toUpperCase()}
        </h2>
        <span className="mt-2 text-xl font-semibold">Flight Status</span>
        <h3 className="mb-2 text-xl font-semibold">{nextFlight.status}</h3>
        <h4 className="text-lg font-medium">
          Current locale time <br />
          {placeDate()}
        </h4>

        <span className="text-xl font-semibold">
          {nextFlight.status === "Scheduled"
            ? null
            : `Progress: ${nextFlight.progress_percent}%`}
        </span>
      </div>

      <div className=" items-auto m-auto mt-4 grid justify-center gap-2 px-2 sm:max-w-lg sm:grid-cols-2 md:max-w-2xl md:grid-rows-2 ">
        <div className="m-2 max-w-sm border p-5">
          <h3 className="mb-4 text-xl font-bold">Departure</h3>
          <table className="border-separate border-spacing-1">
            <tbody>
              <tr>
                <td>Scheduled Takeoff</td>
                <td>{convertDate(nextFlight.scheduled_off)}</td>
              </tr>
              <tr>
                <td>Actual Takeoff</td>
                <td>{convertDate(nextFlight.actual_off)}</td>
              </tr>
              <tr>
                <td>Airport</td>
                <td>{getOriginAirportName()}</td>
              </tr>
              <tr>
                <td>Terminal</td>
                <td>{nextFlight.terminal_origin}</td>
              </tr>
              <tr>
                <td>Gate</td>
                <td>{nextFlight.gate_origin}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="m-2 max-w-sm border p-4">
          <h3 className="mb-4 text-xl font-bold">Arrival</h3>
          <table className="border-separate border-spacing-1">
            <tbody>
              {nextFlight.scheduled_on === nextFlight.estimated_on ? (
                <tr>
                  <td>Schedule Arrival</td>
                  <td>{convertDate(nextFlight.scheduled_on)}</td>
                </tr>
              ) : (
                <tr>
                  <td>Estimated Arrival</td>
                  <td>{convertDate(nextFlight.estimated_on)}</td>
                </tr>
              )}
              <tr>
                <td>Actual Arrival</td>
                <td>{convertDate(nextFlight.actual_on)}</td>
              </tr>
              <tr>
                <td>Airport</td>
                <td>{getDestinationAirportName()}</td>
              </tr>
              <tr>
                <td>Terminal</td>
                <td>{nextFlight.terminal_destination}</td>
              </tr>
              <tr>
                <td>Gate</td>
                <td>{nextFlight.gate_destination}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlightItem;
