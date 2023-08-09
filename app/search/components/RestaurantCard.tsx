import React from "react";
import Link from "next/link";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Price from "@/app/components/Price";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingsAverage";
import Stars from "@/app/components/Stars";
import ReviewText from "./ReviewText";

interface RestaurantCardProps {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  reviews: Review[];
}

const RestaurantCard = ({
  restaurant,
}: {
  restaurant: RestaurantCardProps;
}): JSX.Element => {
  const { name, main_image, cuisine, location, price, slug, reviews } =
    restaurant;

  return (
    <div className="border-b flex pb-5">
      <img src={main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <Stars reviews={reviews} />
          <ReviewText reviews={reviews} />
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4">{cuisine.name}</p>
            <p className="mr-4">{location.name}</p>
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
