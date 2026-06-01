import Image from 'next/image';

export const metadata = {
  title: "About Us | PrepSumit",
  description: "Learn about PrepSumit's mission, online courses, certification prep, and learning pathways for educators and working scholars.",
  alternates: {
    canonical: "https://prepsumit.com/about",
  },
  openGraph: {
    title: "About Us | PrepSumit",
    description: "Learn about PrepSumit's mission, online courses, certification prep, and learning pathways for educators and working scholars.",
    url: "https://prepsumit.com/about",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Us | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | PrepSumit",
    description: "Learn about PrepSumit's mission, online courses, certification prep, and learning pathways for educators and working scholars.",
    images: ["https://prepsumit.com/og-image.png"],
  }
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", color: '#222222' }}>
      
      {/* Hero Section */}
      <div style={{ backgroundColor: '#07323b', color: '#ffffff', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 16px 0', color: '#ffffff' }}>
            About PrepSumit
          </h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: '1.6', margin: 0 }}>
            We believe that traditional educational barriers can be dismantled using modern technology. Our short, visually rich lessons help adult learners, future teachers, and students master concepts quickly and pass their exams on the first attempt.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 100px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Our Mission */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1f4e5a', margin: 0 }}>
              Our Mission
            </h2>
            <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: '1.7', margin: 0 }}>
              PrepSumit is a leading online learning platform offering flexible and affordable study guides, certification courses, and college credit pathways. We focus on standard-aligned education designed for adult learners who require structure, high visual engagement, and bite-sized modules to balance learning with busy schedules.
            </p>
            <p style={{ fontSize: '1rem', color: '#4a5568', lineHeight: '1.7', margin: 0 }}>
              Through diagnostic quizzes, interactive flashcards, visual micro-lessons, and proctored exam readiness certifications, we help students transition successfully from learning to achieving.
            </p>
          </div>
          <div style={{ position: 'relative', width: '100%', height: '240px' }}>
            <Image 
              src="/images/hero-exam-prep.webp" 
              alt="Engaged Student Studying Illustration" 
              fill 
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        </section>

        {/* What We Offer */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1f4e5a', margin: 0, textAlign: 'center' }}>
            What We Offer
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            {/* Box 1 */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' }}>
              <strong style={{ fontSize: '1.15rem', color: '#1f4e5a' }}>Exam Preparation</strong>
              <span style={{ fontSize: '0.92rem', color: '#4a5568', lineHeight: '1.6' }}>
                Complete study guides, realistic practice tests, and question analyses for FTCE, Praxis, and other teacher certification programs.
              </span>
            </div>

            {/* Box 2 */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' }}>
              <strong style={{ fontSize: '1.15rem', color: '#1f4e5a' }}>College Transfer Credits</strong>
              <span style={{ fontSize: '0.92rem', color: '#4a5568', lineHeight: '1.6' }}>
                ACE & NCCRS-recommended online courses designed to transfer seamlessly to over 1,500 partner colleges and universities.
              </span>
            </div>

            {/* Box 3 */}
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#f8fafc' }}>
              <strong style={{ fontSize: '1.15rem', color: '#1f4e5a' }}>Guided Learning Support</strong>
              <span style={{ fontSize: '0.92rem', color: '#4a5568', lineHeight: '1.6' }}>
                State-of-the-art AI tutoring integration, customizable calendar tracking, and detailed score breakdown charts.
              </span>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
