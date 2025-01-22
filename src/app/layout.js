import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dearyz",
  description: "Kumpulan kenangan bersama BIMA RYAN ALFARIZI dan DEA NANDA DWIJAYANTI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/f74deb4653.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-200`}
      >
        {children}
      </body>
    </html>
  );
}
