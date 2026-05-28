import PricingClientPage from './PricingClientPage';

export const metadata = {
  title: "Plans & Pricing | PrepSumit",
  description: "View PrepSumit plans and pricing for online exam preparation, FTCE prep, Praxis prep, practice tests, and guided study support.",
  alternates: {
    canonical: "https://prepsumit.com/pricing",
  },
  openGraph: {
    title: "Plans & Pricing | PrepSumit",
    description: "View PrepSumit plans and pricing for online exam preparation, FTCE prep, Praxis prep, practice tests, and guided study support.",
    url: "https://prepsumit.com/pricing",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Plans & Pricing | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Plans & Pricing | PrepSumit",
    description: "View PrepSumit plans and pricing for online exam preparation, FTCE prep, Praxis prep, practice tests, and guided study support.",
    images: ["https://prepsumit.com/images/og-image.webp"],
  }
};

export default function PricingPage() {
  return <PricingClientPage />;
}
