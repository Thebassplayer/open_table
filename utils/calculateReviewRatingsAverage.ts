import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (
  reviews: Review[]
): RestaurantRating => {
  if (!reviews.length) return 0;

  const totalRating = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  const averageRating = totalRating / reviews.length;

  // Round the averageRating to the nearest 0.5
  return (Math.round(averageRating * 2) / 2) as RestaurantRating;
};
