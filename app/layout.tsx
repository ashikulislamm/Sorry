import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Error 404: Her Smile Not Found | Developer Apology",
  description:
    "A creative, interactive developer-themed apology app with music, memories, and heartfelt confession. Built with love and code.",
  keywords:
    "apology, interactive, romance, developer, funny, creative, confession, sorry",
  authors: [{ name: "Apology App" }],
  creator: "Apology App",
  publisher: "Apology App",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0a0a0f",
  alternates: {
    canonical: "https://yourdomain.com", // Update with your actual domain
  },
  icons: {
    icon: "/sorry.png",
    shortcut: "/sorry.png",
    apple: "/sorry.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com", // Update with your actual domain
    siteName: "Error 404: Her Smile Not Found",
    title: "Error 404: Her Smile Not Found | An Interactive Apology",
    description:
      "A heartfelt, creative developer-themed apology with animations, music, memories, and proof that some bugs only need love to fix.",
    images: [
      {
        url: "/sorry.png",
        width: 1200,
        height: 1200,
        alt: "Error 404 Apology App Cover",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Error 404: Her Smile Not Found",
    description:
      "A developer-themed interactive apology app with animations and heartfelt moments.",
    creator: "@ApologyApp",
    images: ["/sorry.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
