import React from "react";
import Link from "next/link";
import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Price from "@/app/components/Price";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingsAverage";

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
}) => {
  const { name, main_image, cuisine, location, price, slug, reviews } =
    restaurant;

  const generateReviewTextAnsStars = () => {
    const rating = calculateReviewRatingAverage(reviews);
    let text = "";
    let stars = "";

    switch (rating) {
      case 1:
        text = "Poor";
        stars = "*";
        break;
      case 2:
        text = "Fair";
        stars = "**";
        break;
      case 3:
        text = "Good";
        stars = "***";
        break;
      case 4:
        text = "Great";
        stars = "****";
        break;
      case 5:
        text = "Awesome";
        stars = "*****";
        break;
      default:
        break;
    }
    return { text, stars };
  };

  const { text, stars } = generateReviewTextAnsStars();

  return (
    <div className="border-b flex pb-5">
      <img src={main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">{stars}</div>
          <p className="ml-2 text-sm">{text}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={price} />
            <p className="mr-4">{cuisine.name}</p>
            <p className="mr-4">{location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href="/restaurant/milestones">View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
