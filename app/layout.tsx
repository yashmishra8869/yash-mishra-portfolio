import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Mishra | Creative Technologist",
  description: "The portfolio of Yash Mishra, a Creative Technologist exploring AI, software, and meaningful digital experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yash Mishra | Creative Technologist",
    description: "Exploring AI, software, and meaningful digital experiences.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
