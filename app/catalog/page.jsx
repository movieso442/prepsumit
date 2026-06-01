import CatalogClientPage from './CatalogClientPage';

export const metadata = {
  title: "Course Catalog | PrepSumit",
  description: "Browse PrepSumit's comprehensive course catalog including exam prep, test preparation, study guides, and lessons.",
  alternates: {
    canonical: "https://prepsumit.com/catalog",
  },
  openGraph: {
    title: "Course Catalog | PrepSumit",
    description: "Browse PrepSumit's comprehensive course catalog including exam prep, test preparation, study guides, and lessons.",
    url: "https://prepsumit.com/catalog",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Course Catalog | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Course Catalog | PrepSumit",
    description: "Browse PrepSumit's comprehensive course catalog including exam prep, test preparation, study guides, and lessons.",
    images: ["https://prepsumit.com/og-image.png"],
  }
};

export default function CatalogPage() {
  return <CatalogClientPage />;
}
