import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | OpenTable",
  description: "Find your next restaurant",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
