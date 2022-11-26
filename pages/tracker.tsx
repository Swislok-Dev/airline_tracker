import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import * as functions from "../components/flights/functions.js";
import FlightItem from "../components/flights/FlightItem";

function Tracker() {
  const [ident, setIdent] = useState("");
  const [flights, setFlights] = useState([]);
  const [nextFlight, setNextFlight] = useState({});

  const getFlightInfo = async (ident: string) => {
    const flightsArray = await axios.get(`/api/flight/${ident}`);
    setFlights(flightsArray);
    const nextFlight = functions.findNextFlight(flightsArray);
    setNextFlight(nextFlight);
    // console.log("Data from getFlightInfo", nextFlight);
    return nextFlight;
  };

  const onChange = (e: any) => {
    setIdent(e.target.value);
  };

  // const listFlights = (ident: string) => {
  //   const nextFlight = getFlightInfo(ident);
  //   console.log(nextFlight);
  //   return nextFlight;
  // };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    return getFlightInfo(ident);
  };

  return (
    <Layout title="Find A Flight">
      <section>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <label htmlFor="ident">Flight Number</label>
          <input
            type="text"
            name="ident"
            autoFocus
            className="mx-2 outline"
            required
            onChange={(e) => onChange(e)}
            value={ident}
            placeholder="UA4"
          />
          <button type="submit" value="Find Flight" className="">
            Find Flight
          </button>
        </form>
        <div>{flights.length <= 0 ? <h2>Find a Flight</h2> : null}</div>
        {flights.length <= 0 ? (
          "No flights currently searched"
        ) : (
          <FlightItem nextFlight={nextFlight} flightNumber={ident} />
        )}
      </section>
    </Layout>
  );
}

export default Tracker;
