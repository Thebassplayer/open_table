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
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    slug: true,
    cuissine: true,
    location: true,
  };
  if (!location) {
    return prisma.restaurant.findMany({ select });
  }
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: location,
        },
      },
    },
    select,
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
          {!restaurants.length ? (
            <div className="text-2xl font-bold mt-4 mb-2">
              Sorry, there is no restaurant registered in {location}
            </div>
          ) : (
            restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
