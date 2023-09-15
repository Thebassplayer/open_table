import { NextApiRequest, NextApiResponse } from "next";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables_id: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const searchTimesWithTables = await findAvailableTables({
    day,
    time,
    res,
    restaurant,
  });

  if (!searchTimesWithTables) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const availabilities = searchTimesWithTables
    .map(searchTime => {
      const sumSeats = searchTime.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: searchTime.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter(availability => {
      const timeIsAfterOpeningHour =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);

      const timeIsBeforeClosingHour =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
    });

  // Send the response
  res.status(200).json(availabilities);
}

//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-09-14&time=14:00:00.000Z&partySize=2
