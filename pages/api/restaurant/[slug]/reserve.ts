import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const {
      bookerEmail,
      bookerPhone,
      bookerFirstName,
      bookerLastName,
      bookerOccasion,
      bookerRequest,
    } = req.body;

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables_id: true,
        open_time: true,
        close_time: true,
        id: true,
      },
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res
        .status(400)
        .json({ message: "Restaurant is not open at selected time" });
    }

    const searchTimesWithTables = await findAvailableTables({
      day,
      time,
      res,
      restaurant,
    });

    if (!searchTimesWithTables) {
      return res.status(404).json({ message: "Invalid data provided" });
    }
    console.log("time: ", time);

    const searchTimeWithTables = searchTimesWithTables.find(t => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });

    if (!searchTimeWithTables) {
      return res.status(404).json({ message: "No availability, cannot book" });
    }

    const tableCount: {
      2: number[];
      4: number[];
    } = {
      2: [],
      4: [],
    };

    searchTimeWithTables.tables.forEach(table => {
      if (table.seats === 2) {
        tableCount[2].push(table.id);
      } else {
        tableCount[4].push(table.id);
      }
    });

    const tablesToBook: number[] = [];

    let seatsRemaining = parseInt(partySize);

    while (seatsRemaining > 0) {
      if (seatsRemaining >= 3) {
        if (tableCount[4].length) {
          tablesToBook.push(tableCount[4][0]);
          tableCount[4].shift();
          seatsRemaining -= 4;
        } else {
          tablesToBook.push(tableCount[2][0]);
          tableCount[2].shift();
          seatsRemaining -= 2;
        }
      } else {
        if (tableCount[2].length) {
          tablesToBook.push(tableCount[2][0]);
          tableCount[2].shift();
          seatsRemaining -= 2;
        } else {
          tablesToBook.push(tableCount[4][0]);
          tableCount[4].shift();
          seatsRemaining -= 4;
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        number_of_people: parseInt(partySize),
        booking_time: new Date(`${day}T${time}`),
        booker_email: bookerEmail,
        booker_phone: bookerPhone,
        booker_first_name: bookerFirstName,
        booker_last_name: bookerLastName,
        booker_occasion: bookerOccasion,
        booker_request: bookerRequest,
        restaurant_id: restaurant.id,
      },
    });

    const bookingsOnTables = tablesToBook.map(table_id => {
      return {
        booking_id: booking.id,
        table_id,
      };
    });

    await prisma.bookingsOnTables.createMany({
      data: bookingsOnTables,
    });

    return res.json(booking);
  }
}

//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-09-14&time=14:00:00.000Z&partySize=2
