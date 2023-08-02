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
          <Link
            className="border w-full text-reg font-light rounded-l p-2"
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
          >
            $
          </Link>
          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2"
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
          >
            $$
          </Link>
          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.EXPENSIVE },
            }}
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
