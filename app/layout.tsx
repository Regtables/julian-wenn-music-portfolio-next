import type { Metadata } from "next";
import {
  Inconsolata,
  Libre_Baskerville,
  Roboto,
  Ubuntu,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inconsolata = Inconsolata({
  variable: "--font-body",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

// Miller font family
const miller = localFont({
  src: [
    {
      path: "../public/fonts/miller-normal.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/miller-semi-bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julian Wenn Music Portfolio",
  description: "Music portfolio and creative works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} ${libreBaskerville.variable} ${miller.variable} ${roboto.variable} ${ubuntu.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
