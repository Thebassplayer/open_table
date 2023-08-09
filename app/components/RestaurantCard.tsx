import React from "react";
// Next
import Link from "next/link";
// Components
import Price from "./Price";
// Types
import { RestaurantCardType } from "../page";
import Stars from "./Stars";

interface RestaurantCardProps {
  restaurant: RestaurantCardType;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps): JSX.Element => {
  const { name, main_image, cuisine, location, price, slug, reviews } =
    restaurant;

  let reviewText: string = "";

  switch (reviews.length) {
    case 0:
      reviewText = "No reviews";
      break;
    case 1:
      reviewText = "1 review";
      break;
    default:
      reviewText = `${reviews.length} reviews`;
  }
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <img src={main_image} alt="" className="w-full h-36" />
      <div className="p-1">
        <h3 className="font-bold text-2xl mb-2">{name}</h3>
        <div className="flex items-start">
          <Stars reviews={reviews} />
          <p className="ml-2 text-sm">{reviewText}</p>
        </div>
        <div className="flex text-reg font-light capitalize">
          <p className="mr-4 capitalize">{cuisine.name}</p>
          <Price price={price} />
          <p className="mr-4 capitalize">{location.name}</p>
        </div>
        <Link href={`/restaurant/${slug}`}>
          {" "}
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
