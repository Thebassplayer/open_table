import NavBar from "./components/NavBar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenTable",
  description: "Find your next restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-100 min-h-screen w-screen">
          <main className="max-w-screen-2xl m-auto bg-white pb-20">
            <NavBar />
            {children}
          </main>
        </main>
      </body>
    </html>
  );
}
