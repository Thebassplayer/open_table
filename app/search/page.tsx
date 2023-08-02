{
}
import React from "react";
// Components
import Headers from "@/app/search/components/Headers";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/components/RestaurantCard";
import { prisma } from "@/app/lib/prisma";
import { PRICE } from "@prisma/client";

interface searchParams {
  location: string | undefined;
  cuissine: string | undefined;
  price: PRICE | undefined;
}

const getFilteredRestaurants = (searchParams: searchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    slug: true,
    cuissine: true,
    location: true,
  };
  const where: {
    location?: {
      name: {
        equals: string | undefined;
      };
    };
    cuissine?: {
      name: {
        equals: string | undefined;
      };
    };
    price?: {
      equals: PRICE | undefined;
    };
  } = {};

  if (searchParams.location) {
    const location = {
      name: {
        equals: searchParams.location,
      },
    };
    where.location = location;
  }
  if (searchParams.cuissine) {
    const cuissine = {
      name: {
        equals: searchParams.cuissine,
      },
    };
    where.cuissine = cuissine;
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    };
  }

  return prisma.restaurant.findMany({
    where,
    select,
  });
};

const getLocations = async () => {
  return prisma.location.findMany();
};
const getCuissines = async () => {
  return prisma.cuissine.findMany();
};

const Search = async ({ searchParams }: { searchParams: searchParams }) => {
  if (!searchParams) return null;

  const restaurants = await getFilteredRestaurants(searchParams);

  const locations = await getLocations();

  const cuissines = await getCuissines();

  return (
    <>
      <Headers />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuissines={cuissines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {!restaurants.length ? (
            <div className="text-2xl font-bold mt-4 mb-2">
              Sorry, there is no restaurant registered in{" "}
              {searchParams.location}
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
