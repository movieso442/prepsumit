import TeasClientPage from './TeasClientPage';

export const metadata = {
  title: "TEAS Test Prep & Practice Exams | PrepSumit",
  description: "Prepare for the Test of Essential Academic Skills (TEAS) nursing exam with PrepSumit study guides, practice tests, and guided lesson support.",
  alternates: {
    canonical: "https://prepsumit.com/teas",
  },
  openGraph: {
    title: "TEAS Test Prep & Practice Exams | PrepSumit",
    description: "Prepare for the Test of Essential Academic Skills (TEAS) nursing exam with PrepSumit study guides, practice tests, and guided lesson support.",
    url: "https://prepsumit.com/teas",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TEAS Test Prep & Practice Exams | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TEAS Test Prep & Practice Exams | PrepSumit",
    description: "Prepare for the Test of Essential Academic Skills (TEAS) nursing exam with PrepSumit study guides, practice tests, and guided lesson support.",
    images: ["https://prepsumit.com/og-image.png"],
  }
};

export default function TeasPage() {
  return <TeasClientPage />;
}
