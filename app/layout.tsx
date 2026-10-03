import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from './LenisProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Happy Birthday Nami ❤️ | For My Favorite Person",
  description: "A special birthday celebration for Nami • 4 October",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505]`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
