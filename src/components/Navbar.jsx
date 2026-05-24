import { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  setHomeActiveTab,
  searchQuery, 
  setSearchQuery, 
  courses,
  onSelectCourse
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const dropdownData = {
    courses: [
      { id: 'ftce-professional-education-test', text: 'Teacher Certification (FTCE PEd)' },
      { id: 'ap-calculus', text: 'Advanced Placement Calculus' },
      { id: 'cell-biology', text: 'College Prep Cell Biology' },
      { id: 'intro-psychology', text: 'Introduction to Psychology' },
      { id: 'macroeconomics', text: 'Macroeconomics & Finance' }
    ],
    subjects: [
      { query: 'Math', text: 'Mathematics' },
      { query: 'Biology', text: 'Biological Sciences' },
      { query: 'Science', text: 'Physical Science' },
      { query: 'English', text: 'English & Writing' },
      { query: 'Finance', text: 'Business & Finance' },
      { query: 'Psychology', text: 'Psychology' }
    ],
    teachers: [
      { query: 'Teacher', text: 'Teacher Resources & Worksheets' },
      { query: 'Lesson', text: 'Lesson Plans & Activities' },
      { query: 'FTCE', text: 'Keys to the Classroom Prep' }
    ],
    certifications: [
      { id: 'ftce-professional-education-test', text: 'FTCE Exams (Teacher Cert)' },
      { query: 'Praxis', text: 'Praxis Test Preparation' },
      { query: 'TOEFL', text: 'TOEFL English Certification' },
      { query: 'CLEP', text: 'CLEP College Credit Exams' }
    ],
    degrees: [
      { query: 'Credit', text: 'Transfer College Credits' },
      { query: 'Scholars', text: 'Working Scholars® Degrees' },
      { query: 'College', text: 'Partner College Programs' }
    ]
  };

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalSearch(searchQuery || '');
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = localSearch.trim().toLowerCase();
    setSearchQuery(localSearch);
    if (query === 'ftce' || query.includes('ftce') || query === 'ped' || query === 'professional education') {
      if (setHomeActiveTab) setHomeActiveTab('Overview');
      setActivePage('ftce');
    } else {
      setActivePage('catalog');
    }
  };

  const selectCourseById = (courseId) => {
    if (!courses) return;
    const found = courses.find(c => c.id === courseId);
    if (found) {
      if (courseId === 'ftce-professional-education-test') {
        if (setHomeActiveTab) setHomeActiveTab('Overview');
        setActivePage('ftce');
      } else if (onSelectCourse) {
        onSelectCourse(found);
      }
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTestimonials = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (setHomeActiveTab) setHomeActiveTab('Overview');
    
    if (activePage !== 'ftce') {
      setActivePage('ftce');
      // Wait for page to render then scroll
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
      }} className="hide-on-mobile">
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
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="show-on-mobile"
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
              
              {/* Plans Link */}
              <button 
                onClick={() => { setActivePage('signup'); }}
                style={{
                  background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                  fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                  padding: '16px 0', transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = '#13809c'}
                onMouseOut={(e) => e.target.style.color = '#222222'}
              >
                Plans
              </button>

              {/* Dynamic Dropdowns based on Study.com categories */}
              {['courses', 'subjects', 'teachers', 'certifications', 'degrees'].map((key) => {
                let label = key.charAt(0).toUpperCase() + key.slice(1);
                if (key === 'degrees') label = 'College Degrees';
                return (
                  <div 
                    key={key}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setActiveDropdown(key)}
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
                      {label} <ChevronDown size={14} style={{ opacity: 0.7 }} />
                    </button>

                    {activeDropdown === key && (
                      <div style={{
                        position: 'absolute', top: '100%', left: 0, width: '280px',
                        backgroundColor: '#ffffff', padding: '8px', zIndex: 999,
                        border: '1px solid #d2dbe5', boxShadow: 'var(--shadow-lg)',
                        borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '4px'
                      }} className="card">
                        {dropdownData[key].map((item, idx) => (
                          <span 
                            key={idx}
                            onClick={() => {
                              if (item.id) {
                                selectCourseById(item.id);
                              } else {
                                setSearchQuery(item.query);
                                if (item.query === 'FTCE') {
                                  setActivePage('ftce');
                                } else {
                                  setActivePage('catalog');
                                }
                              }
                              setActiveDropdown(null);
                            }} 
                            style={{ 
                              cursor: 'pointer', fontSize: '0.86rem', fontWeight: '600', color: '#222222',
                              padding: '8px 12px', borderRadius: '4px', display: 'block', transition: 'all 0.2s'
                            }} 
                            onMouseOver={e => { e.target.style.backgroundColor = 'var(--primary-light)'; e.target.style.color = 'var(--primary)'; }}
                            onMouseOut={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#222222'; }}
                          >
                            {item.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

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

            {/* Toggleable Search Button / Input - Screenshot 555 style */}
            {!showSearchInput ? (
              <button 
                onClick={() => setShowSearchInput(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#13809c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px'
                }}
                className="hide-on-mobile"
                aria-label="Open Search"
              >
                <Search size={20} />
              </button>
            ) : (
              <form onSubmit={handleSearchSubmit} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                width: '210px'
              }} className="hide-on-mobile">
                <input 
                  type="text" 
                  placeholder="Search Courses & Lessons" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '8px 36px 8px 16px',
                    borderRadius: '20px',
                    border: '1.5px solid #13809c',
                    fontSize: '0.82rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#222222',
                    transition: 'border-color 0.2s'
                  }}
                  onBlur={() => {
                    if (!localSearch.trim()) {
                      setShowSearchInput(false);
                    }
                  }}
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
            )}

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
              <span onClick={() => { setSearchQuery('FTCE'); setActivePage('ftce'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}>FTCE Exams</span>
              <span onClick={() => { if (setHomeActiveTab) setHomeActiveTab('Test'); setActivePage('ftce'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}>FTCE Practice Tests</span>
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
