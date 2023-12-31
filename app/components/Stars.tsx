// Components
import emptyStar from "../../public/icons/empty-star.png";
import halfStar from "../../public/icons/half-star.png";
import fullStar from "../../public/icons/full-star.png";
// Next
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingsAverage";

const STAR_SIZE = 14; // Constant for star width and height

const Stars = ({ reviews }: { reviews: Review | Review[] }): JSX.Element => {
  let averageRating;

  if (Array.isArray(reviews)) {
    averageRating = calculateReviewRatingAverage(reviews);
  } else {
    averageRating = reviews.rating;
  }

  const numberOfStars = averageRating;

  const renderStars = () => {
    const numberOfFullStars = Math.floor(numberOfStars);
    const numberOfEmptyStars = Math.floor(5 - numberOfStars);
    const numberOfHalfStars = numberOfStars - numberOfFullStars ? 1 : 0;

    const stars = [];

    // Render full stars
    for (let i = 0; i < numberOfFullStars; i++) {
      stars.push(
        <Image
          key={`full-${i}`}
          src={fullStar}
          alt="full star"
          width={STAR_SIZE}
          height={STAR_SIZE}
        />
      );
    }

    // Render half star
    if (numberOfHalfStars > 0) {
      stars.push(
        <Image
          key="half"
          src={halfStar}
          alt="half star"
          width={STAR_SIZE}
          height={STAR_SIZE}
        />
      );
    }

    // Render empty stars
    for (let i = 0; i < numberOfEmptyStars; i++) {
      stars.push(
        <Image
          key={`empty-${i}`}
          src={emptyStar}
          alt="empty star"
          width={STAR_SIZE}
          height={STAR_SIZE}
        />
      );
    }

    return stars;
  };

  const renderedStars = renderStars();

  return <div className="flex">{renderedStars}</div>;
};

export default Stars;
