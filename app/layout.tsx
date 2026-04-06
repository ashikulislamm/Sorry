import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I'm Really Sorry... Let Me Fix This 💔",
  description:
    "I messed up. I know I hurt you and I hate that. This is my way of saying sorry—with our memories, music, and everything I should've said better the first time.",
  keywords:
    "apology, I'm sorry, love, sorry, heartfelt, fix things, memories together",
  authors: [{ name: "Someone Who Really Cares" }],
  creator: "Made with regret and love",
  publisher: "From my heart to yours",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0a0a0f",
  alternates: {
    canonical: "https://ashikulislamm.github.io/Sorry/", // Update with your actual domain
  },
  icons: {
    icon: "/sorry.png",
    shortcut: "/sorry.png",
    apple: "/sorry.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashikulislamm.github.io/Sorry/", // Update with your actual domain
    siteName: "I'm Really Sorry 💔",
    title: "I'm Really Sorry... Let Me Fix This",
    description:
      "I know what I did was wrong. I'm sorry for hurting you. You mean everything to me, and I want to make this right. Please read this.",
    images: [
      {
        url: "/sorry.png",
        width: 1200,
        height: 1200,
        alt: "A real apology from someone who cares",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I'm Really Sorry 💔",
    description:
      "I made a big mistake and I'm truly sorry. You matter so much to me. Will you forgive me?",
    creator: "@ReallyRegretful",
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
