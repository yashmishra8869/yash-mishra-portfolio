import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yash Mishra — Creative Technologist",
  description: "The portfolio of Yash Mishra, a versatile developer exploring technology, creativity, and innovation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yash Mishra — Creative Technologist",
    description: "Turning curiosity into code and ideas into meaningful digital experiences.",
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
