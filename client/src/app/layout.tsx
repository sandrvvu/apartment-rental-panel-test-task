import type { Metadata } from "next";
import { Bitter, Raleway } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const bitter = Bitter({
  display: "swap",
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Rental Panel",
  description: "Rental Panel Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${bitter.variable} --font-raleway`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

