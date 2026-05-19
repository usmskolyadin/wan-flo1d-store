import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "wan flo1d's store",
  description: "Premium portfolio experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}