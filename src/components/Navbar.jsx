import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery, 
  user,
  courses,
  onSelectCourse
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  // Keep local search query in sync when parent query changes
  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActivePage('catalog');
  };

  const selectCourseById = (courseId) => {
    if (!courses) return;
    const found = courses.find(c => c.id === courseId);
    if (found && onSelectCourse) {
      onSelectCourse(found);
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTestimonials = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    
    if (activePage !== 'home') {
      setActivePage('home');
      // Wait for home page to render then scroll
      setTimeout(() => {
        const section = document.getElementById('testimonials-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById('testimonials-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavItemClick = (item) => {
    if (item.name === 'FTCE Prep Testimonials') {
      scrollToTestimonials();
    } else if (item.name === 'FTCE Practice Tests') {
      setSearchQuery('FTCE');
      setActivePage('catalog');
      setMobileMenuOpen(false);
    } else {
      setActivePage(item.page);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 1. Top Utility Sub-Header Bar (Screenshot 555) */}
      <div style={{
        backgroundColor: '#0c2330',
        color: '#ffffff',
        padding: '8px 24px',
        fontSize: '0.78rem',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '24px',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: '600',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }} className="desktop-only-flex">
        <span style={{ cursor: 'pointer', opacity: 0.95 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.95}>For Teachers</span>
        <span style={{ cursor: 'pointer', opacity: 0.95 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.95}>For Working Scholars®</span>
        <span style={{ cursor: 'pointer', opacity: 0.95 }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.95}>For College Credit</span>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="header-nav" style={{ 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid #d2dbe5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="header-container" style={{ padding: '8px 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Left Side: Hamburger & Logo & Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* Hamburger menu for mobile drawer */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '6px', 
                color: '#1f4e5a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hamburger-menu"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Brand Logo - Styled precisely like PrepSummit.com */}
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => { setActivePage('home'); setSearchQuery(''); }}
            >
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

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '18px', marginLeft: '12px' }}>
              
              {/* Courses Link with Dropdown */}
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('courses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => { setActivePage('catalog'); }}
                  style={{
                    background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px', padding: '16px 0', transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#13809c'}
                  onMouseOut={(e) => e.target.style.color = '#222222'}
                >
                  Courses <ChevronDown size={14} style={{ opacity: 0.7 }} />
                </button>

                {activeDropdown === 'courses' && (
                  <div style={{
                    position: 'absolute', top: '48px', left: 0, width: '250px',
                    backgroundColor: '#ffffff', padding: '12px', zIndex: 999,
                    border: '1px solid #d2dbe5', boxShadow: 'var(--shadow-lg)',
                    borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '10px'
                  }} className="card">
                    <span onClick={() => selectCourseById('ftce-professional-education-test')} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600' }} className="footer-link">Teacher Certification (FTCE PEd)</span>
                    <span onClick={() => selectCourseById('ap-calculus')} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600' }} className="footer-link">Advanced Placement Calculus</span>
                    <span onClick={() => selectCourseById('cell-biology')} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600' }} className="footer-link">College Prep Cell Biology</span>
                    <span onClick={() => selectCourseById('intro-psychology')} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600' }} className="footer-link">Introduction to Psychology</span>
                    <span onClick={() => selectCourseById('macroeconomics')} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600' }} className="footer-link">Macroeconomics & Finance</span>
                  </div>
                )}
              </div>

              {/* FTCE Exams Link with Dropdown */}
              <div 
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('ftce')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); }}
                  style={{
                    background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '4px', padding: '16px 0', transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#13809c'}
                  onMouseOut={(e) => e.target.style.color = '#222222'}
                >
                  FTCE Exams <ChevronDown size={14} style={{ opacity: 0.7 }} />
                </button>

                {activeDropdown === 'ftce' && (
                  <div style={{
                    position: 'absolute', top: '48px', left: 0, width: '280px',
                    backgroundColor: '#ffffff', padding: '12px', zIndex: 999,
                    border: '1px solid #d2dbe5', boxShadow: 'var(--shadow-lg)',
                    borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '10px'
                  }} className="card">
                    <span onClick={() => selectCourseById('ftce-professional-education-test')} style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: '700', color: '#13809c' }} className="footer-link">FTCE Professional Education (PEd)</span>
                    <span onClick={() => { setSearchQuery('FTCE GK'); setActivePage('catalog'); setActiveDropdown(null); }} style={{ cursor: 'pointer', fontSize: '0.88rem' }} className="footer-link">FTCE General Knowledge (GK)</span>
                    <span onClick={() => { setSearchQuery('FTCE Elementary'); setActivePage('catalog'); setActiveDropdown(null); }} style={{ cursor: 'pointer', fontSize: '0.88rem' }} className="footer-link">FTCE Elementary Education</span>
                    <span onClick={() => { setSearchQuery('FTCE Subject'); setActivePage('catalog'); setActiveDropdown(null); }} style={{ cursor: 'pointer', fontSize: '0.88rem' }} className="footer-link">FTCE Subject Area Exams (SAEs)</span>
                  </div>
                )}
              </div>

              {/* FTCE Practice Tests */}
              <button 
                onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); }}
                style={{
                  background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                  fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                  padding: '16px 0', transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = '#13809c'}
                onMouseOut={(e) => e.target.style.color = '#222222'}
              >
                FTCE Practice Tests
              </button>

              {/* FTCE Prep Testimonials */}
              <button 
                onClick={scrollToTestimonials}
                style={{
                  background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                  fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                  padding: '16px 0', transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = '#13809c'}
                onMouseOut={(e) => e.target.style.color = '#222222'}
              >
                FTCE Prep Testimonials
              </button>

            </nav>
          </div>

          {/* Right Side: Log In, Sign Up, and Inline Round Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* Log In Button - White background, thin teal border */}
            <button 
              onClick={() => setActivePage('login')}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #13809c',
                borderRadius: '4px',
                color: '#13809c',
                fontWeight: '700',
                fontSize: '0.88rem',
                padding: '8px 18px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              className="desktop-only"
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(19, 128, 156, 0.04)'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
            >
              Log In
            </button>

            {/* Sign Up Button - Solid Amber */}
            <button 
              onClick={() => setActivePage('signup')}
              style={{
                backgroundColor: '#ffb627',
                border: 'none',
                borderRadius: '4px',
                color: '#222222',
                fontWeight: '800',
                fontSize: '0.88rem',
                padding: '9.5px 20px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(255,182,39,0.15)',
                transition: 'all 0.2s'
              }}
              className="desktop-only"
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

            {/* Inline Round Search Input - Screenshot 555 style */}
            <form onSubmit={handleSearchSubmit} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              position: 'relative',
              width: '210px'
            }} className="desktop-only">
              <input 
                type="text" 
                placeholder="Search Courses & Lessons" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 36px 8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #d2dbe5',
                  fontSize: '0.82rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#222222',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#13809c'}
                onBlur={(e) => e.target.style.borderColor = '#d2dbe5'}
              />
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  position: 'absolute', 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  cursor: 'pointer', 
                  color: '#222222', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: 0
                }}
                aria-label="Search Submit"
              >
                <Search size={14} />
              </button>
            </form>

          </div>

        </div>

        {/* Mobile Drawer (visible when toggle clicked) */}
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
            {/* Search Box for Mobile */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', position: 'relative', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Search Courses & Lessons" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 16px',
                  borderRadius: '20px',
                  border: '1.5px solid #d2dbe5',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#13809c' }}>
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
              <span onClick={() => { setActivePage('catalog'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}>All Courses</span>
              <span onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}>FTCE Exams</span>
              <span onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}>FTCE Practice Tests</span>
              <span onClick={scrollToTestimonials} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}>Testimonials</span>
            </div>

            {/* Mobile Action Buttons */}
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
    </div>
  );
}
