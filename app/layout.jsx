import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Urbanist } from 'next/font/google';
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-urbanist',
});

export const metadata = {
  title: "Slam.com",
  description: "A way for skaters to learn, connect and explore",
  appleWebApp: {
    capable: true,
    title: "Slam",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable, urbanist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}