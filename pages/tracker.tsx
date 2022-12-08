import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import * as functions from "../components/flights/functions.js";
import FlightItem from "../components/flights/FlightItem";
import Spinner from "../components/flights/Spinner";

function Tracker() {
  const [ident, setIdent] = useState("");
  const [flights, setFlights] = useState<AxiosResponse | [] | null | void>();
  const [nextFlight, setNextFlight] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getFlightInfo = async (ident: string) => {
    setIsLoading(true);
    const flightsArray = await axios.get(`/api/flight/${ident.toUpperCase()}`);
    setIsLoading(false);
    setFlights(flightsArray);
    const nextFlight = functions.findNextFlight(flightsArray);
    setNextFlight(nextFlight);
    return nextFlight;
  };

  const onChange = (e: any) => {
    setIdent(e.target.value);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    return getFlightInfo(ident);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className=" m-auto mb-4 grid w-auto max-w-sm grid-cols-1 gap-2 px-4  "
      >
        <label className="text-white" htmlFor="ident">
          {flights == null ? "Please Enter a Flight Number" : null}
        </label>
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

      {flights == null ? null : (
        <FlightItem nextFlight={nextFlight} flightNumber={ident} />
      )}
    </section>
  );
}

export default Tracker;
