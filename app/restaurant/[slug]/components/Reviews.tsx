import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";
interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps): JSX.Element => {
  const numberOfReviews = reviews.length;
  return !numberOfReviews ? (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        No reviews yet!
      </h1>
    </div>
  ) : (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {numberOfReviews}{" "}
        {numberOfReviews === 1 ? "person is" : "people are"} saying
      </h1>
      {reviews.map(review => {
        return <ReviewCard review={review} />;
      })}
    </div>
  );
};

export default Reviews;
