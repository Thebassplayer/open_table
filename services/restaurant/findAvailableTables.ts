import { times } from "@/data";
import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";

const prisma = new PrismaClient();

export const findAvailableTables = async ({
  day,
  time,
  res,
  restaurant,
}: {
  day: string;
  time: string;
  res: NextApiResponse;
  restaurant: {
    open_time: string;
    close_time: string;
    tables_id: Table[];
  };
}) => {
  const searchTimes = times.find(t => t.time === time)?.searchTimes;
  if (!searchTimes) {
    return res.status(400).json({ message: "Invalid time" });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: {
    [key: string]: { [key: number]: true };
  } = {};

  bookings.forEach(booking => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const tables = restaurant.tables_id;

  const searchTimesWithTables = searchTimes.map(searchTime => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach(searchTime => {
    searchTime.tables = searchTime.tables.filter(table => {
      if (bookingTablesObj[searchTime.date.toISOString()]) {
        if (bookingTablesObj[searchTime.date.toISOString()][table.id]) {
          return false;
        }
      }
      return true;
    });
  });

  return searchTimesWithTables;
};
