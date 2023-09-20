import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import { PrismaClient } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const Reservation = async ({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: {
    date: string;
    partySize: string;
  };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  const { main_image, name } = restaurant;
  const { date, partySize } = searchParams;

  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          image={main_image}
          name={name}
          date={date}
          partySize={partySize}
        />
        <Form />
      </div>
    </div>
  );
};

export default Reservation;
