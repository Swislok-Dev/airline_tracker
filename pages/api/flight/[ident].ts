import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

const aeroapiURI = "https://aeroapi.flightaware.com/aeroapi/";

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const ident = req.query.ident.toUpperCase();

  axios
    .get(aeroapiURI + "flights/" + ident, {
      headers: {
        Accept: "application/json; charset=UTF-8",
        "x-apikey": process.env.aeroapiKey,
      },
    })
    .then((response) => {
      console.log(response.data["flights"]);
      res.status(200).send(response.data["flights"]);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

// module.exports = {
//   handler,
// };

export default handler;
