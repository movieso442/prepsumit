import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Star, Check, Search, ArrowRight, Play, FileText, ArrowLeft } from 'lucide-react';

export default function TeasLanding({ 
  onBackToHome, 
  onStartSignup, 
  setActivePage, 
  setSearchQuery, 
  onSelectCourse, 
  courses = [] 
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [activeTab, setActiveTab] = useState('course'); // 'course', 'questions', 'articles'
  
  // Custom dropdowns close when clicking outside
  const headerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setSearchQuery(searchVal);
      setActivePage('search');
    }
  };

  const handleStudyGuideClick = (item) => {
    setActiveDropdown(null);
    setSearchQuery(item);
    setActivePage('search');
  };

  const handleTeasCourseClick = () => {
    const teasCourse = courses.find(c => c.id === 'teas-prep' || c.title.toLowerCase().includes('teas'));
    if (teasCourse) {
      onSelectCourse(teasCourse);
    } else {
      // Fallback to searching TEAS
      setSearchQuery('TEAS');
      setActivePage('search');
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* 1. NURSING CUSTOM HEADER SUB-SITE REPLICA */}
      <header ref={headerRef} style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #d2dbe5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          padding: '8px 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Logo & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            
            {/* Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: '#1f4e5a'
              }}
              className="show-on-mobile"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={onBackToHome}
            >
              <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15 L85 50 L15 85 Z" fill="#13809c" />
                <path d="M15 15 L50 50 L15 85 Z" fill="#1f4e5a" opacity="0.3" />
                <path d="M50 50 L85 50 L15 85 Z" fill="#ffb627" />
              </svg>
              <span style={{ fontSize: '1.45rem', fontWeight: '800', color: '#1f4e5a', letterSpacing: '-0.03em' }}>
                PrepSumit<span style={{ color: '#ffb627' }}>.com</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#007791', marginLeft: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nursing</span>
              </span>
            </div>

            {/* Links */}
            <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span 
                onClick={() => setActivePage('plans')}
                style={{ fontSize: '0.92rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}
              >
                Plans
              </span>

              {/* Study Guides Dropdown */}
              <div style={{ position: 'relative' }}>
                <span 
                  onClick={() => setActiveDropdown(activeDropdown === 'guides' ? null : 'guides')}
                  style={{ fontSize: '0.92rem', fontWeight: '700', color: '#222222', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  Study Guides <ChevronDown size={14} style={{ opacity: 0.7 }} />
                </span>
                {activeDropdown === 'guides' && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: '12px',
                    backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: '6px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)', width: '280px', padding: '16px', zIndex: 1000
                  }}>
                    <strong style={{ fontSize: '0.78rem', color: '#718096', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Popular</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '12px' }}>
                      {['NCLEX', 'HESI A2', 'TEAS'].map(guide => (
                        <div 
                          key={guide} 
                          onClick={() => handleStudyGuideClick(guide)}
                          style={{ fontSize: '0.92rem', fontWeight: '700', color: '#007791', cursor: 'pointer', textDecoration: 'none' }}
                          onMouseOver={e => e.target.style.textDecoration = 'underline'}
                          onMouseOut={e => e.target.style.textDecoration = 'none'}
                        >
                          {guide}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px' }}>
                      {['ACCNS-AG', 'ACNPC-AG', 'A-GNP', 'CEN', 'CNE', 'KAPLAN', 'NLN', 'PCCN', 'TCRN'].map(guide => (
                        <span 
                          key={guide} 
                          onClick={() => handleStudyGuideClick(guide)}
                          style={{ fontSize: '0.85rem', fontWeight: '600', color: '#4a5568', cursor: 'pointer' }}
                          onMouseOver={e => e.target.style.color = '#13809c'}
                          onMouseOut={e => e.target.style.color = '#4a5568'}
                        >
                          {guide}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* TEAS Exams Dropdown */}
              <div style={{ position: 'relative' }}>
                <span 
                  onClick={() => setActiveDropdown(activeDropdown === 'exams' ? null : 'exams')}
                  style={{ fontSize: '0.92rem', fontWeight: '700', color: '#222222', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  TEAS Exams <ChevronDown size={14} style={{ opacity: 0.7 }} />
                </span>
                {activeDropdown === 'exams' && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: '12px',
                    backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: '6px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)', width: '220px', padding: '12px', zIndex: 1000,
                    display: 'flex', flexDirection: 'column', gap: '10px'
                  }}>
                    {['TEAS Test Prep', 'TEAS Math', 'TEAS Science', 'TEAS English', 'TEAS Reading'].map(exam => (
                      <span 
                        key={exam} 
                        onClick={() => handleStudyGuideClick(exam)}
                        style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4a5568', cursor: 'pointer' }}
                        onMouseOver={e => e.target.style.color = '#13809c'}
                        onMouseOut={e => e.target.style.color = '#4a5568'}
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <span 
                onClick={onStartSignup}
                style={{ fontSize: '0.92rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}
              >
                TEAS Practice Test
              </span>

              <a 
                href="#testimonials-block"
                style={{ fontSize: '0.92rem', fontWeight: '700', color: '#222222', cursor: 'pointer' }}
              >
                TEAS Prep Testimonials
              </a>
            </nav>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setActivePage('login')}
              style={{
                backgroundColor: '#ffffff', border: '1.5px solid #13809c', borderRadius: '4px',
                color: '#13809c', fontWeight: '700', fontSize: '0.88rem', padding: '8px 16px', cursor: 'pointer'
              }}
              className="desktop-only"
            >
              Log In
            </button>
            <button 
              onClick={onStartSignup}
              style={{
                backgroundColor: '#ffb627', border: 'none', borderRadius: '4px',
                color: '#222222', fontWeight: '800', fontSize: '0.88rem', padding: '9.5px 18px', cursor: 'pointer'
              }}
            >
              Sign Up
            </button>

            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '180px' }} className="desktop-only">
              <input 
                type="text" 
                placeholder="Search Courses & Lessons" 
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                style={{
                  width: '100%', padding: '6px 30px 6px 12px', borderRadius: '20px',
                  border: '1.5px solid #d2dbe5', fontSize: '0.8rem', outline: 'none'
                }}
              />
              <button type="submit" style={{ background: 'none', border: 'none', position: 'absolute', right: '10px', cursor: 'pointer', color: '#718096' }}>
                <Search size={14} />
              </button>
            </form>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#ffffff', borderTop: '1px solid #d2dbe5', padding: '16px 24px',
            display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <span onClick={() => { setActivePage('plans'); setMobileMenuOpen(false); }} style={{ fontWeight: '700', color: '#222222', cursor: 'pointer' }}>Plans</span>
            <span onClick={() => { handleStudyGuideClick('TEAS'); setMobileMenuOpen(false); }} style={{ fontWeight: '700', color: '#222222', cursor: 'pointer' }}>TEAS Exams</span>
            <span onClick={() => { onStartSignup(); setMobileMenuOpen(false); }} style={{ fontWeight: '700', color: '#222222', cursor: 'pointer' }}>TEAS Practice Test</span>
            <span onClick={() => { setActivePage('login'); setMobileMenuOpen(false); }} style={{ fontWeight: '700', color: '#13809c', cursor: 'pointer' }}>Log In</span>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #0e3036 0%, #13444f 100%)',
        color: '#ffffff',
        padding: '64px 24px',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          alignItems: 'center'
        }} className="course-detail-layout-grid">
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffb627', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              TEAS Exam Preparation
            </span>
            <h1 style={{ fontSize: '2.6rem', fontWeight: '900', color: '#ffffff', lineHeight: '1.15', margin: 0 }}>
              Prepare for your Test of Essential Academic Skills (TEAS) all in one place
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#e2e8f0', lineHeight: '1.5', margin: 0, opacity: 0.95 }}>
              From learning details about the exam to preparing with practice tests and courses, everything you need to pass the TEAS Test, you'll find here.
            </p>
            <div style={{ marginTop: '8px' }}>
              <button 
                onClick={onStartSignup}
                style={{
                  backgroundColor: '#ffb627', color: '#222222', border: 'none', borderRadius: '4px',
                  fontWeight: '800', fontSize: '1rem', padding: '14px 32px', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255,182,39,0.25)', transition: 'all 0.2s'
                }}
                onMouseOver={e => e.target.style.transform = 'translateY(-1px)'}
                onMouseOut={e => e.target.style.transform = 'none'}
              >
                Try it risk-free
              </button>
            </div>
          </div>

          {/* Right Column: Smiling Nurse Profile */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              width: '100%',
              maxWidth: '360px',
              height: '320px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
              border: '4px solid rgba(255,255,255,0.1)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80" 
                alt="TEAS exam prep specialist nurse smiling" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TAKE TEAS EXAM WITH CONFIDENCE BANNER (Screenshot 2) */}
      <section style={{ backgroundColor: '#ffffff', padding: '40px 24px 20px 24px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#fff6f3',
          border: '1px solid #ffdcd3',
          borderRadius: '8px',
          padding: '24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1f4e5a', margin: 0 }}>
              Take the TEAS exam with confidence
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#4a5568', margin: 0 }}>
              Try our test prep resources risk-free today and achieve the test score you want
            </p>
          </div>
          <div>
            <button 
              onClick={onStartSignup}
              style={{
                backgroundColor: '#ffb627', color: '#222222', border: 'none', borderRadius: '4px',
                fontWeight: '850', fontSize: '0.92rem', padding: '12px 24px', cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(255,182,39,0.1)'
              }}
            >
              Start your TEAS prep
            </button>
          </div>
        </div>
      </section>

      {/* 4. RESOURCES TABS GRID (Screenshot 2) */}
      <section style={{ backgroundColor: '#ffffff', padding: '32px 24px 64px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <h2 style={{ 
            fontSize: '1.95rem', 
            fontWeight: '900', 
            color: '#111111', 
            textAlign: 'center', 
            margin: '0 auto',
            maxWidth: '700px',
            lineHeight: '1.2'
          }}>
            View all available TEAS (Test of Essential Academic Skills) resources
          </h2>

          {/* Pill Outline Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { id: 'course', text: '1 TEAS Course' },
              { id: 'questions', text: '800+ TEAS Practice Test Questions' },
              { id: 'articles', text: 'TEAS Articles' }
            ].map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: active ? '#007791' : '#ffffff',
                    border: '2px solid #007791',
                    borderRadius: '6px',
                    color: active ? '#ffffff' : '#007791',
                    fontSize: '0.9rem',
                    fontWeight: '750',
                    padding: '10px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {tab.text}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          <div style={{ marginTop: '16px' }}>
            {activeTab === 'course' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }} className="course-detail-layout-grid">
                
                {/* Left Card: TEAS Course */}
                <div 
                  onClick={handleTeasCourseClick}
                  style={{
                    backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: '8px',
                    overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s', display: 'flex', flexDirection: 'column'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{ height: '170px', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=80" 
                      alt="Doctors discussing medical chart" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#007791', margin: 0 }}>
                      TEAS Test Prep | Test of Essential Academic Skills Exam
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#718096' }}>Subject: Nursing Exams</span>
                  </div>
                </div>

                {/* Right Card: Scholarship */}
                <div 
                  onClick={onStartSignup}
                  style={{
                    backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: '8px',
                    overflow: 'hidden', cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s', display: 'grid', gridTemplateColumns: '1fr 1fr'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  className="catalog-course-card-grid"
                >
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111111', margin: 0, lineHeight: '1.2' }}>
                      PrepSumit.com TEAS Scholarship
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: '#4a5568', margin: 0, lineHeight: '1.5' }}>
                      Take advantage of PrepSumit.com's TEAS exam scholarship. Apply today for a chance to win.
                    </p>
                  </div>
                  <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&auto=format&fit=crop&q=80" 
                      alt="Students studying with laptops" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'questions' && (
              <div style={{
                backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: '8px',
                padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1f4e5a', margin: 0 }}>
                  Practice Test Questions Directory
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#4a5568', margin: 0 }}>
                  Simulate test day with our comprehensive practice sets. Check your knowledge across all four key TEAS subtests.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '8px' }}>
                  {['TEAS Math Practice Test', 'TEAS Science Practice Test', 'TEAS English Practice Test', 'TEAS Reading Practice Test'].map((testName, i) => (
                    <div 
                      key={i}
                      onClick={onStartSignup}
                      style={{ padding: '16px', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', hover: { borderColor: '#13809c' } }}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#13809c'}
                      onMouseOut={e => e.currentTarget.style.borderColor = '#cbd5e1'}
                    >
                      <strong style={{ fontSize: '0.9rem', color: '#007791', display: 'block', marginBottom: '6px' }}>{testName}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#718096' }}>150+ Questions • Detailed Explanations</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'articles' && (
              <div style={{
                backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: '8px',
                padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'
              }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1f4e5a', margin: 0 }}>
                  TEAS Exam Registration & Information Hub
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { t: 'What is a Good TEAS Score?', d: 'Learn about scoring structures, passing benchmarks, and average requirements for nursing programs.' },
                    { t: 'How to Register for the TEAS Exam', d: 'Step-by-step candidate guide covering registration portals, test dates, and fee schedules.' },
                    { t: 'TEAS Test Checklist & What to Bring', d: 'Be prepared for exam day. View the complete list of accepted ID cards, calculator rules, and test center policies.' }
                  ].map((art, i) => (
                    <div 
                      key={i} 
                      onClick={onStartSignup}
                      style={{ padding: '12px 0', borderBottom: i < 2 ? '1px solid #e2e8f0' : 'none', cursor: 'pointer' }}
                    >
                      <strong style={{ fontSize: '0.95rem', color: '#007791', display: 'block' }} onMouseOver={e => e.target.style.textDecoration = 'underline'} onMouseOut={e => e.target.style.textDecoration = 'none'}>{art.t}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#4a5568', marginTop: '2px', display: 'block' }}>{art.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TEAS Exams Header Section */}
          <div style={{ marginTop: '24px', borderTop: '1px solid #e2e8f0', paddingTop: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '850', color: '#111111', margin: '0 0 16px 0' }}>
              TEAS Exams
            </h3>
            <div 
              onClick={handleTeasCourseClick}
              style={{ display: 'flex', gap: '14px', alignItems: 'center', cursor: 'pointer', maxWidth: '400px' }}
            >
              <div style={{ width: '90px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80" 
                  alt="TEAS course" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <strong 
                  style={{ fontSize: '0.92rem', color: '#007791', display: 'block' }} 
                  onMouseOver={e => e.target.style.textDecoration = 'underline'} 
                  onMouseOut={e => e.target.style.textDecoration = 'none'}
                >
                  TEAS Test Prep | Test of Essential Academic Skills Exam
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#718096', display: 'block', marginTop: '2px' }}>Video Course & Practice Tests</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHAT OUR STUDENTS ARE SAYING TESTIMONIALS BLOCK (Screenshot 3) */}
      <section id="testimonials-block" style={{ backgroundColor: '#fcfdfd', borderTop: '1px solid #f2f6f8', padding: '64px 24px 80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
          
          <h2 style={{ fontSize: '1.95rem', fontWeight: '900', color: '#111111', textAlign: 'center', margin: 0 }}>
            What our students are saying
          </h2>

          {/* Testimonial Cards Layout */}
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '16px', position: 'relative', alignItems: 'stretch' }} className="testimonials-row">
            
            {/* Card 1 */}
            <div style={{
              flex: '1 0 260px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.5', margin: 0, fontStyle: 'normal' }}>
                "I have completed my TEAS exam and did very well. Thank you!"
              </p>
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e28743', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                    AS
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#222222', display: 'block' }}>Anne S.</strong>
                    <span style={{ fontSize: '0.78rem', color: '#718096', display: 'block' }}>Student, Downingtown, Pennsylvania</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#00b67a', fontWeight: '700' }}>
                  <span style={{ color: '#00b67a', fontSize: '12px' }}>✔</span> Completed TEAS exam
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              flex: '1 0 260px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.5', margin: 0, fontStyle: 'normal' }}>
                "Your course material was extremely helpful in my ability to make a passing grade on the TEAS test. I will certainly keep this website in mind next time the need arises."
              </p>
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2b90b8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                    JG
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#222222', display: 'block' }}>Jessica G.</strong>
                    <span style={{ fontSize: '0.78rem', color: '#718096', display: 'block' }}>Student</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#00b67a', fontWeight: '700' }}>
                  <span style={{ color: '#00b67a', fontSize: '12px' }}>✔</span> Completed TEAS exam
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              flex: '1 0 260px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.5', margin: 0, fontStyle: 'normal' }}>
                "You helped me pass my math HESI. I have never been able to do that before."
              </p>
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e2b13c', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                    NB
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#222222', display: 'block' }}>Natalie B.</strong>
                    <span style={{ fontSize: '0.78rem', color: '#718096', display: 'block' }}>Student</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#00b67a', fontWeight: '700' }}>
                  <span style={{ color: '#00b67a', fontSize: '12px' }}>✔</span> Passed Math HESI
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div style={{
              flex: '1 0 260px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px',
              padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.5', margin: 0, fontStyle: 'normal' }}>
                "You offer a very wide variety of material. I am taking the HESI and think my experience here is going to help a great deal!"
              </p>
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#3ea2a2', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                    TL
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: '#222222', display: 'block' }}>Trisha L.</strong>
                    <span style={{ fontSize: '0.78rem', color: '#718096', display: 'block' }}>Student, Taylor, Michigan</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#00b67a', fontWeight: '700' }}>
                  <span style={{ color: '#00b67a', fontSize: '12px' }}>✔</span> Passed HESI
                </div>
              </div>
            </div>

            {/* Next Arrow Button overlaying on right side */}
            <button 
              onClick={() => alert("Simulated: sliding next testimonials.")}
              style={{
                position: 'absolute', right: '-12px', top: '50%', transform: 'translateY(-50%)',
                width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#007791', color: '#ffffff',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 10
              }}
              aria-label="Next Testimonials"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </section>

      {/* 6. RISK-FREE CALLOUT BANNER (Screenshot 3) */}
      <section style={{
        backgroundColor: '#0b2c34',
        color: '#ffffff',
        padding: '60px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#ffffff', margin: 0 }}>
            Try it risk-free
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', margin: '0 0 12px 0' }}>
            Try it risk-free today! No obligation, cancel anytime.
          </p>
          <button 
            onClick={onStartSignup}
            style={{
              backgroundColor: '#ffb627', color: '#222222', border: 'none', borderRadius: '4px',
              fontWeight: '850', fontSize: '0.98rem', padding: '14px 36px', cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(255,182,39,0.15)'
            }}
          >
            Try us risk-free
          </button>
        </div>
      </section>

      {/* 7. FEATURED ON PRESS LOGOS (Screenshot 4) */}
      <section style={{ backgroundColor: '#ffffff', padding: '56px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px', alignItems: 'center' }}>
          
          <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#222222', margin: 0, textTransform: 'none' }}>
            PrepSumit.com has been featured on:
          </h4>

          {/* Logos grid */}
          <div style={{
            display: 'flex', justifyItems: 'center', justifyContent: 'center', alignItems: 'center',
            gap: '36px 48px', flexWrap: 'wrap', opacity: 0.85
          }}>
            <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#000000', fontFamily: 'Impact, sans-serif' }}>CBS</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#000000', letterSpacing: '-1.5px', fontFamily: 'serif' }}>NBC</span>
            <span style={{ fontSize: '1.45rem', fontWeight: '800', color: '#000000', fontFamily: "'Outfit', sans-serif" }}>Forbes</span>
            <span style={{ fontSize: '1.55rem', fontWeight: '900', color: '#000000', fontFamily: 'sans-serif' }}>abc</span>
            <span style={{ fontSize: '1.85rem', fontWeight: '950', color: '#000000', fontFamily: 'Impact, sans-serif', letterSpacing: '-0.5px' }}>Inc.</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#000000', fontFamily: 'serif' }}>WSJ</span>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: '#000000', border: '2px solid #000000', padding: '1px 6px', fontFamily: 'serif' }}>U.S.News</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#000000', textTransform: 'uppercase', fontStyle: 'italic' }}>USA TODAY</span>
          </div>

          <span style={{ fontSize: '0.78rem', color: '#718096', marginTop: '16px' }}>
            *Percentages come from surveys of over 300 test prep customers
          </span>

        </div>
      </section>

    </div>
  );
}
