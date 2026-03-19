import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppWrapper from "@/components/AppWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArcLearn - Master AutoCAD for Architecture",
  description:
    "The premium learning platform for architecture students to master AutoCAD with interactive lessons, real-world projects, and guided practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" defer />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="glass-bg-mesh" />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
