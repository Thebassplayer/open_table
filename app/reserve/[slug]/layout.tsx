import React from "react";
import Header from "./components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve at Milestones Grill | CafecitosDeBarrio.com",
  description: "Encuantra tu proximo cafe",
};

const RestaurantLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <>{children}</>;
};

export default RestaurantLayout;
