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
  const { name, main_image, cuissine, location, price, slug } = restaurant;
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/milestone-grill${slug}`}>
        <img src={main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">*****</div>
            <p className="ml-2">77 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{cuissine.name}</p>
            <Price price={price} />
            <p>{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
