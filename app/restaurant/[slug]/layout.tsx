import React from "react";
import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Milestones Grill | Cafecitos",
  description: "Find your next restaurant",
};

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}): JSX.Element => {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
