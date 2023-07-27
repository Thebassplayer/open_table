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
    <>
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
    </>
  );
};

export default RestaurantDetails;
