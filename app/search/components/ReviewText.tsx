import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingsAverage";
import { Review } from "@prisma/client";

const ReviewText = ({ reviews }: { reviews: Review[] }): JSX.Element => {
  const generateReviewText = () => {
    const rating = calculateReviewRatingAverage(reviews);
    let text = "";

    switch (Math.floor(rating)) {
      case 1:
        text = "Poor";
        break;
      case 2:
        text = "Fair";
        break;
      case 3:
        text = "Good";
        break;
      case 4:
        text = "Great";
        break;
      case 5:
        text = "Awesome";
        break;
      default:
        break;
    }
    return { text };
  };

  const { text } = generateReviewText();

  return <p className="ml-2 text-sm">{text}</p>;
};

export default ReviewText;
