{
}
import React from "react";
//Next
import { useSearchParams } from "next/navigation";
// Components
import NavBar from "@/app/components/NavBar";
import Headers from "@/app/search/components/Headers";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/components/RestaurantCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRestaurantsAtCity = (location: string | undefined) => {
  if (!location) {
    return prisma.restaurant.findMany({});
  }
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: location,
        },
      },
    },
  });
};

const Search = async ({
  searchParams,
}: {
  searchParams: { location: string };
}) => {
  if (!searchParams) return null;
  const { location } = searchParams;

  const restaurants = await getRestaurantsAtCity(location);

  return (
    <>
      <Headers />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {/* {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} />
            ))} */}
        </div>
      </div>
    </>
  );
};

export default Search;
