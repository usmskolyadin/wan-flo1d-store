import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-golos",
});

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
    <html lang="ru" className={golosText.variable}>
      <body>{children}</body>
    </html>
  );
}
