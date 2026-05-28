import { useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Login({ setActivePage, onStartSignup, onSelectCategoryLanding, onOpenInfo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please fill in both email/phone number and password.");
      return;
    }
    // Simulate successful login
    setActivePage('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff' }}>
      
      {/* Main Authentication Workspace */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px 80px 24px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        
        {/* Page Title */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1f4e5a',
          margin: '0',
          fontFamily: 'var(--font-heading)'
        }}>
          Log in to your account
        </h1>

        {/* Responsive Dual Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          
          {/* Left Column: Log In Form Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <form 
              onSubmit={handleSubmit}
              style={{
                backgroundColor: '#f3f5f7',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {/* Field 1: Phone or Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>
                  Log in with your phone number or email
                </label>
                <input 
                  type="text" 
                  placeholder="Phone number or email"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    border: '1.5px solid #d2dbe5',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                    color: '#222222',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#13809c'}
                  onBlur={e => e.target.style.borderColor = '#d2dbe5'}
                />
              </div>

              {/* Field 2: Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    border: '1.5px solid #d2dbe5',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                    color: '#222222',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#13809c'}
                  onBlur={e => e.target.style.borderColor = '#d2dbe5'}
                />
              </div>

              {/* Keep me logged in checkbox + Forgot link */}
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', color: '#4a5568' }}>
                  <input 
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={e => setKeepLoggedIn(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#d93838', // PrepSumit.com uses red checkboxes
                      cursor: 'pointer'
                    }}
                  />
                  <span>Keep me logged in</span>
                </label>

                <span 
                  onClick={() => alert("Password reset instructions have been simulated.")}
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    color: '#13809c',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  Forgot Your Password?
                </span>
              </div>

              {/* Log In Submit Button */}
              <button 
                type="submit"
                style={{
                  backgroundColor: '#13809c',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  padding: '14px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(19,128,156,0.15)',
                  transition: 'background-color 0.2s',
                  marginTop: '8px'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#0f6880'}
                onMouseOut={e => e.target.style.backgroundColor = '#13809c'}
              >
                Log in
              </button>
            </form>

            {/* Bottom auxiliary classroom access links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '8px' }}>
              <span 
                onClick={() => { onStartSignup(); }}
                style={{ fontSize: '0.9rem', color: '#13809c', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Join a classroom
              </span>
              <span 
                onClick={() => { onStartSignup(); }}
                style={{ fontSize: '0.9rem', color: '#13809c', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Join with a group license code
              </span>
            </div>
          </div>

          {/* Right Column: Value Proposition & Signup Redirection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', padding: '16px 0' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '700', color: '#1f4e5a', margin: '0' }}>
              Need a PrepSumit.com Account?
            </h2>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                "Simple & engaging videos to help you learn",
                "Unlimited access to 88,000+ lessons",
                "The lowest-cost way to earn college credit"
              ].map((bullet, bulletIdx) => (
                <div key={bulletIdx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#e6f4f8',
                    color: '#13809c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.95rem', color: '#4a5568', fontWeight: '500' }}>
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Account Creation CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '380px' }}>
              <button
                onClick={() => onStartSignup()}
                style={{
                  backgroundColor: '#ffb627',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#222222',
                  fontWeight: '800',
                  fontSize: '0.98rem',
                  padding: '14px 24px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 2px 4px rgba(255,182,39,0.15)'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
                onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
              >
                Create an account
              </button>

              <button
                onClick={() => onStartSignup()}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #13809c',
                  borderRadius: '4px',
                  color: '#13809c',
                  fontWeight: '700',
                  fontSize: '0.98rem',
                  padding: '14px 24px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = 'rgba(19, 128, 156, 0.04)'}
                onMouseOut={e => e.target.style.backgroundColor = '#ffffff'}
              >
                Create a college credit account
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Simplified Auth Footer */}
      <footer style={{ 
        backgroundColor: '#eef6f9', 
        borderTop: '1px solid #d2dbe5', 
        padding: '48px 24px 32px 24px',
        color: '#4a5568',
        fontSize: '0.85rem',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Grid columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '32px'
          }}>
            
            {/* Plans */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#1f4e5a', fontWeight: '800', fontSize: '0.95rem' }}>Plans</h4>
              <span onClick={() => setActivePage('plans')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Student Solutions</span>
              <span onClick={() => onSelectCategoryLanding('teacher-resources')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Teacher Solutions</span>
              <span onClick={() => onSelectCategoryLanding('college-credit')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Working Scholars® Solutions</span>
            </div>

            {/* About Us */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#1f4e5a', fontWeight: '800', fontSize: '0.95rem' }}>About Us</h4>
              <span onClick={() => onOpenInfo('faq')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Blog</span>
              <span onClick={() => onOpenInfo('careers')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Careers</span>
              <span onClick={() => onOpenInfo('teach')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Teach For Us</span>
              <span onClick={() => onOpenInfo('about')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Press Center</span>
              <span onClick={() => onOpenInfo('about')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Ambassador</span>
              <span onClick={() => onOpenInfo('about')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Scholarships</span>
            </div>

            {/* Support */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#1f4e5a', fontWeight: '800', fontSize: '0.95rem' }}>Support</h4>
              <span onClick={() => onOpenInfo('faq')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Contact Support</span>
              <span onClick={() => onOpenInfo('faq')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>FAQ</span>
              <span onClick={() => onOpenInfo('faq')} style={{ color: '#004c6c', cursor: 'pointer', textDecoration: 'underline' }}>Site Feedback</span>
            </div>

            {/* Download the app */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#1f4e5a', fontWeight: '800', fontSize: '0.95rem' }}>Download the app</h4>
              <div style={{
                backgroundColor: '#000000', color: '#ffffff', padding: '6px 12px', borderRadius: '5px',
                display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', width: '135px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,5.277L16.22,12L3,18.723V5.277 M3,3C2.4,3,2,3.4,2,4v16c0,0.6,0.4,1,1,1c0.2,0,0.4-0.1,0.6-0.2l17-8.8 c0.3-0.2,0.4-0.5,0.4-0.8s-0.1-0.6-0.4-0.8l-17-8.8C3.4,3.1,3.2,3,3,3z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '7px', opacity: 0.8 }}>GET IT ON</div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Google Play</div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#000000', color: '#ffffff', padding: '6px 12px', borderRadius: '5px',
                display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', width: '135px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,21.97C14.32,22,13.89,21.18,12.37,21.18C10.84,21.18,10.37,21.95,9.1,22C7.79,22.05,6.8,20.68,5.96,19.47C4.25,17,2.94,12.45,4.7,9.39C5.57,7.87,7.13,6.91,8.82,6.88C10.1,6.86,11.32,7.75,12.11,7.75C12.89,7.75,14.37,6.68,15.92,6.84C16.57,6.87,18.39,7.1,19.56,8.82C19.47,8.88,17.39,10.1,17.41,12.63C17.44,15.65,20.06,16.66,20.1,16.67C20.08,16.74,19.67,18.11,18.71,19.5M15.97,4.17C16.63,3.37,17.07,2.28,16.95,1C16,1.04,14.9,1.6,14.24,2.38C13.68,3.04,13.19,4.14,13.34,5.39C14.39,5.47,15.4,4.88,15.97,4.17Z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '7px', opacity: 0.8 }}>Download on the</div>
                  <div style={{ fontSize: '11px', fontWeight: 'bold' }}>App Store</div>
                </div>
              </div>
            </div>

            {/* Social Media & Initiative Banner */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {/* Facebook */}
                <a href="#" style={{ color: '#004c6c' }} aria-label="Facebook">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                  </svg>
                </a>
                {/* Twitter */}
                <a href="#" style={{ color: '#004c6c' }} aria-label="Twitter">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" style={{ color: '#004c6c' }} aria-label="YouTube">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              {/* Working Scholars text graphic */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#13809c', textTransform: 'uppercase' }}>
                  Working Scholars®
                </span>
                <span style={{ fontSize: '0.75rem', color: '#718096' }}>
                  Tuition-Free College
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & BBB */}
          <div style={{
            borderTop: '1px solid #cbd5e1',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '800px' }}>
              <span>© Copyright 2026 PrepSumit.com. All other trademarks and copyrights are the property of their respective owners. All rights reserved.</span>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/terms-of-use" style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Terms of Use</Link>
                <span>|</span>
                <Link href="/privacy-policy" style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Privacy Policy</Link>
                <span>|</span>
                <span onClick={() => onOpenInfo('terms')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>DMCA Notice</span>
                <span>|</span>
                <span onClick={() => onOpenInfo('terms')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>ADA Compliance</span>
                <span>|</span>
                <span onClick={() => onOpenInfo('terms')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Honor Code for Students</span>
              </div>
            </div>

            {/* BBB Accredited Business Badge */}
            <div style={{ width: '110px' }} title="BBB Accredited Business">
              <svg width="110" height="34" viewBox="0 0 130 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="130" height="42" fill="#004c6c" rx="3" />
                <path d="M14 26 C14 22, 17 14, 20 8 C19 14, 21 22, 21 26 Z" fill="#ffffff" />
                <circle cx="17.5" cy="27" r="4.5" fill="#ffffff" />
                <rect x="15" y="31" width="5" height="4" fill="#ffffff" />
                <text x="35" y="18" fill="#ffffff" fontFamily="sans-serif" fontSize="13" fontWeight="bold">BBB</text>
                <text x="35" y="28" fill="#ffffff" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" letterSpacing="0.4">ACCREDITED</text>
                <text x="35" y="36" fill="#ffffff" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" letterSpacing="0.4">BUSINESS</text>
              </svg>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
