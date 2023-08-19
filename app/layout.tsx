// Components
import NavBar from "./components/NavBar";
// Context
import AuthContext from "./context/AuthContext";
// Styles
import "./globals.css";
// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cafecitos",
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
          <AuthContext>
            <main className="max-w-screen-2xl m-auto bg-white pb-20">
              <NavBar />
              {children}
              AuthContext
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
