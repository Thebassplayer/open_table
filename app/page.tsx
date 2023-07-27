"use client";

import React from "react";
// Components
import Header from "@/app/components/Header";
import NavBar from "@/app/components/NavBar";
import RestaurantCard from "@/app/components/RestaurantCard";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <main>
          <Header />
          <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            <RestaurantCard />
          </div>
        </main>
      </main>
    </main>
  );
}
