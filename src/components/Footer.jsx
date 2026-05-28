import Link from 'next/link';

export default function Footer({ setActivePage, onSelectCategoryLanding, onOpenInfo }) {
  return (
    <footer className="footer" style={{ 
      backgroundColor: '#333333', 
      padding: '48px 24px 32px 24px',
      color: '#cbd5e1',
      fontSize: '0.88rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      width: '100%'
    }}>
      <style>{`
        .footer-grid {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding-bottom: 40px;
          border-bottom: 1px solid #4a5568;
          flex-wrap: wrap;
          gap: 40px;
        }
        .footer-cols-left {
          display: flex;
          flex: 1 1 65%;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 32px;
        }
        .footer-col-right {
          flex: 0 1 300px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          text-align: right;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 140px;
        }
        .footer-col h4 {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 6px;
        }
        .footer-col a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.15s;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .footer-col a:hover {
          color: #ffb627;
        }
        @media (max-width: 900px) {
          .footer-grid {
            flex-direction: column;
          }
          .footer-cols-left {
            flex: 1 1 100%;
          }
          .footer-col-right {
            align-items: flex-start;
            text-align: left;
            border-top: 1px dashed #4a5568;
            padding-top: 24px;
            width: 100%;
          }
        }
      `}</style>

      {/* Main Grid: Left columns & Right Working Scholars area */}
      <div className="footer-grid">
        
        {/* Left columns */}
        <nav aria-label="Footer navigation" className="footer-cols-left">
          
          {/* Plans Column */}
          <div className="footer-col">
            <h4>Plans & Pricing</h4>
            <Link href="/pricing" onClick={() => setActivePage('plans')}>Student Solutions</Link>
            <Link href="/ftce" onClick={() => setActivePage('ftce')}>FTCE Exams Prep</Link>
            <Link href="/praxis" onClick={() => setActivePage('praxis')}>Praxis Core Prep</Link>
          </div>

          {/* About Us Column */}
          <div className="footer-col">
            <h4>About Us</h4>
            <Link href="/about" onClick={() => setActivePage('about')}>Our Mission</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenInfo('careers'); }}>Careers</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenInfo('teach'); }}>Teach For Us</a>
          </div>

          {/* Support Column */}
          <div className="footer-col">
            <h4>Support</h4>
            <Link href="/contact" onClick={() => setActivePage('contact')}>Contact Support</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenInfo('faq'); }}>FAQ Help</a>
          </div>

          {/* Download the app Column */}
          <div className="footer-col" style={{ minWidth: '150px' }}>
            <h4>Download the app</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Google Play Store Badge */}
              <div style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                width: '135px',
                border: '1px solid #4a5568'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,5.277L16.22,12L3,18.723V5.277 M3,3C2.4,3,2,3.4,2,4v16c0,0.6,0.4,1,1,1c0.2,0,0.4-0.1,0.6-0.2l17-8.8 c0.3-0.2,0.4-0.5,0.4-0.8s-0.1-0.6-0.4-0.8l-17-8.8C3.4,3.1,3.2,3,3,3z"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '6px', textTransform: 'uppercase', opacity: 0.8 }}>GET IT ON</div>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '-0.2px' }}>Google Play</div>
                </div>
              </div>

              {/* Apple App Store Badge */}
              <div style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '6px 12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                width: '135px',
                border: '1px solid #4a5568'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74,17,21.95,15.66,21.97C14.32,22,13.89,21.18,12.37,21.18C10.84,21.18,10.37,21.95,9.1,22C7.79,22.05,6.8,20.68,5.96,19.47C4.25,17,2.94,12.45,4.7,9.39C5.57,7.87,7.13,6.91,8.82,6.88C10.1,6.86,11.32,7.75,12.11,7.75C12.89,7.75,14.37,6.68,15.92,6.84C16.57,6.87,18.39,7.1,19.56,8.82C19.47,8.88,17.39,10.1,17.41,12.63C17.44,15.65,20.06,16.66,20.1,16.67C20.08,16.74,19.67,18.11,18.71,19.5M15.97,4.17C16.63,3.37,17.07,2.28,16.95,1C16,1.04,14.9,1.6,14.24,2.38C13.68,3.04,13.19,4.14,13.34,5.39C14.39,5.47,15.4,4.88,15.97,4.17Z"/>
                </svg>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '6px', opacity: 0.8 }}>Download on the</div>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', letterSpacing: '-0.2px' }}>App Store</div>
                </div>
              </div>
            </div>
          </div>

        </nav>

        {/* Right Working Scholars section */}
        <div className="footer-col-right">
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a href="#" aria-label="Facebook" style={{ color: '#ffffff', transition: 'opacity 0.15s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.8} onMouseOut={e => e.currentTarget.style.opacity = 1}>
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" style={{ color: '#ffffff', transition: 'opacity 0.15s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.8} onMouseOut={e => e.currentTarget.style.opacity = 1}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" style={{ color: '#ffffff', transition: 'opacity 0.15s' }} onMouseOver={e => e.currentTarget.style.opacity = 0.8} onMouseOut={e => e.currentTarget.style.opacity = 1}>
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>

          {/* Working Scholars Brand Logo & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
              {/* Working Scholars Custom Logo SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              <span style={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1rem', 
                fontWeight: '800', 
                color: '#ffffff',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                Working Scholars
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', lineHeight: '1.4', maxWidth: '240px' }}>
              Working Scholars® Bringing Tuition-Free College to the Community
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Bar: Copyright, Legal Links, BBB Badge */}
      <div style={{
        maxWidth: '1200px',
        margin: '24px auto 0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
        fontSize: '0.76rem',
        color: '#94a3b8',
        lineHeight: '1.6'
      }}>
        
        {/* Copyright & Disclaimer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '780px' }}>
          <span>
            © Copyright 2026 PrepSumit.com. All other trademarks and copyrights are the property of their respective owners. All rights reserved.
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}>
            <Link href="/terms-of-use" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Terms of Use</Link>
            <span>|</span>
            <Link href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'underline' }}>Privacy Policy</Link>
            <span>|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenInfo('terms'); }} style={{ color: '#94a3b8', textDecoration: 'underline' }}>DMCA Notice</a>
            <span>|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenInfo('terms'); }} style={{ color: '#94a3b8', textDecoration: 'underline' }}>ADA Compliance</a>
            <span>|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); onOpenInfo('terms'); }} style={{ color: '#94a3b8', textDecoration: 'underline' }}>Honor Code For Students</a>
          </div>
        </div>

        {/* BBB Badge */}
        <div style={{ cursor: 'pointer' }} title="BBB Accredited Business A+ Rating">
          <svg width="110" height="36" viewBox="0 0 130 42" fill="none" xmlns="http://www.w3.org/2000/svg">
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

    </footer>
  );
}
