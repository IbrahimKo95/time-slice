import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
    weight: "400",
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TimeSlice - Pomodoro Timer App",
  description: "A pomodoro app that helps you stay focused and productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={notoSans.className + " w-screen h-screen"}>
        {children}
      </body>
    </html>
  );
}
