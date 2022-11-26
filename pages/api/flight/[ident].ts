import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

const aeroapiURI = "https://aeroapi.flightaware.com/aeroapi/";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ident } = req.query;

  await axios
    .get(aeroapiURI + "flights/" + ident, {
      headers: {
        Accept: "application/json; charset=UTF-8",
        "x-apikey": process.env.aeroapiKey,
      },
    })
    .then((response) => {
      res.status(200).json(response.data["flights"]);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export default handler;
