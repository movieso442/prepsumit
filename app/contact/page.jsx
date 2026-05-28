import Image from 'next/image';

export const metadata = {
  title: "Contact Customer Support | PrepSumit",
  description: "Contact PrepSumit customer support, telephone support lines, billing questions, and student account validation help.",
  alternates: {
    canonical: "https://prepsumit.com/contact",
  },
  openGraph: {
    title: "Contact Customer Support | PrepSumit",
    description: "Contact PrepSumit customer support, telephone support lines, billing questions, and student account validation help.",
    url: "https://prepsumit.com/contact",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Contact Customer Support | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Customer Support | PrepSumit",
    description: "Contact PrepSumit customer support, telephone support lines, billing questions, and student account validation help.",
    images: ["https://prepsumit.com/images/og-image.webp"],
  }
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", color: '#222222' }}>
      
      {/* Hero Header */}
      <div style={{ backgroundColor: '#07323b', color: '#ffffff', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 16px 0', color: '#ffffff' }}>
            Contact Student Support
          </h1>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, lineHeight: '1.6', margin: 0 }}>
            Have questions about study guides, billing, plan selections, or credit transfers? We are here to help.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '60px 24px 100px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', width: '100%' }}>
        
        {/* Support Channels Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1f4e5a', margin: 0 }}>
              Get in Touch
            </h2>
            <p style={{ fontSize: '0.96rem', color: '#4a5568', margin: 0 }}>
              Our student support specialists are available Monday through Friday, 9:00 AM to 6:00 PM EST.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Telephone support */}
            <div style={{ borderLeft: '4px solid #ffb627', paddingLeft: '16px' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: '#1f4e5a', marginBottom: '4px' }}>Telephone Support</strong>
              <a href="tel:8772664919" style={{ fontSize: '1.15rem', fontWeight: '700', color: '#13809c', textDecoration: 'none' }}>
                (877) 266-4919
              </a>
              <span style={{ display: 'block', fontSize: '0.8rem', color: '#718096', marginTop: '2px' }}>Toll-Free (US and Canada)</span>
            </div>

            {/* Support email */}
            <div style={{ borderLeft: '4px solid #13809c', paddingLeft: '16px' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: '#1f4e5a', marginBottom: '4px' }}>Student Support Desk</strong>
              <a href="mailto:support@prepsumit.com" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#13809c', textDecoration: 'none' }}>
                support@prepsumit.com
              </a>
            </div>

            {/* Billing email */}
            <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '16px' }}>
              <strong style={{ display: 'block', fontSize: '1rem', color: '#1f4e5a', marginBottom: '4px' }}>Billing Validation & Invoices</strong>
              <a href="mailto:billing@prepsumit.com" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#13809c', textDecoration: 'none' }}>
                billing@prepsumit.com
              </a>
            </div>

          </div>
        </div>

        {/* Support Illustration Box */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', width: '100%', height: '240px', maxWidth: '360px' }}>
            <Image 
              src="/images/support-contact-illustration.webp" 
              alt="Friendly Support Agents Illustration" 
              fill 
              style={{ objectFit: 'contain' }}
            />
          </div>
          <span style={{ fontSize: '0.85rem', color: '#718096', textAlign: 'center', fontStyle: 'italic' }}>
            Our average response time for support inquiries is under 2 hours.
          </span>
        </div>

      </div>
    </div>
  );
}
