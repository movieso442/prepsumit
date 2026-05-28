import HomeClientPage from './HomeClientPage';

export const metadata = {
  title: "PrepSumit | Online Exam Prep for FTCE, Praxis & Practice Tests",
  description: "PrepSumit helps learners prepare for exams with online study resources, FTCE prep, Praxis prep, practice tests, plans, and guided learning support.",
  alternates: {
    canonical: "https://prepsumit.com",
  },
  openGraph: {
    title: "PrepSumit | Online Exam Prep for FTCE, Praxis & Practice Tests",
    description: "PrepSumit helps learners prepare for exams with online study resources, FTCE prep, Praxis prep, practice tests, plans, and guided learning support.",
    url: "https://prepsumit.com",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "PrepSumit - Online Exam Prep for FTCE, Praxis & Practice Tests"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepSumit | Online Exam Prep for FTCE, Praxis & Practice Tests",
    description: "PrepSumit helps learners prepare for exams with online study resources, FTCE prep, Praxis prep, practice tests, plans, and guided learning support.",
    images: ["https://prepsumit.com/images/og-image.webp"],
  }
};

export default function HomePage() {
  return <HomeClientPage />;
}
