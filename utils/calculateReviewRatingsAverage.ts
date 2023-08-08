import { Review } from "@prisma/client";

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export const calculateReviewRatingAverage = (reviews: Review[]): Rating => {
  if (!reviews.length) return 0;

  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  const averageRating = Math.floor(totalRating / reviews.length);

  // Ensure the result is within the range of 0 to 5
  return Math.min(Math.max(averageRating, 0), 5) as Rating;
};
