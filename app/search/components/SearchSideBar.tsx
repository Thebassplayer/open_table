import { Cuissine, Location } from "@prisma/client";
import React from "react";

interface SearchSideBarProps {
  locations: Location[];
  cuissines: Cuissine[];
}

const SearchSideBar = ({ locations, cuissines }: SearchSideBarProps) => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map(location => {
          const { name, id } = location;
          return (
            <p key={id} className="font-light text-reg capitalize">
              {name}
            </p>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuissines.map(cuissine => {
          const { name, id } = cuissine;
          return (
            <p key={id} className="font-light text-reg capitalize">
              {name}
            </p>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
