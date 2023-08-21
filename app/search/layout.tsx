import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | CafecitosDeBarrio.com",
  description: "Encuantra tu proximo cafe",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
