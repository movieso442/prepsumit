import CoursesClientPage from './CoursesClientPage';

export const metadata = {
  title: "All Courses & Study Guides | PrepSumit",
  description: "Browse PrepSumit's comprehensive lists of exam preparation guides, test preps, study materials, and certification courses.",
  alternates: {
    canonical: "https://prepsumit.com/courses",
  },
  openGraph: {
    title: "All Courses & Study Guides | PrepSumit",
    description: "Browse PrepSumit's comprehensive lists of exam preparation guides, test preps, study materials, and certification courses.",
    url: "https://prepsumit.com/courses",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Courses Catalog | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "All Courses & Study Guides | PrepSumit",
    description: "Browse PrepSumit's comprehensive lists of exam preparation guides, test preps, study materials, and certification courses.",
    images: ["https://prepsumit.com/og-image.png"],
  }
};

export default function CoursesPage() {
  return <CoursesClientPage />;
}
