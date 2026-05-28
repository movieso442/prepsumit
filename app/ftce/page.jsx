import FtceClientPage from './FtceClientPage';

export const metadata = {
  title: "FTCE Prep & Practice Tests | PrepSumit",
  description: "Prepare for the FTCE with PrepSumit study resources, practice tests, guided exam preparation, and flexible plans for teacher certification exam success.",
  alternates: {
    canonical: "https://prepsumit.com/ftce",
  },
  openGraph: {
    title: "FTCE Prep & Practice Tests | PrepSumit",
    description: "Prepare for the FTCE with PrepSumit study resources, practice tests, guided exam preparation, and flexible plans for teacher certification exam success.",
    url: "https://prepsumit.com/ftce",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "FTCE Prep & Practice Tests | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FTCE Prep & Practice Tests | PrepSumit",
    description: "Prepare for the FTCE with PrepSumit study resources, practice tests, guided exam preparation, and flexible plans.",
    images: ["https://prepsumit.com/images/og-image.png"],
  }
};

export default function FtcePage() {
  return <FtceClientPage />;
}
