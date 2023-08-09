import React from "react";
import Link from "next/link";

const RestaurantNav = ({ slug }: { slug: string }): JSX.Element => {
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={`/restaurant/${slug}`} className="mr-7">
        Overview
      </Link>
      <Link href={`/restaurant/${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNav;
