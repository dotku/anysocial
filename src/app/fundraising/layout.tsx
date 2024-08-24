// app/layout.tsx
import { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Funraising - social",
  description: "This is fundraising page.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
