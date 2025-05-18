import { Metadata } from "next";
import { ComingSoonPage } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "About | Nischal Gupta",
  description:
    "Learn more about Nischal - Frontend Developer, everything UI, and tech explorer.",
  keywords: [
    "Nischal Gupta",
    "About Nischal",
    "Frontend Developer",
    "JavaScript",
    "Next.js",
    "UI obsession",
  ],
  openGraph: {
    title: "About | Nischal Gupta",
    description:
      "Discover the story and journey of Nischal Gupta in the world of web development.",
    url: "https://nischal.id.vn/about",
    siteName: "Nischal Gupta",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Nischal Gupta",
    description:
      "Learn more about Nischal Gupta - Frontend Developer and tech enthusiast.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return <ComingSoonPage pageName="About" />;
}
