import React, { useState } from "react";
import { getDate, getTime } from "../../components/flights/functions.js";
import * as functions from "../flights/functions";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

function FlightItem({ currentFlight, flightNumber, flights }: any) {
  const [displayCurrentFlight, setDisplayCurrentFlight] =
    useState(currentFlight);

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

  const getOriginAirportName = () => {
    return displayCurrentFlight.origin.name;
  };
  const getDestinationAirportName = () => {
    return displayCurrentFlight.destination.name;
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
      {currentFlight === undefined ? (
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
                functions.checkFlightStatus(displayCurrentFlight.status)
              }
            >
              <h3>{`${displayCurrentFlight.status}`}</h3>
              <span></span>
            </div>
            <div className="flex justify-between bg-blue-400 p-4">
              <h2 title="this is an internal reference number and may differ from your input">
                {flightNumber === currentFlight.ident
                  ? currentFlight.ident.toUpperCase()
                  : currentFlight.ident_iata.toUpperCase()}
              </h2>
            </div>
          </div>
          <div id="progress" className="flex text-white">
            <h2>{displayCurrentFlight.origin.code_iata}</h2>
            <div id="progress-bar">
              <span
                style={{
                  visibility: "visible",
                  width: `${Number(displayCurrentFlight.progress_percent)}%`,
                }}
              >
                progress
              </span>
            </div>
            <h2>{displayCurrentFlight.destination.code_iata}</h2>
          </div>

          <div className="m-3 flex justify-between px-4 text-3xl text-white">
            <button onClick={getNextFlight}>{<FaArrowCircleLeft />}</button>
            {displayCurrentFlight == currentFlight ? (
              <p>Current Flight</p>
            ) : (
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

          <div>
            <div className="card">
              <h2 className="iata-code">
                {displayCurrentFlight.origin.code_iata}
              </h2>
              <span className="airport-name">{getOriginAirportName()}</span>
              <h3>Departure Times</h3>
              <span>{getDate(displayCurrentFlight.scheduled_off)}</span>
              <div className="flight-times">
                <div>
                  <h3>Scheduled</h3>
                  <span>{getTime(displayCurrentFlight.scheduled_off)}</span>
                </div>
                <div>
                  {displayCurrentFlight.status.includes("En Route") ? (
                    <div>
                      <h3>Actual</h3>

                      <span>{getTime(displayCurrentFlight.actual_off)}</span>
                    </div>
                  ) : (
                    <div>
                      <h3>Estimated</h3>
                      <span>{getTime(displayCurrentFlight.estimated_off)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terminal-info">
                <div className="terminal">
                  <h3>Terminal</h3>
                  <span>
                    {checkNullValue(displayCurrentFlight.terminal_origin)}
                  </span>
                </div>
                <div className="gate">
                  <h3>Gate</h3>
                  <span>
                    {checkNullValue(displayCurrentFlight.gate_origin)}
                  </span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="iata-code">
                {displayCurrentFlight.destination.code_iata}
              </h2>
              <span className="airport-name">
                {getDestinationAirportName()}
              </span>
              <h3>Arrival Times</h3>
              <span>{getDate(displayCurrentFlight.scheduled_on)}</span>
              <div className="flight-times">
                <div>
                  <h3>Scheduled</h3>
                  <span>{getTime(displayCurrentFlight.scheduled_on)}</span>
                </div>
                <div>
                  {displayCurrentFlight.status.includes("Arrived") ? (
                    <div>
                      <h3>Actual</h3>

                      <span>{getTime(displayCurrentFlight.actual_on)}</span>
                    </div>
                  ) : (
                    <div>
                      <h3>Estimated</h3>
                      <span>{getTime(displayCurrentFlight.estimated_on)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="terminal-info">
                <div className="terminal">
                  <h3>Terminal</h3>
                  <span>
                    {checkNullValue(displayCurrentFlight.terminal_destination)}
                  </span>
                </div>
                <div className="gate">
                  <h3>Gate</h3>
                  <span>
                    {checkNullValue(displayCurrentFlight.gate_destination)}
                  </span>
                </div>
                {displayCurrentFlight.baggage_claim !== null ? (
                  <div className="baggage-claim">
                    <h3>Baggage</h3>
                    <span>{displayCurrentFlight.baggage_claim}</span>
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
