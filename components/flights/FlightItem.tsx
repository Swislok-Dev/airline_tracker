import React from "react";
import { getDate, getTime } from "../../components/flights/functions.js";
import * as functions from "../flights/functions";

function FlightItem({ nextFlight, flightNumber }: any) {
  const getOriginAirportName = () => {
    return nextFlight.origin.name;
  };
  const getDestinationAirportName = () => {
    return nextFlight.destination.name;
  };

  const checkNullValue = (flight: any) => {
    if (flight === null) {
      return "N/A";
    } else {
      return flight;
    }
  };

  return (
    <>
      {nextFlight === undefined ? (
        <div className="text-white">
          <p>Flight not found</p>
          <p>Please check your flight number</p>
        </div>
      ) : (
        <div className="flight-ticket">
          <div className="flex flex-col text-left shadow">
            <div
              className={
                "flight-status " +
                functions.checkFlightStatus(nextFlight.status)
              }
            >
              <h3>{`${nextFlight.status}`}</h3>
              <span></span>
            </div>
            <div className="bg-blue-400 p-4">
              <h2 title="this is an internal reference number and may differ from your input">
                {flightNumber === nextFlight.ident
                  ? nextFlight.ident.toUpperCase()
                  : nextFlight.ident_iata.toUpperCase()}
              </h2>
            </div>
          </div>
          <div id="progress" className="flex text-white">
            <h2>{nextFlight.origin.code_iata}</h2>
            <div id="progress-bar">
              <span
                style={{
                  visibility: "visible",
                  width: `${Number(nextFlight.progress_percent)}%`,
                }}
              >
                progress
              </span>
            </div>
            <h2>{nextFlight.destination.code_iata}</h2>
          </div>

          <div>
            <div className="card">
              <h2 className="iata-code">{nextFlight.origin.code_iata}</h2>
              <span className="airport-name">{getOriginAirportName()}</span>
              <h3>Departure Times</h3>
              <span>{getDate(nextFlight.scheduled_off)}</span>
              <div className="flight-times">
                <div>
                  <h3>Scheduled</h3>
                  <span>{getTime(nextFlight.scheduled_off)}</span>
                </div>
                <div>
                  {nextFlight.status.includes("En Route") ? (
                    <div>
                      <h3>Actual</h3>

                      <span>{getTime(nextFlight.actual_off)}</span>
                    </div>
                  ) : (
                    <div>
                      <h3>Estimated</h3>
                      <span>{getTime(nextFlight.estimated_off)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terminal-info">
                <div className="terminal">
                  <h3>Terminal</h3>
                  <span>{checkNullValue(nextFlight.terminal_origin)}</span>
                </div>
                <div className="gate">
                  <h3>Gate</h3>
                  <span>{checkNullValue(nextFlight.gate_origin)}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="iata-code">{nextFlight.destination.code_iata}</h2>
              <span className="airport-name">
                {getDestinationAirportName()}
              </span>
              <h3>Arrival Times</h3>
              <span>{getDate(nextFlight.scheduled_on)}</span>
              <div className="flight-times">
                <div>
                  <h3>Scheduled</h3>
                  <span>{getTime(nextFlight.scheduled_on)}</span>
                </div>
                <div>
                  {nextFlight.status.includes("Arrived") ? (
                    <div>
                      <h3>Actual</h3>

                      <span>{getTime(nextFlight.actual_on)}</span>
                    </div>
                  ) : (
                    <div>
                      <h3>Estimated</h3>
                      <span>{getTime(nextFlight.estimated_on)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terminal-info">
                <div className="terminal">
                  <h3>Terminal</h3>
                  <span>{checkNullValue(nextFlight.terminal_destination)}</span>
                </div>
                <div className="gate">
                  <h3>Gate</h3>
                  <span>{checkNullValue(nextFlight.gate_destination)}</span>
                </div>
                {nextFlight.baggage_claim !== null ? (
                  <div className="baggage-claim">
                    <h3>Baggage</h3>
                    <span>{nextFlight.baggage_claim}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FlightItem;
