import React from "react";
import NavBar from "@/app/components/NavBar";
import Headers from "@/app/search/components/Headers";
import SearchSideBar from "@/app/search/components/SearchSideBar";
import RestaurantCard from "@/app/components/RestaurantCard";

const Search = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Headers />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar />
          <div className="w-5/6">
            <RestaurantCard />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Search;
