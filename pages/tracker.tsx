import React, { useState } from "react";
import Layout from "../components/Layout";
import axios, { AxiosResponse } from "axios";
import * as functions from "../components/flights/functions.js";
import FlightItem from "../components/flights/FlightItem";

function Tracker() {
  const [ident, setIdent] = useState("");
  const [flights, setFlights] = useState<AxiosResponse | [] | null | void>();
  const [nextFlight, setNextFlight] = useState({});

  const getFlightInfo = async (ident: string) => {
    const flightsArray = await axios.get(`/api/flight/${ident.toUpperCase()}`);
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
        <form
          onSubmit={(e) => handleOnSubmit(e)}
          className=" m-auto mb-4 grid max-w-sm grid-cols-1 gap-2 px-2 sm:max-w-sm md:max-w-md"
        >
          <label htmlFor="ident">Flight Number</label>
          <input
            type="text"
            name="ident"
            autoFocus
            className="w-auto rounded border-2 border-red-500 text-center uppercase"
            required
            onChange={(e) => onChange(e)}
            value={ident}
            placeholder="UA4"
          />
          <button
            type="submit"
            value="Find Flight"
            className="rounded bg-red-500 text-white active:bg-red-400 "
          >
            Search
          </button>
        </form>
        <div>{flights == null ? <h2>Find a Flight</h2> : null}</div>
        {flights == null ? null : (
          <FlightItem nextFlight={nextFlight} flightNumber={ident} />
        )}
      </section>
    </Layout>
  );
}

export default Tracker;
