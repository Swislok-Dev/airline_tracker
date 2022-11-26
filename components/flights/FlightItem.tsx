import React from "react";
import "../../styles/Tracker.module.css";

const convertDate = (date: Date) => {
  if (date) {
    const toDateString = new Date(date);
    const newDate = toDateString.toUTCString().split("GMT")[0];
    return newDate;
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
        <h2>
          Flight
          <br />
          {flightNumber.toUpperCase()}
        </h2>
        <h3>{nextFlight.status}</h3>
        <h4>{placeDate()} UTC</h4>
      </div>

      <div className=" items-auto m-auto mt-4 grid justify-center gap-2 px-2 sm:max-w-lg sm:grid-cols-2 md:max-w-2xl md:grid-rows-2 ">
        <div className="m-2 max-w-sm border p-4">
          <h3 className="mb-4 font-bold">Departure</h3>
          <table className="border-separate border-spacing-1">
            <tbody>
              <tr>
                <td>Scheduled Takeoff</td>
                <td>{convertDate(nextFlight.scheduled_off)}</td>
              </tr>
              <tr>
                <td>Actuall Takeoff</td>
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
          <h3 className="mb-4 font-bold">Arrival</h3>
          <table className="border-separate border-spacing-1">
            <tbody>
              {nextFlight.scheduled_on === nextFlight.estimate_on ? (
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
