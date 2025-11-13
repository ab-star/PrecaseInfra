import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";
import { AuthProvider } from "../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3G Infratech",
  description:
    "Official website of 3G Infratech — leaders in construction, engineering, and infrastructure innovation.",
  keywords: [
    "3G Infratech",
    "Construction",
    "Infrastructure",
    "Engineering",
    "Civil Works",
  ],
  metadataBase: new URL("https://3ginfratech.in"),
  openGraph: {
    title: "3G Infratech",
    description:
      "Engineering and infrastructure excellence by 3G Infratech. Building the future with innovation.",
    url: "https://3ginfratech.in",
    siteName: "3G Infratech",
    images: [
      {
        url: "/brandIcon.jpeg", // place your image in /public
        width: 1200,
        height: 630,
        alt: "3G Infratech — Infrastructure and Engineering",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3G Infratech",
    description:
      "Engineering and infrastructure excellence by 3G Infratech.",
    images: ["/brandIcon.jpeg"],
  },
  icons: {
    icon: "/brandIcon.jpeg", // ensure your favicon or brand icon is here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://3ginfratech.in" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <MainHeader />
          <div className="pt-28">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
