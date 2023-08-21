// Components
import NavBar from "./components/NavBar";
// Context
import AuthContext from "./context/AuthContext";
// Styles
import "./globals.css";
// Types
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CafecitosDeBarrio.com",
  description: "Cafes de Especialidad en tu Barrio",
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
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
