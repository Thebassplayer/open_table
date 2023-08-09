import React from "react";
import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve at Milestones Grill | OpenTable",
  description: "Find your next restaurant",
};

const RestaurantLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <>{children}</>;
};

export default RestaurantLayout;
