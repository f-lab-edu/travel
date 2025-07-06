import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/index.scss";
import Header from "@/components/commons/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TripPick",
  description: "TripPick",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="global-body">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
