import React, { useState } from "react";
import {
  convertTZ,
  getDate,
  getTime,
} from "../../components/flights/functions.js";
import * as functions from "../flights/functions";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

function FlightItem({ currentFlight, flightNumber, flights }: any) {
  const [displayCurrentFlight, setDisplayCurrentFlight] =
    useState(currentFlight);
  const {
    scheduled_off,
    scheduled_on,
    estimated_off,
    estimated_on,
    origin,
    destination,
    actual_on,
    actual_off,
    status,
    terminal_origin,
    terminal_destination,
    gate_origin,
    gate_destination,
    baggage_claim,
    progress_percent,
  } = displayCurrentFlight;
  const [isLocalTime, setIsShowLocalTime] = useState(true);

  const getFlightIndex = (flight: any) => {
    return flights.data.indexOf(flight);
  };

  let index = getFlightIndex(displayCurrentFlight);

  const getPreviousFlight = () => {
    if (index == 0) {
      null;
    } else {
      setDisplayCurrentFlight(flights.data[index - 1]);
    }
  };
  const getNextFlight = () => {
    if (index !== flights.data.length - 1) {
      setDisplayCurrentFlight(flights.data[index + 1]);
    }
  };

  const returnToCurrentFlight = () => {
    setDisplayCurrentFlight(currentFlight);
  };

  const checkNullValue = (flight: any) => {
    if (flight === null) {
      return "N/A";
    } else {
      return flight;
    }
  };

  const showLocalTimezone = () => {
    setIsShowLocalTime(!isLocalTime);
  };

  const toggleTimezones = (date: Date, location: any) => {
    if (isLocalTime) {
      return getTime(date);
    } else {
      return getTime(convertTZ(date, location.timezone));
    }
  };

  return (
    <>
      {currentFlight === undefined ? (
        <div className="text-white">
          <p>Flight not found</p>
          <p>Please check your flight number</p>
        </div>
      ) : (
        <div className="flight-ticket">
          <div className="flex flex-col text-left shadow">
            <div
              className={"flight-status " + functions.checkFlightStatus(status)}
            >
              <h2>{`${status}`}</h2>
              <span
                className={
                  status.includes("Delayed") ? "text-black" : undefined
                }
                title="this is an internal reference number and may differ from your input"
              >
                {flightNumber === currentFlight.ident
                  ? currentFlight.ident.toUpperCase()
                  : currentFlight.ident_iata.toUpperCase()}
              </span>
            </div>
          </div>
          <div id="progress" className="flex text-white">
            <h2>{origin.code_iata}</h2>
            <div id="progress-bar">
              <span
                style={{
                  visibility: "visible",
                  width: `${Number(progress_percent)}%`,
                }}
              >
                progress
              </span>
            </div>
            <h2>{destination.code_iata}</h2>
          </div>

          <div className="m-3 flex justify-between px-4 text-3xl text-white">
            <button onClick={getNextFlight}>{<FaArrowCircleLeft />}</button>
            {displayCurrentFlight == currentFlight ? null : (
              <button
                onClick={returnToCurrentFlight}
                className="rounded bg-white p-1 text-lg text-black shadow hover:bg-gray-300 active:bg-gray-500"
              >
                Return to current flight
              </button>
            )}
            <button onClick={getPreviousFlight}>
              {<FaArrowCircleRight />}
            </button>
          </div>
          <button
            onClick={showLocalTimezone}
            className={
              "sticky top-0.5  m-auto mt-4 w-3/4 rounded bg-gray-400 p-3"
            }
          >
            {isLocalTime ? "Local Time" : "Timezone"}
          </button>
          <div>
            <div className="card">
              <h2 className="iata-code">{origin.code_iata}</h2>
              <span className="airport-name">{origin.name}</span>
              <h3>Departure Times</h3>
              <span>{getDate(scheduled_off)}</span>
              <div className="flight-times">
                <div>
                  <h3>Scheduled</h3>
                  <span>{toggleTimezones(scheduled_off, origin)}</span>
                </div>
                <div>
                  {actual_off !== null ? (
                    <div>
                      <h3>Actual</h3>
                      <span>{toggleTimezones(actual_off, origin)}</span>
                    </div>
                  ) : (
                    <div>
                      <h3>Estimated</h3>
                      <span>{toggleTimezones(estimated_off, origin)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terminal-info">
                <div className="terminal">
                  <h3>Terminal</h3>
                  <span>{checkNullValue(terminal_origin)}</span>
                </div>
                <div className="gate">
                  <h3>Gate</h3>
                  <span>{checkNullValue(gate_origin)}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="iata-code">{destination.code_iata}</h2>
              <span className="airport-name">{destination.name}</span>
              <h3>Arrival Times</h3>
              <span>{getDate(scheduled_on)}</span>
              <div className="flight-times">
                <div>
                  <h3>Scheduled</h3>
                  <span>{toggleTimezones(scheduled_on, destination)}</span>
                </div>
                <div>
                  {actual_off !== null ? (
                    <div>
                      <h3>Actual</h3>

                      <span>{toggleTimezones(actual_on, destination)}</span>
                    </div>
                  ) : (
                    <div>
                      <h3>Estimated</h3>
                      <span>{toggleTimezones(estimated_on, destination)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terminal-info">
                <div className="terminal">
                  <h3>Terminal</h3>
                  <span>{checkNullValue(terminal_destination)}</span>
                </div>
                <div className="gate">
                  <h3>Gate</h3>
                  <span>{checkNullValue(gate_destination)}</span>
                </div>
                {baggage_claim !== null ? (
                  <div className="baggage-claim">
                    <h3>Baggage</h3>
                    <span>{baggage_claim}</span>
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
