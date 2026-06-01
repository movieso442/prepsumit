import '../src/index.css';
import AppProviders from './providers';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL("https://prepsumit.com"),
  title: {
    default: "PrepSumit | Online Exam Prep for FTCE, Praxis & Practice Tests",
    template: "%s | PrepSumit",
  },
  description: "PrepSumit helps learners prepare for exams with online study resources, FTCE prep, Praxis prep, practice tests, plans, and guided learning support.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "PrepSumit | Online Exam Prep for FTCE, Praxis & Practice Tests",
    description: "Prepare for FTCE, Praxis, and other exams with PrepSumit online study resources and practice tests.",
    url: "https://prepsumit.com",
    siteName: "PrepSumit",
    images: [
      {
        url: "https://prepsumit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PrepSumit online exam prep platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepSumit | Online Exam Prep for FTCE, Praxis & Practice Tests",
    description: "Prepare for FTCE, Praxis, and other exams with PrepSumit online study resources and practice tests.",
    images: ["https://prepsumit.com/og-image.png"],
  },
  alternates: {
    canonical: "https://prepsumit.com/",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        
        {/* Google Knowledge Graph Panel (Organization Schema) */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PrepSumit",
              "url": "https://prepsumit.com",
              "logo": "https://prepsumit.com/icon.png",
              "email": "support@prepsumit.com",
              "foundingDate": "2026",
              "description": "Online learning platform provides video lessons, practice questions, and custom study guides for exam preparation and mastering concepts. It offers college courses, K-12 educator resources, and professional development. AI tools personalize learning paths and assist with lesson planning.",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61589155532244",
                "https://facebook.com/groups/817080451384831/",
                "https://twitter.com/prepsumit",
                "https://www.youtube.com/@prepsumit"
              ]
            })
          }}
        />

        {/* Sitelinks Searchbox Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PrepSumit",
              "url": "https://prepsumit.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://prepsumit.com/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Site Navigation Elements Schema for Google Sitelinks */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@context": "https://schema.org",
                  "@type": "SiteNavigationElement",
                  "@id": "https://prepsumit.com/#navigation",
                  "name": [
                    "FTCE Exams Prep & Study Guides",
                    "TEAS Nursing Test Prep",
                    "Course Catalog",
                    "Plans & Pricing",
                    "Log in to your account",
                    "Careers at PrepSumit"
                  ],
                  "url": [
                    "https://prepsumit.com/ftce",
                    "https://prepsumit.com/teas",
                    "https://prepsumit.com/catalog",
                    "https://prepsumit.com/signup",
                    "https://prepsumit.com/login",
                    "https://prepsumit.com/careers"
                  ]
                }
              ]
            })
          }}
        />

        {/* Course List Directory Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Course",
                    "name": "FTCE Professional Education Test (PEd) Study Guide and Test Prep",
                    "description": "Prepare for the FTCE Professional Education Test with PrepSumit's comprehensive study guide featuring video lessons and practice tests.",
                    "provider": {
                      "@type": "Organization",
                      "name": "PrepSumit",
                      "sameAs": "https://prepsumit.com"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Course",
                    "name": "TEAS Test Prep | Test of Essential Academic Skills Exam",
                    "description": "Master the Math, Science, English, and Reading sections of the TEAS exam with PrepSumit's expert preparation materials.",
                    "provider": {
                      "@type": "Organization",
                      "name": "PrepSumit",
                      "sameAs": "https://prepsumit.com"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Course",
                    "name": "AP Calculus AB Study Guide & Exam Preparation",
                    "description": "Learn limits, derivatives, integrals, and their word problem applications with step-by-step video lessons and practice quizzes.",
                    "provider": {
                      "@type": "Organization",
                      "name": "PrepSumit",
                      "sameAs": "https://prepsumit.com"
                    }
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <div id="root">
          <AppProviders>
            {children}
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
