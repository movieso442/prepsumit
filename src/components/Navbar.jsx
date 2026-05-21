import React, { useState } from 'react';
import { Search, ChevronDown, User, Flame, LogOut, Award, Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, darkMode, setDarkMode, searchQuery, setSearchQuery, user }) {
  const [showSearch, setShowSearch] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Plans', hasDropdown: false, page: 'catalog' },
    { name: 'Courses', hasDropdown: true, page: 'catalog' },
    { name: 'Subjects', hasDropdown: true, page: 'catalog' },
    { name: 'Teachers', hasDropdown: true, page: 'catalog' },
    { name: 'Certifications', hasDropdown: true, page: 'catalog' },
    { name: 'College Degrees', hasDropdown: true, page: 'catalog' }
  ];

  return (
    <header className="header-nav" style={{ 
      backgroundColor: '#ffffff', 
      borderBottom: '1px solid #d2dbe5',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div className="header-container" style={{ padding: '8px 24px', height: '68px' }}>
        
        {/* Left Side: Logo and Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          
          {/* Brand Logo - Styled precisely like PrepSummit.com */}
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            onClick={() => { setActivePage('home'); setSearchQuery(''); }}
          >
            {/* SVG of PrepSummit.com multi-colored triangle brand logo */}
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15 L85 50 L15 85 Z" fill="#13809c" />
              <path d="M15 15 L50 50 L15 85 Z" fill="#1f4e5a" opacity="0.3" />
              <path d="M50 50 L85 50 L15 85 Z" fill="#ffb627" />
            </svg>
            <span style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.65rem', 
              fontWeight: '800', 
              color: '#1f4e5a',
              letterSpacing: '-0.03em'
            }}>
              PrepSummit<span style={{ color: '#ffb627' }}>.com</span>
            </span>
          </div>

          {/* Main Links */}
          <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {navItems.map((item, idx) => (
              <div 
                key={idx} 
                style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '4px' }}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => {
                    setActivePage(item.page);
                    if (item.name === 'Certifications') {
                      setSearchQuery('FTCE');
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: '600',
                    fontSize: '0.92rem',
                    color: '#222222',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 0',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#13809c'}
                  onMouseOut={(e) => e.target.style.color = '#222222'}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown size={14} style={{ opacity: 0.8 }} />}
                </button>

                {/* Simulated Hover Dropdowns */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="card fade-in" style={{
                    position: 'absolute',
                    top: '36px',
                    left: 0,
                    width: '240px',
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    zIndex: 999,
                    border: '1px solid #d2dbe5',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {item.name === 'Courses' && (
                      <>
                        <span className="footer-link" onClick={() => { setActivePage('catalog'); setSearchQuery('FTCE'); }} style={{ cursor: 'pointer', fontSize: '0.88rem' }}>FTCE Teacher Test Prep</span>
                        <span className="footer-link" onClick={() => { setActivePage('catalog'); setSearchQuery('Calculus'); }} style={{ cursor: 'pointer', fontSize: '0.88rem' }}>AP Calculus Prep</span>
                        <span className="footer-link" onClick={() => { setActivePage('catalog'); setSearchQuery('Biology'); }} style={{ cursor: 'pointer', fontSize: '0.88rem' }}>Science and Biology</span>
                      </>
                    )}
                    {item.name === 'Certifications' && (
                      <>
                        <span className="footer-link" onClick={() => { setActivePage('catalog'); setSearchQuery('FTCE'); }} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: 'bold', color: '#13809c' }}>FTCE Exams (PEd)</span>
                        <span className="footer-link" style={{ fontSize: '0.88rem', opacity: 0.5 }}>PRAXIS Test Prep</span>
                        <span className="footer-link" style={{ fontSize: '0.88rem', opacity: 0.5 }}>TEXES Teacher Prep</span>
                      </>
                    )}
                    {item.name !== 'Courses' && item.name !== 'Certifications' && (
                      <span style={{ fontSize: '0.85rem', color: '#718096' }}>Explore all {item.name} modules in catalog.</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side: Search bar, Log In, and Sign Up */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Search Magnifying glass toggle */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            {showSearch ? (
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #13809c', borderRadius: '20px', padding: '2px 8px', backgroundColor: '#f2f6f9' }}>
                <input 
                  type="text" 
                  placeholder="Search test prep..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activePage !== 'catalog') setActivePage('catalog');
                  }}
                  autoFocus
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    fontSize: '0.85rem',
                    padding: '4px 6px',
                    width: '150px',
                    color: '#222222'
                  }}
                />
                <Search size={16} style={{ color: '#13809c', cursor: 'pointer' }} onClick={() => setShowSearch(false)} />
              </div>
            ) : (
              <button 
                onClick={() => setShowSearch(true)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#13809c' }}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Log In Button - White background, blue-teal border and text */}
          <button 
            onClick={() => setActivePage('login')}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #13809c',
              borderRadius: '4px',
              color: '#13809c',
              fontWeight: '700',
              fontSize: '0.9rem',
              padding: '8px 18px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(19, 128, 156, 0.04)'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            Log In
          </button>

          {/* Sign Up Button - Solid Amber/Orange block */}
          <button 
            onClick={() => setActivePage('signup')}
            style={{
              backgroundColor: '#ffb627',
              border: 'none',
              borderRadius: '4px',
              color: '#222222',
              fontWeight: '800',
              fontSize: '0.9rem',
              padding: '9px 20px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(255,182,39,0.15)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#fba919';
              e.target.style.transform = 'translateY(-0.5px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#ffb627';
              e.target.style.transform = 'none';
            }}
          >
            Sign Up
          </button>
          
          {/* Hamburger Menu Toggle (Visible on Mobile) */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '6px', 
              color: '#1f4e5a'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Links */}
      {mobileMenuOpen && (
        <div className="fade-in" style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #d2dbe5',
          borderBottom: '1px solid #d2dbe5',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: 'var(--shadow-md)',
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          zIndex: 998
        }}>
          {navItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => {
                  setActivePage(item.page);
                  if (item.name === 'Certifications') {
                    setSearchQuery('FTCE');
                  }
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: '#222222',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <span>{item.name}</span>
              </button>
            </div>
          ))}
          
          {/* Quick Mobile Action Links */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px', borderTop: '1px solid #f2f6f9', paddingTop: '16px' }}>
            <button 
              onClick={() => { setActivePage('login'); setMobileMenuOpen(false); }}
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                border: '1.5px solid #13809c',
                borderRadius: '4px',
                color: '#13809c',
                fontWeight: '700',
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Log In
            </button>
            <button 
              onClick={() => { setActivePage('signup'); setMobileMenuOpen(false); }}
              style={{
                flex: 1,
                backgroundColor: '#ffb627',
                border: 'none',
                borderRadius: '4px',
                color: '#222222',
                fontWeight: '800',
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
