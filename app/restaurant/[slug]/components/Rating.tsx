import Stars from "@/app/components/Stars";
import { Review } from "@prisma/client";
import React from "react";

const Rating = ({ reviews }: { reviews: Review[] }): JSX.Element => {
  const numberOfReviews: number = reviews.length;
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">4.9</p>
      </div>
      <div>
        <p className="text-reg ml-4">{numberOfReviews} Reviews</p>
      </div>
    </div>
  );
};

export default Rating;
