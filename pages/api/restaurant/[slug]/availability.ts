import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data/times";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };
  if (!slug || !day || !time || !partySize) {
    return res.status(400).json({ message: "Missing query parameters" });
  }

  const searchTimes = times.find(t => t.time === time)?.searchTimes;
  if (!searchTimes) {
    return res.status(400).json({ message: "Invalid time" });
  }

  // Send the response
  res.status(200).json({ searchTimes });

  console.log(times);
}

//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2021-10-01&time=20:00:00.000Z&partySize=2/
