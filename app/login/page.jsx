import LoginClientPage from './LoginClientPage';

export const metadata = {
  title: "Login to Your PrepSumit Account | PrepSumit",
  description: "Log in to your PrepSumit account to access exam prep resources, practice tests, study plans, and learning tools.",
  alternates: {
    canonical: "https://prepsumit.com/login",
  },
  openGraph: {
    title: "Login to Your PrepSumit Account | PrepSumit",
    description: "Log in to your PrepSumit account to access exam prep resources, practice tests, study plans, and learning tools.",
    url: "https://prepsumit.com/login",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Login to Your PrepSumit Account | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to Your PrepSumit Account | PrepSumit",
    description: "Log in to your PrepSumit account to access exam prep resources, practice tests, study plans, and learning tools.",
    images: ["https://prepsumit.com/images/og-image.webp"],
  }
};

export default function LoginPage() {
  return <LoginClientPage />;
}
