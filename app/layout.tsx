import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wan Flo1d's Store 2026 | Sites | AI services",
  description: "Fullstack developer & AI Engineer with more 5 years exp., Artist Wan Flo1d. CEO & Founder of SeaMusic",
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