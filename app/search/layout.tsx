import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Cafecitos",
  description: "Find your next restaurant",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
