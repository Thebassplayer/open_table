import React from "react";
// Components
import NavBar from "@/app/components/NavBar";
import RestaurantNav from "@/app/restaurant/[slug]/components/RestaurantNav";
import Header from "@/app/restaurant/[slug]/components/Header";
import Title from "@/app/restaurant/[slug]/components/Title";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import Rating from "./components/Rating";
import Reservation from "./components/Reservation";

const RestaurantDetails = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <Header />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNav />
            <Title />
            <Rating />
            <Description />
            <Images />
            <Reviews />
          </div>
          <div className="w-[27%] relative text-reg">
            <Reservation />
          </div>
        </div>
      </main>
    </main>
  );
};

export default RestaurantDetails;
