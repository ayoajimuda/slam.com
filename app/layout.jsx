import { Geist, Geist_Mono, JetBrains_Mono, Urbanist, Oswald, Barlow_Condensed, Anton } from "next/font/google";
import { Bronson } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";
import Menu from "@/components/Menu"

const anton = Anton({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-anton', 
  display: 'swap' 
});

const barlow = Barlow_Condensed({ 
  weight: ['400', '700'], 
  subsets: ['latin'], 
  variable: '--font-barlow', 
  display: 'swap' 
});

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

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-subtitle',
});

const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-urbanist',
});

export const metadata = {
  title: "SLAM.COM",
  description: "A way for skaters to learn, connect and explore",
  appleWebApp: {
    capable: true,
    title: "SLAM.COM",
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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable, urbanist.variable, Bronson.variable, oswald.variable, anton.variable, barlow.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Menu></Menu>
        {children}
      </body>
    </html>
  );
}