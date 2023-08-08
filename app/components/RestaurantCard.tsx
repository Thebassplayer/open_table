import React from "react";
// Next
import Link from "next/link";
// Components
import Price from "./Price";
// Types
import { RestaurantCardType } from "../page";

interface RestaurantCardProps {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const { name, main_image, cuisine, location, price, slug } = restaurant;
  return (
    <div className="border-b flex pb-5 ml-4">
      <img
        src={main_image}
        alt="Restaurant Image"
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2 text-sm">77 reviews</p>
        </div>
        <div className="mb-9">
          <div className="flex text-reg font-light">
            <Price price={price} />
            <p className="mr-4 capitalize">{cuisine.name}</p>
            <p className="mr-4 capitalize">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
