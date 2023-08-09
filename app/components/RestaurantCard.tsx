import React from "react";
// Next
import Link from "next/link";
// Components
import Price from "./Price";
// Types
import { RestaurantCardType } from "../page";
import Stars from "./Stars";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingsAverage";

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

  const numberOfStars = calculateReviewRatingAverage(reviews);
  return (
    <div className="border-b flex pb-5 ml-4">
      <img
        src={main_image}
        alt="Restaurant Image"
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-baseline">
          <Stars numberOfStars={numberOfStars} />
          <p className="ml-2 text-sm">{reviewText}</p>
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
