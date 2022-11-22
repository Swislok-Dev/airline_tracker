import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

function Tracker() {
  const [ident, setIdent] = useState("");

  const getFlightInfo = async (ident: string) => {
    const data = await axios.get(`/api/flight/${ident}`);
    return data;
  };

  const onChange = (e) => {
    setIdent(e.target.value);
  };

  return (
    <Layout title="Find A Flight">
      <section>
        <form onSubmit={() => getFlightInfo(ident)}>
          <label htmlFor="ident">Flight Number</label>
          <input
            type="text"
            name="ident"
            autoFocus
            className="mx-2 outline"
            value={ident}
            onChange={(e) => onChange(e)}
            placeholder="UA4"
          />
          <button type="submit" value="Find Flight" className="">
            Find Flight
          </button>
        </form>
      </section>
    </Layout>
  );
}

export default Tracker;
