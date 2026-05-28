import PraxisClientPage from './PraxisClientPage';

export const metadata = {
  title: "Praxis Prep & Practice Tests | PrepSumit",
  description: "Prepare for Praxis exams with PrepSumit online study resources, practice tests, guided preparation, and flexible exam prep plans.",
  alternates: {
    canonical: "https://prepsumit.com/praxis",
  },
  openGraph: {
    title: "Praxis Prep & Practice Tests | PrepSumit",
    description: "Prepare for Praxis exams with PrepSumit online study resources, practice tests, guided preparation, and flexible exam prep plans.",
    url: "https://prepsumit.com/praxis",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Praxis Prep & Practice Tests | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxis Prep & Practice Tests | PrepSumit",
    description: "Prepare for Praxis exams with PrepSumit online study resources, practice tests, guided preparation, and flexible exam prep plans.",
    images: ["https://prepsumit.com/images/og-image.png"],
  }
};

export default function PraxisPage() {
  return <PraxisClientPage />;
}
