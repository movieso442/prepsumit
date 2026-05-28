import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | PrepSumit",
  description: "Read the PrepSumit Privacy Policy to understand how prepsumit.com collects, uses, protects, and manages user information."
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 28, 2026";

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", color: '#2d3748' }}>
      
      {/* Header Banner */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '60px 24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f4e5a', margin: '0 0 12px 0' }}>
          Privacy Policy
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>1. Introduction</h2>
          <p>
            Welcome to PrepSumit. We operate the website <Link href="/" style={{ color: '#00829a', textDecoration: 'none' }}>prepsumit.com</Link>, providing high-quality online visual courses, exam preparation guides, test preparation materials, and academic pathways to earn transferable college credit. We are committed to protecting your personal privacy. 
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, share, and protect your information when you register an account, choose a study plan, interact with our learning systems, or contact our support team.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>2. Information We Collect</h2>
          <p>
            When you register an account, answer onboarding survey questions, or select a membership plan, we collect information you directly provide, including:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li><strong>Profile Details:</strong> Full name, email address, phone number, and physical location details (Country, City, State/Region, and ZIP/Postal Code).</li>
            <li><strong>Plan Selection:</strong> Selected study plan, membership type, billing cycle, and initial plan parameters.</li>
            <li><strong>Survey Responses:</strong> Answers to questions asked during account creation (e.g., onboarding role, target exam, prior attempt history, goals, and referral sources).</li>
            <li><strong>Support Request Data:</strong> Additional message details, notes, or files you include in registration or feedback forms.</li>
            <li><strong>Technical Telemetry:</strong> Device data, web browser configuration, IP address, standard cookie identifiers, and course usage telemetry.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>3. How We Use Your Information</h2>
          <p>
            We utilize the collected information to deliver and maintain our learning services, specifically for the following purposes:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Processing account creation requests and reviewing selected plans.</li>
            <li>Directly forwarding submitted registration and profile data to our billing desk at <a href="mailto:billing@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>billing@prepsumit.com</a> to generate secure invoice links and validate your account.</li>
            <li>Providing customer assistance and addressing support requests via <a href="mailto:support@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>support@prepsumit.com</a>.</li>
            <li>Improving platform performance, customizing study plans, and optimizing user interfaces.</li>
            <li>Monitoring telemetry to prevent fraudulent account creation, spam submissions, or honor code violations.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>4. Email Communication Policy</h2>
          <p>
            When you submit an account request form:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li>An automated confirmation receipt is sent to the customer email address provided.</li>
            <li>An internal notification listing your full profile details, onboarding responses, and selected plan is compiled and routed to <a href="mailto:billing@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>billing@prepsumit.com</a> and <a href="mailto:support@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>support@prepsumit.com</a>.</li>
            <li>Our staff will use these official email channels to coordinate onboarding instructions, support, and billing confirmations.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>5. Payment and Validation Process</h2>
          <p>
            To keep your personal payment data secure, PrepSumit does not collect credit card numbers or bank credentials directly on our site. Your account request will remain in a pending state until payment is verified. 
          </p>
          <p>
            Our billing team will contact you directly with official secure payment links. Please verify that all emails regarding payments originate from official addresses ending in <strong>@prepsumit.com</strong>.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>6. Cookies and Tracking Technologies</h2>
          <p>
            We use basic cookies and local storage tokens to recognize your authenticated sessions, maintain your dark mode preferences, and monitor study XP telemetry. You can control cookie preferences within your web browser settings, although blocking certain cookies may prevent the platform from saving your course completion progress.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>7. Data Sharing and Third Parties</h2>
          <p>
            PrepSumit does not sell or lease your personal profile information. We limit data access to trusted service providers essential to running our platform, including:
          </p>
          <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            <li><strong>Email Delivery Infrastructure:</strong> Service providers like Resend to send transactional receipt notifications and invoices.</li>
            <li><strong>Hosting and Infrastructure:</strong> Server providers hosting our site databases and static file layouts.</li>
            <li><strong>Analytics Services:</strong> Platforms used to track aggregated student progress and page visits.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>8. Data Security Measures</h2>
          <p>
            We deploy standard administrative, technical, and physical safeguards designed to prevent unauthorized access, deletion, or loss of customer profile data. While we work diligently to safeguard your account records, no online server transmission can be guaranteed to be 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>9. Data Retention</h2>
          <p>
            We retain your profile data, course history, and onboarding answers for as long as necessary to manage your account request, process billing validation, satisfy legal or audit compliance, and preserve accurate business logs.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>10. User Rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal records. If you wish to update your email address or request profile removal, please contact our student support desk at <a href="mailto:support@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>support@prepsumit.com</a>.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>11. Children and Students</h2>
          <p>
            Our platform provides study guides suitable for secondary and higher education students. If a user is a minor under local laws, parent, school, or guardian consent may be required to register accounts or process validation requests, depending on the educational context.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>12. International Data Transfers</h2>
          <p>
            PrepSumit operates in accordance with standard data privacy principles. If you access prepsumit.com from outside our primary hosting regions, you acknowledge that your personal information will be processed and stored in regions where our email and server infrastructures are maintained.
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>13. Changes to this Policy</h2>
          <p>
            We may update our Privacy Policy periodically to reflect changes in our operational procedures. When updates are published, the "Last Updated" date at the top of this page will be revised.
          </p>
        </section>

        <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '32px', marginTop: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f4e5a', marginBottom: '16px' }}>14. Contact Us</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, please email our support team at:
          </p>
          <p style={{ fontWeight: '700', color: '#1f4e5a' }}>
            <a href="mailto:support@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none' }}>support@prepsumit.com</a>
          </p>
        </section>

      </div>
    </div>
  );
}
