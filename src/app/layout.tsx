import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppNavbar from "@/components/AppNavbar";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Web",
  description: "yet, another social network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <AppNavbar />
          <div className="max-w-7xl mx-auto">{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
