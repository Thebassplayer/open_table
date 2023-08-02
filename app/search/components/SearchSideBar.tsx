import { Cuissine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface SearchSideBarProps {
  locations: Location[];
  cuissines: Cuissine[];
  searchParams: { location?: string; cuissine?: string; price?: PRICE };
}

const SearchSideBar = ({
  locations,
  cuissines,
  searchParams,
}: SearchSideBarProps) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      value: "$",
      path: "/search",
      query: { ...searchParams, price: PRICE.CHEAP },
    },
    {
      price: PRICE.REGULAR,
      value: "$$",
      path: "/search",
      query: { ...searchParams, price: PRICE.REGULAR },
    },
    {
      price: PRICE.EXPENSIVE,
      value: "$$$",
      path: "/search",
      query: { ...searchParams, price: PRICE.EXPENSIVE },
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map(location => {
          const { name, id } = location;
          return (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, location: name },
              }}
            >
              <p key={id} className="font-light text-reg capitalize">
                {name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuissines.map(cuissine => {
          const { name, id } = cuissine;
          return (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuissine: name },
              }}
            >
              <p key={id} className="font-light text-reg capitalize">
                {name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ value, path, query }) => (
            <Link
              className="border w-full text-reg font-light p-2 text-center"
              href={{
                pathname: path,
                query,
              }}
            >
              {value}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
