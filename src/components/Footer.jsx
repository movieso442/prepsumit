import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer" style={{ 
      backgroundColor: '#ffffff', 
      borderTop: '1.5px solid #d2dbe5', 
      padding: '56px 24px 32px 24px',
      color: '#4a5568',
      fontSize: '0.88rem'
    }}>
      {/* 5-Column Grid Layout */}
      <div className="footer-main-grid" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        paddingBottom: '40px',
        borderBottom: '1px solid #d2dbe5'
      }}>
        
        {/* Brand & BBB Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15 L85 50 L15 85 Z" fill="#13809c" />
              <path d="M15 15 L50 50 L15 85 Z" fill="#1f4e5a" opacity="0.3" />
              <path d="M50 50 L85 50 L15 85 Z" fill="#ffb627" />
            </svg>
            <span style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.4rem', 
              fontWeight: '800', 
              color: '#1f4e5a',
              letterSpacing: '-0.03em'
            }}>
              PrepSummit<span style={{ color: '#ffb627' }}>.com</span>
            </span>
          </div>
          
          <p style={{ lineHeight: '1.6', color: '#4a5568', fontSize: '0.85rem' }}>
            PrepSummit.com is a leading online learning platform offering flexible and affordable learning products that help learners earn degrees, certifications, and credentials aligned with real-world outcomes.
          </p>

          {/* SVG BBB Badge Replica */}
          <div style={{ width: '130px', cursor: 'pointer' }} title="BBB Accredited Business A+ Rating">
            <svg width="130" height="42" viewBox="0 0 130 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="130" height="42" fill="#004c6c" rx="3" />
              {/* Torch Symbol */}
              <path d="M14 26 C14 22, 17 14, 20 8 C19 14, 21 22, 21 26 Z" fill="#ffffff" />
              <circle cx="17.5" cy="27" r="4.5" fill="#ffffff" />
              <rect x="15" y="31" width="5" height="4" fill="#ffffff" />
              {/* BBB Text */}
              <text x="35" y="18" fill="#ffffff" fontFamily="sans-serif" fontSize="13" fontWeight="bold">BBB</text>
              {/* ACCREDITED BUSINESS Text */}
              <text x="35" y="28" fill="#ffffff" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" letterSpacing="0.4">ACCREDITED</text>
              <text x="35" y="36" fill="#ffffff" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" letterSpacing="0.4">BUSINESS</text>
            </svg>
          </div>
        </div>

        {/* Plans Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h4 style={{ color: '#1f4e5a', fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Plans</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className="footer-link" onClick={() => setActivePage('catalog')} style={{ color: '#004c6c', cursor: 'pointer' }}>Study Help</span>
            <span className="footer-link" onClick={() => setActivePage('catalog')} style={{ color: '#004c6c', cursor: 'pointer' }}>Test Preparation</span>
            <span className="footer-link" onClick={() => setActivePage('catalog')} style={{ color: '#004c6c', cursor: 'pointer' }}>College Credit</span>
            <span className="footer-link" onClick={() => setActivePage('catalog')} style={{ color: '#004c6c', cursor: 'pointer' }}>Teacher Resources</span>
            <span className="footer-link" onClick={() => setActivePage('catalog')} style={{ color: '#004c6c', cursor: 'pointer' }}>Working Scholars®</span>
          </div>
        </div>

        {/* About us Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h4 style={{ color: '#1f4e5a', fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>About us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Blog</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Careers</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Teach for Us</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Press Center</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Ambassador</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Scholarships</span>
          </div>
        </div>

        {/* Support Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h4 style={{ color: '#1f4e5a', fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>FAQ</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Site Feedback</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Terms of Use</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Privacy Policy</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>DMCA Notice</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>ADA Compliance</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Honor Code for Students</span>
            <span className="footer-link" style={{ color: '#004c6c', cursor: 'pointer' }}>Resources and Guides</span>
          </div>
        </div>

        {/* Mobile Apps Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h4 style={{ color: '#1f4e5a', fontSize: '1rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>Mobile Apps</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Google Play Store Badge Replica */}
            <div style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              width: '135px'
            }}>
              {/* Play symbol */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,5.277L16.22,12L3,18.723V5.277 M3,3C2.4,3,2,3.4,2,4v16c0,0.6,0.4,1,1,1c0.2,0,0.4-0.1,0.6-0.2l17-8.8 c0.3-0.2,0.4-0.5,0.4-0.8s-0.1-0.6-0.4-0.8l-17-8.8C3.4,3.1,3.2,3,3,3z"/>
              </svg>
              <div>
                <div style={{ fontSize: '7px', textTransform: 'uppercase', opacity: 0.8 }}>GET IT ON</div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '-0.2px' }}>Google Play</div>
              </div>
            </div>

            {/* Apple App Store Badge Replica */}
            <div style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              width: '135px'
            }}>
              {/* Apple symbol */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,21.97C14.32,22,13.89,21.18,12.37,21.18C10.84,21.18,10.37,21.95,9.1,22C7.79,22.05,6.8,20.68,5.96,19.47C4.25,17,2.94,12.45,4.7,9.39C5.57,7.87,7.13,6.91,8.82,6.88C10.1,6.86,11.32,7.75,12.11,7.75C12.89,7.75,14.37,6.68,15.92,6.84C16.57,6.87,18.39,7.1,19.56,8.82C19.47,8.88,17.39,10.1,17.41,12.63C17.44,15.65,20.06,16.66,20.1,16.67C20.08,16.74,19.67,18.11,18.71,19.5M15.97,4.17C16.63,3.37,17.07,2.28,16.95,1C16,1.04,14.9,1.6,14.24,2.38C13.68,3.04,13.19,4.14,13.34,5.39C14.39,5.47,15.4,4.88,15.97,4.17Z"/>
              </svg>
              <div>
                <div style={{ fontSize: '7px', opacity: 0.8 }}>Download on the</div>
                <div style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '-0.2px' }}>App Store</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Info (Contact, Copyright, Socials) */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '24px auto 0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '24px',
        fontSize: '0.78rem',
        color: '#718096',
        lineHeight: '1.6'
      }}>
        
        {/* Contact and Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '750px' }}>
          <span>Florida Teacher Certification Examinations (FTCE) is a registered trademark of Pearson Education, which is not affiliated with PrepSummit.com.</span>
          <span>Contact us by phone at (877) 266-4919, or by mail at 100 View Street #202, Mountain View, CA 94041.</span>
          <span>&copy; Copyright {new Date().getFullYear()} PrepSummit.com. All other trademarks and copyrights are the property of their respective owners. All rights reserved.</span>
        </div>

        {/* Social Icons (using inline SVGs for perfect compilation) */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {/* Facebook */}
          <a href="#" style={{ color: '#222222' }} aria-label="Facebook">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" style={{ color: '#222222' }} aria-label="YouTube">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" style={{ color: '#222222' }} aria-label="Instagram">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="#" style={{ color: '#222222' }} aria-label="LinkedIn">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
