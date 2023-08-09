import { Review } from "@prisma/client";
import React from "react";
import UserAvatar from "./UserAvatar";

const ReviewCard = ({ review }: { review: Review }): JSX.Element => {
  const { id, rating, first_name, last_name, text: textReview } = review;
  const userInitials = `${first_name[0]} ${last_name[0]}`;
  const fullName = `${first_name} ${last_name}`;
  const stars = "*".repeat(Math.floor(rating));
  return (
    <div key={id}>
      <div className="border-b pb-7 mb-7">
        <div className="flex">
          <div className="w-1/6 flex flex-col items-center">
            <UserAvatar userInitials={userInitials} />
            <p className="text-center">{fullName}</p>
          </div>
          <div className="ml-10 w-5/6">
            <div className="flex items-center">
              <div className="flex mr-5">{stars}</div>
            </div>
            <div className="mt-5">
              <p className="text-lg font-light">{textReview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
