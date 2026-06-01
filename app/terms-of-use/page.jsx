import Link from 'next/link';

export const metadata = {
  title: "Terms of Use | PrepSumit",
  description: "Read the PrepSumit Terms of Use for rules and conditions that apply when using prepsumit.com.",
  alternates: {
    canonical: "https://prepsumit.com/terms-of-use",
  },
  openGraph: {
    title: "Terms of Use | PrepSumit",
    description: "Read the PrepSumit Terms of Use for rules and conditions that apply when using prepsumit.com.",
    url: "https://prepsumit.com/terms-of-use",
    siteName: "PrepSumit",
    type: "website",
    images: [
      {
        url: "https://prepsumit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Terms of Use | PrepSumit"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | PrepSumit",
    description: "Read the PrepSumit Terms of Use for rules and conditions that apply when using prepsumit.com.",
    images: ["https://prepsumit.com/og-image.png"],
  }
};

export default function TermsOfUsePage() {
  const lastUpdated = "May 28, 2026";

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", color: '#2d3748' }}>
      
      {/* Header Banner */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f4e5a', margin: '0 0 12px 0' }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0, fontStyle: 'italic' }}>
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px 100px 24px', lineHeight: '1.7', fontSize: '1.05rem' }}>
        
        {/* Transparency Disclaimer */}
        <div style={{
          backgroundColor: '#fffbeb',
          borderLeft: '4px solid #f59e0b',
          borderRadius: '4px',
          padding: '16px 20px',
          marginBottom: '40px',
          fontSize: '0.92rem',
          color: '#78350f',
          lineHeight: '1.5'
        }}>
          <strong>Disclaimer for Transparency:</strong> This document is provided for transparency and illustrative purposes to inform visitors about the operations of PrepSumit. It should be reviewed and customized by a qualified legal professional to match your jurisdiction and specific business practices before actual production launch.
        </div>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>1. Introduction and Acceptance of Terms</h2>
          <p>
            Welcome to PrepSumit. By visiting, browsing, registering, or using <Link href="/" style={{ color: '#00829a', textDecoration: 'none' }}>prepsumit.com</Link> (the "Site"), you agree to be bound by these Terms of Use ("Terms"). 
          </p>
          <p>
            If you do not agree to all of these Terms, you must immediately discontinue using the Site and our services. 
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>2. About PrepSumit Services</h2>
          <p>
            PrepSumit is an online educational support platform designed to make learning simplified, flexible, and affordable. We provide video lessons, written study guides, practice tests, homework telemetry trackers, and pathways recommending transferable college credits accepted at accredited universities. 
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>3. Account Creation and Information Accuracy</h2>
          <p>
            To sign up, you must complete onboarding surveys and register your details. You agree to:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Provide accurate, current, and complete registration info.</li>
            <li>Maintain the confidentiality and security of your account credentials.</li>
            <li>Be fully responsible for all actions occurring under your account.</li>
            <li>Understand that submitting the account registration form does not guarantee automatic activation or access. Your account will remain in a pending state until validation steps are finalized.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>4. Study Plans, Payment, and Activation Validation</h2>
          <p>
            During signup, you may choose a study plan (e.g. Test Prep, Premium Edition, Classroom Teacher, or College Accelerator).
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>PrepSumit does not collect banking or credit card details on our site. </li>
            <li>After submitting your request, a representative from our billing desk will contact you via <a href="mailto:billing@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>billing@prepsumit.com</a> to provide secure payment details and guide you through final validation.</li>
            <li>Your account will be activated and validated only after successful payment receipt. You should only trust communication originating from official email addresses ending in <strong>@prepsumit.com</strong>.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>5. Acceptable Use Guidelines</h2>
          <p>
            You agree to use prepsumit.com in compliance with all applicable local, national, and international laws. You must not:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Abuse, threaten, harass, or defame other students or support staff.</li>
            <li>Attempt unauthorized access to other accounts, servers, or database logs.</li>
            <li>Upload or transmit harmful code, viruses, or malicious script software.</li>
            <li>Use the platform or its learning guides to perform academic fraud or copy test questions.</li>
            <li>Scrape, copy, or redistribute course videos, written explanations, or quiz questions without prior written consent from PrepSumit.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>6. Educational Content and Platform Use</h2>
          <p>
            All study guides, practice exams, and lesson explanations on prepsumit.com are provided as educational study aids. While we build our content to align with standard guidelines, PrepSumit does not guarantee that using our materials will result in specific passing scores, academic outcomes, or exam success.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>7. User Submissions</h2>
          <p>
            Any messages, survey responses, or quiz answers you submit through the Site will be used to process your registration request and configure your personal dashboard study plans. By submitting answers, you grant PrepSumit the necessary rights to process this information to deliver our services.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>8. Intellectual Property Rights</h2>
          <p>
            All content, graphics, videos, codebases, layout themes, and logos rendered on the Site are the exclusive intellectual property of PrepSumit or its licensing partners. These materials are protected by standard trademark, copyright, and patent laws.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>9. Third-Party Services</h2>
          <p>
            Our website relies on third-party service providers (such as Resend for email routing and other server hosts) to function. We are not responsible for service availability issues caused by these external infrastructure networks.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>10. Service Availability and Updates</h2>
          <p>
            We strive to maintain continuous uptime. However, prepsumit.com may occasionally undergo updates, server upgrades, or suspension of specific course pathways. We reserve the right to modify, restrict, or change parts of the platform without prior notice.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>11. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable laws, PrepSumit and its team members will not be liable for any indirect, special, incidental, or consequential damages resulting from your use of, or inability to use, the platform study guides.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>12. Account Suspension or Termination</h2>
          <p>
            We reserve the right to temporarily suspend or permanently terminate your account validation request or platform access at our discretion, without liability, if you violate these Terms, share false account details, commit payment fraud, or engage in behavior harmful to our learning environment.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>13. Changes to the Terms</h2>
          <p>
            PrepSumit reserves the right to modify these Terms of Use at any time. When updates occur, we will adjust the "Last Updated" date. Continued use of the website following revisions signifies your agreement to the updated Terms.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '32px', marginTop: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>14. Contact Support</h2>
          <p>
            If you have questions regarding these Terms of Use, please reach out to:
          </p>
          <p style={{ fontWeight: '700', color: '#1f4e5a' }}>
            <a href="mailto:support@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>support@prepsumit.com</a>
          </p>
        </section>

      </div>
    </div>
  );
}
