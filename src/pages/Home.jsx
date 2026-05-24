import { useState } from 'react';
import { ChevronRight, ChevronDown, Search, Briefcase, Lightbulb, GraduationCap, ListPlus, Clock } from 'lucide-react';

export default function Home({ 
  courses, 
  setActivePage, 
  setSearchQuery, 
  onSelectCourse 
}) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState('simplified');
  const [activeVideoTab, setActiveVideoTab] = useState('instruction');
  const [activeContentTab, setActiveContentTab] = useState('subjects');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: "var(--font-body)", overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{
        backgroundColor: '#0c2330', /* matches screenshot dark blue */
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 24px 120px 24px',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 68px)'
      }}>
        
        {/* Left Asterisk */}
        <div style={{
          position: 'absolute',
          left: '-80px',
          top: '30%',
          color: '#13809c',
          transform: 'rotate(15deg)',
          zIndex: 1,
          pointerEvents: 'none'
        }} className="desktop-only">
          <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
            <path d="M42 0 h16 v35 l30 -17 l8 14 l-30 17 l30 17 l-8 14 l-30 -17 v35 h-16 v-35 l-30 17 l-8 -14 l30 -17 l-30 -17 l8 -14 l30 17 z" />
          </svg>
        </div>

        {/* Right Asterisk */}
        <div style={{
          position: 'absolute',
          right: '-90px',
          top: '10%',
          color: '#13809c',
          transform: 'rotate(-10deg)',
          zIndex: 1,
          pointerEvents: 'none'
        }} className="desktop-only">
          <svg width="280" height="280" viewBox="0 0 100 100" fill="currentColor">
            <path d="M42 0 h16 v35 l30 -17 l8 14 l-30 17 l30 17 l-8 14 l-30 -17 v35 h-16 v-35 l-30 17 l-8 -14 l30 -17 l-30 -17 l8 -14 l30 17 z" />
          </svg>
        </div>

        {/* Background Bottom Wave/Blob */}
        <div style={{
          position: 'absolute',
          left: '0',
          bottom: '0',
          width: '100%',
          height: '60%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          <svg width="100%" height="100%" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0 }}>
            <path fill="#167a96" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,117.3C672,117,768,171,864,186.7C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 3, width: '100%' }}>
          {/* Centered Headline */}
          <h1 style={{
            color: '#ffffff',
            fontFamily: "var(--font-heading), sans-serif",
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '-0.02em'
          }} className="hero-responsive-text">
            Learn faster. Stay motivated. Study smarter.
          </h1>

          {/* 3 CREAM-COLORED CARDS GRID */}
          <div className="responsive-grid-3">
            
            {/* Card 1: Study for class */}
            <div style={{
              backgroundColor: '#fcfbfa',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px'
            }}>
              <div>
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600" 
                    alt="Study for class" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      color: '#000000', 
                      fontWeight: '800', 
                      marginBottom: '16px',
                      cursor: 'pointer',
                      textDecoration: hoveredCard === 0 ? 'underline' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={() => setHoveredCard(0)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActivePage('catalog')}
                  >
                    Study for class <ChevronRight size={24} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 auto', maxWidth: '300px' }}>
                    Master new concepts with helpful video lessons, practice questions and step-by-step answer explanations.
                  </p>
                </div>
              </div>
              
              {/* Dropdown Box */}
              <div style={{ padding: '0 24px 32px 24px', position: 'relative' }}>
                <select 
                  onChange={() => setActivePage('catalog')}
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '6px',
                    border: '1px solid #d2dbe5',
                    backgroundColor: '#ffffff',
                    color: '#718096',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Explore our programs</option>
                  <option value="ap">AP Courses</option>
                  <option value="college">College Prep</option>
                </select>
                <div style={{ position: 'absolute', right: '40px', top: '18px', pointerEvents: 'none', color: '#718096' }}>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Card 2: Ace your test prep */}
            <div style={{
              backgroundColor: '#fcfbfa',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px'
            }}>
              <div>
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" 
                    alt="Ace your test prep" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      color: '#000000', 
                      fontWeight: '800', 
                      marginBottom: '16px',
                      cursor: 'pointer',
                      textDecoration: hoveredCard === 1 ? 'underline' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={() => setHoveredCard(1)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActivePage('ftce')}
                  >
                    Ace your test prep <ChevronRight size={24} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 auto', maxWidth: '300px' }}>
                    92% pass rate. Prep for 1,500+ exams with custom study guides, practice tests and video lessons.
                  </p>
                </div>
              </div>
              
              {/* Dropdown Box */}
              <div style={{ padding: '0 24px 32px 24px', position: 'relative' }}>
                <select 
                  onChange={() => setActivePage('ftce')}
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '6px',
                    border: '1px solid #d2dbe5',
                    backgroundColor: '#ffffff',
                    color: '#718096',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Explore our programs</option>
                  <option value="ftce">FTCE Professional Education</option>
                  <option value="praxis">Praxis Core</option>
                </select>
                <div style={{ position: 'absolute', right: '40px', top: '18px', pointerEvents: 'none', color: '#718096' }}>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Card 3: Earn college credit */}
            <div style={{
              backgroundColor: '#fcfbfa',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px'
            }}>
              <div>
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600" 
                    alt="Earn college credit" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      color: '#000000', 
                      fontWeight: '800', 
                      marginBottom: '16px',
                      cursor: 'pointer',
                      textDecoration: hoveredCard === 2 ? 'underline' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={() => setHoveredCard(2)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActivePage('catalog')}
                  >
                    Earn college credit <ChevronRight size={24} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 auto', maxWidth: '300px' }}>
                    Save time and money on 220+ upper and lower-division courses and skip what you already know.
                  </p>
                </div>
              </div>
              
              {/* Dropdown Box */}
              <div style={{ padding: '0 24px 32px 24px', position: 'relative' }}>
                <select 
                  onChange={() => setActivePage('catalog')}
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '6px',
                    border: '1px solid #d2dbe5',
                    backgroundColor: '#ffffff',
                    color: '#718096',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Explore our programs</option>
                  <option value="bio">Biology 101</option>
                  <option value="psych">Psychology 101</option>
                </select>
                <div style={{ position: 'absolute', right: '40px', top: '18px', pointerEvents: 'none', color: '#718096' }}>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Card 4: Teach your class */}
            <div style={{
              backgroundColor: '#fcfbfa',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px'
            }}>
              <div>
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1544531586-fde5298cdd43?auto=format&fit=crop&q=80&w=600" 
                    alt="Teach your class" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      color: '#000000', 
                      fontWeight: '800', 
                      marginBottom: '16px',
                      cursor: 'pointer',
                      textDecoration: hoveredCard === 3 ? 'underline' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={() => setHoveredCard(3)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActivePage('catalog')}
                  >
                    Teach your class <ChevronRight size={24} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 auto', maxWidth: '300px' }}>
                    Plan lessons with ease using state-standard-aligned videos and practice for all K-12 subjects.
                  </p>
                </div>
              </div>
              
              {/* Dropdown Box */}
              <div style={{ padding: '0 24px 32px 24px', position: 'relative' }}>
                <select 
                  onChange={() => setActivePage('catalog')}
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '6px',
                    border: '1px solid #d2dbe5',
                    backgroundColor: '#ffffff',
                    color: '#718096',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select subject or resource</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                </select>
                <div style={{ position: 'absolute', right: '40px', top: '18px', pointerEvents: 'none', color: '#718096' }}>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Card 5: Homeschool your child */}
            <div style={{
              backgroundColor: '#fcfbfa',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px'
            }}>
              <div>
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" 
                    alt="Homeschool your child" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      color: '#000000', 
                      fontWeight: '800', 
                      marginBottom: '16px',
                      cursor: 'pointer',
                      textDecoration: hoveredCard === 4 ? 'underline' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={() => setHoveredCard(4)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActivePage('catalog')}
                  >
                    Homeschool your child <ChevronRight size={24} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 auto', maxWidth: '300px' }}>
                    Earn certificates of completion and potential college credit with full 6-12 curriculum.
                  </p>
                </div>
              </div>
              
              {/* Dropdown Box */}
              <div style={{ padding: '0 24px 32px 24px', position: 'relative' }}>
                <select 
                  onChange={() => setActivePage('catalog')}
                  style={{
                    appearance: 'none',
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '6px',
                    border: '1px solid #d2dbe5',
                    backgroundColor: '#ffffff',
                    color: '#718096',
                    fontSize: '0.95rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Select subject or resource</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                </select>
                <div style={{ position: 'absolute', right: '40px', top: '18px', pointerEvents: 'none', color: '#718096' }}>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* Card 6: AI mastery */}
            <div style={{
              backgroundColor: '#fcfbfa',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              minHeight: '440px'
            }}>
              <div>
                {/* Image */}
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600" 
                    alt="AI mastery" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* Body */}
                <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                  <h3 
                    style={{ 
                      fontSize: '1.6rem', 
                      color: '#000000', 
                      fontWeight: '800', 
                      marginBottom: '16px',
                      cursor: 'pointer',
                      textDecoration: hoveredCard === 5 ? 'underline' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onMouseEnter={() => setHoveredCard(5)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setActivePage('catalog')}
                  >
                    AI mastery <ChevronRight size={24} />
                  </h3>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 auto', maxWidth: '300px' }}>
                    Practical AI skills for the modern workforce, with optional college credit available.
                  </p>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '16px auto 0 auto', maxWidth: '300px' }}>
                    Gain the AI skills for the careers of tomorrow.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BLACK BANNER SECTION */}
      <section style={{ backgroundColor: '#000000', padding: '24px', width: '100%', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            style={{ 
              padding: '16px 20px', 
              borderRadius: '6px', 
              border: 'none', 
              width: '100%', 
              maxWidth: '300px', 
              fontSize: '1rem', 
              outline: 'none',
              fontFamily: "var(--font-body)"
            }} 
          />
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <select 
              style={{ 
                appearance: 'none', 
                width: '100%', 
                padding: '16px 20px', 
                borderRadius: '6px', 
                border: 'none', 
                fontSize: '1rem', 
                outline: 'none', 
                color: '#718096', 
                cursor: 'pointer',
                fontFamily: "var(--font-body)"
              }}
            >
              <option value="">What best describes you?</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
            <div style={{ position: 'absolute', right: '16px', top: '16px', pointerEvents: 'none', color: '#718096' }}>
              <ChevronDown size={20} />
            </div>
          </div>
          <button 
            onClick={() => setActivePage('signup')}
            style={{ 
              backgroundColor: '#ffb627', 
              color: '#000000', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '16px 32px', 
              fontSize: '1rem', 
              fontWeight: '800', 
              cursor: 'pointer', 
              whiteSpace: 'nowrap',
              fontFamily: "var(--font-body)",
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#fba919'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffb627'}
          >
            Create an account
          </button>
        </div>
      </section>

      {/* 3. SEARCH SECTION */}
      <section style={{ padding: '60px 24px 20px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          textAlign: 'center',
          background: 'linear-gradient(90deg, #f1f3e6 0%, #e2f5f7 100%)',
          borderRadius: '12px',
          padding: '80px 24px'
        }}>
          <h2 style={{ 
            fontSize: '2.8rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            marginBottom: '36px', 
            letterSpacing: '-0.02em' 
          }}>
            What do you want to learn today?
          </h2>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setActivePage('catalog');
            }}
            style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}
          >
            <div style={{ position: 'absolute', left: '24px', top: '22px', color: '#000000' }}>
              <Search size={24} strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              placeholder="Search Courses & Lessons" 
              style={{ 
                width: '100%', 
                padding: '22px 24px 22px 64px', 
                borderRadius: '8px', 
                border: '1.5px solid #d2dbe5', 
                fontSize: '1.15rem', 
                outline: 'none', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                fontFamily: "var(--font-body)",
                color: '#222222'
              }} 
            />
          </form>
        </div>
      </section>

      {/* 4. ETS OFFICIAL PARTNER SECTION */}
      <section style={{ padding: '20px 24px 60px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: '#fef1dc',
          borderRadius: '12px',
          padding: '60px 24px'
        }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            marginBottom: '16px', 
            letterSpacing: '-0.02em' 
          }}>
            Official Test Prep Provider for Praxis® and TOEFL®
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568', 
            maxWidth: '900px', 
            margin: '0 auto 48px auto',
            lineHeight: '1.5'
          }}>
            We partnered with ETS, the makers of Praxis® and TOEFL® tests, to deliver test prep proven to boost confidence and improve scores.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', flexWrap: 'wrap' }}>
            {/* Praxis Logo and Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 100 100" fill="#000000" style={{ marginRight: '8px' }}>
                  <path d="M42 0 h16 v35 l30 -17 l8 14 l-30 17 l30 17 l-8 14 l-30 -17 v35 h-16 v-35 l-30 17 l-8 -14 l30 -17 l-30 -17 l8 -14 l30 17 z" />
                </svg>
                <span style={{ fontSize: '3.2rem', fontWeight: '800', color: '#000000', letterSpacing: '-0.04em', lineHeight: '1' }}>
                  praxis<sup style={{ fontSize: '1.2rem', fontWeight: '600', position: 'relative', top: '-1.5em' }}>®</sup>
                </span>
              </div>
              <button 
                onClick={() => setActivePage('catalog')}
                style={{
                  backgroundColor: '#9bcff8',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 24px',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#89c5f4'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#9bcff8'}
              >
                Learn more
              </button>
            </div>

            {/* TOEFL Logo and Button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 100 100" fill="#000000" style={{ marginRight: '8px' }}>
                  <path d="M42 0 h16 v35 l30 -17 l8 14 l-30 17 l30 17 l-8 14 l-30 -17 v35 h-16 v-35 l-30 17 l-8 -14 l30 -17 l-30 -17 l8 -14 l30 17 z" />
                </svg>
                <span style={{ fontSize: '3.2rem', fontWeight: '800', color: '#000000', letterSpacing: '-0.04em', lineHeight: '1' }}>
                  toefl<sup style={{ fontSize: '1.2rem', fontWeight: '600', position: 'relative', top: '-1.5em' }}>®</sup>
                </span>
              </div>
              <button 
                onClick={() => setActivePage('catalog')}
                style={{
                  backgroundColor: '#9bcff8',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '12px 24px',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#89c5f4'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#9bcff8'}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AFFORDABLE & FLEXIBLE SECTION */}
      <section style={{ padding: '80px 24px 100px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ 
              fontSize: '2.8rem', 
              color: '#000000', 
              fontFamily: "var(--font-heading), sans-serif", 
              fontWeight: '900', 
              marginBottom: '20px', 
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              The affordable, flexible way to ace your exams, master AI skills, and earn college credit
            </h2>
            <p style={{ 
              fontSize: '1.15rem', 
              color: '#4a5568', 
              maxWidth: '800px', 
              margin: '0 auto' 
            }}>
              Powered by AI, learning science, and expert-created curriculum, built around how people actually learn.
            </p>
          </div>

          {/* AI Skills Mastery Card */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#0c2330', /* Dark blue from hero section */
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            minHeight: '440px'
          }} className="flex-col-reverse-mobile">
            {/* Left Content */}
            <div style={{ flex: '1', padding: '60px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ 
                fontSize: '2.2rem', 
                color: '#ffffff', 
                fontFamily: "var(--font-heading), sans-serif", 
                fontWeight: '900', 
                marginBottom: '16px',
                letterSpacing: '-0.01em'
              }}>
                AI Skills Mastery
              </h3>
              <p style={{ 
                fontSize: '1.15rem', 
                color: '#b5e0f5', /* Light blue subtitle */
                marginBottom: '40px',
                lineHeight: '1.4',
                maxWidth: '300px'
              }}>
                Learn AI skills for the careers of tomorrow.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Briefcase size={24} color="#ffffff" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4' }}>
                    Master the skills employers are hiring for
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Lightbulb size={24} color="#ffffff" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4' }}>
                    Use AI tools reshaping your industry
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <GraduationCap size={24} color="#ffffff" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4' }}>
                    Earn college credit as you build real skills
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <span 
                  onClick={() => setActivePage('catalog')}
                  style={{ 
                    color: '#9bcff8', 
                    fontSize: '1.05rem', 
                    fontWeight: '700', 
                    textDecoration: 'underline', 
                    cursor: 'pointer' 
                  }}
                >
                  Learn more
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div style={{ flex: '1', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" 
                alt="Man studying on laptop" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. IMPACT OF EDUCATION SECTION */}
      <section style={{ padding: '60px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <h2 style={{ 
            fontSize: '2.6rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            textAlign: 'center',
            marginBottom: '48px', 
            letterSpacing: '-0.02em'
          }}>
            Opening the door to the life-changing impact of education
          </h2>

          {/* Top 3 Tabs */}
          <div className="responsive-grid-3" style={{ marginBottom: '40px' }}>
            <button 
              onClick={() => setActiveTab('simplified')}
              style={{
                padding: '24px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'simplified' ? '#13809c' : '#ffffff',
                color: activeTab === 'simplified' ? '#ffffff' : '#13809c',
                border: activeTab === 'simplified' ? '1px solid #13809c' : '1px solid #d2dbe5',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "var(--font-body)"
              }}
            >
              Simplified learning
            </button>
            <button 
              onClick={() => setActiveTab('individualized')}
              style={{
                padding: '24px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'individualized' ? '#13809c' : '#ffffff',
                color: activeTab === 'individualized' ? '#ffffff' : '#13809c',
                border: activeTab === 'individualized' ? '1px solid #13809c' : '1px solid #d2dbe5',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "var(--font-body)"
              }}
            >
              Individualized experience
            </button>
            <button 
              onClick={() => setActiveTab('confidence')}
              style={{
                padding: '24px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'confidence' ? '#13809c' : '#ffffff',
                color: activeTab === 'confidence' ? '#ffffff' : '#13809c',
                border: activeTab === 'confidence' ? '1px solid #13809c' : '1px solid #d2dbe5',
                fontSize: '1.2rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: "var(--font-body)"
              }}
            >
              Confidence-building resources
            </button>
          </div>

          {/* Subheader and Graphic */}
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <div style={{ maxWidth: '700px', position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1.6rem', color: '#000000', fontWeight: '800', marginBottom: '16px' }}>
                Bite-sized video lessons
              </h3>
              <p style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: '1.5' }}>
                Take our short, engaging video lessons on the go. Simplify your learning process by learning anywhere, anytime.
              </p>
            </div>
            
            {/* Decorative Yellow Circles */}
            <div style={{ position: 'absolute', right: '100px', bottom: '-32px', zIndex: 1 }}>
              <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
                <path d="M160 80 A80 80 0 0 0 0 80" fill="#f4b236" />
              </svg>
            </div>
            <div style={{ position: 'absolute', right: '50px', bottom: '10px', zIndex: 1 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                 <circle cx="12" cy="12" r="12" fill="#f4b236" />
              </svg>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Left Decorative Yellow Ellipse (Under the card) */}
            <div style={{ position: 'absolute', left: '15%', bottom: '-40px', zIndex: 1 }}>
              <svg width="300" height="80" viewBox="0 0 300 80" fill="none">
                <path d="M0 0 C 50 80, 250 80, 300 0 Z" fill="#f4b236" />
              </svg>
            </div>

            {/* The Content Card */}
            <div style={{ 
              border: '1px solid #d2dbe5', 
              borderRadius: '12px', 
              padding: '32px',
              backgroundColor: '#ffffff',
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h4 style={{ fontSize: '1.4rem', color: '#000000', fontWeight: '800', marginBottom: '24px' }}>
                Predator & Prey | Overview, Interactions & Types
              </h4>
              
              {/* Inner Tabs */}
              <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #f2f6f9', marginBottom: '24px' }}>
                <button 
                  onClick={() => setActiveVideoTab('instruction')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: '0 0 12px 0', 
                    fontSize: '1.05rem', 
                    fontWeight: '700', 
                    color: activeVideoTab === 'instruction' ? '#000000' : '#13809c', 
                    borderBottom: activeVideoTab === 'instruction' ? '4px solid #000000' : '4px solid transparent',
                    cursor: 'pointer',
                    fontFamily: "var(--font-body)"
                  }}
                >
                  Instruction
                </button>
                <button 
                  onClick={() => setActiveVideoTab('activity')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: '0 0 12px 0', 
                    fontSize: '1.05rem', 
                    fontWeight: '600', 
                    color: activeVideoTab === 'activity' ? '#000000' : '#13809c', 
                    borderBottom: activeVideoTab === 'activity' ? '4px solid #000000' : '4px solid transparent',
                    cursor: 'pointer',
                    fontFamily: "var(--font-body)"
                  }}
                >
                  Activity
                </button>
                <button 
                  onClick={() => setActiveVideoTab('practice')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    padding: '0 0 12px 0', 
                    fontSize: '1.05rem', 
                    fontWeight: '600', 
                    color: activeVideoTab === 'practice' ? '#000000' : '#13809c', 
                    borderBottom: activeVideoTab === 'practice' ? '4px solid #000000' : '4px solid transparent',
                    cursor: 'pointer',
                    fontFamily: "var(--font-body)"
                  }}
                >
                  Practice
                </button>
              </div>

              <div style={{ display: 'flex', gap: '32px' }} className="flex-col-mobile">
                {/* Video Area */}
                <div style={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1544829728-e5cb9eedc20e?auto=format&fit=crop&q=80&w=800" 
                      alt="Cheetah" 
                      style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>
                  {/* Video Footer Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#718096' }}>
                        <ListPlus size={18} />
                        <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Save</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#718096' }}>
                        <Clock size={18} />
                        <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Timeline</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a0aec0' }}>
                        <span style={{ fontSize: '0.95rem' }}>Autoplay</span>
                        <div style={{ width: '40px', height: '22px', borderRadius: '12px', backgroundColor: '#e2e8f0', position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', marginLeft: '4px', color: '#718096' }}>off</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a0aec0' }}>
                        <span style={{ fontSize: '0.95rem' }}>Speed</span>
                        <span style={{ backgroundColor: '#edf2f7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600', color: '#718096' }}>Normal</span>
                      </div>
                    </div>
                    <div style={{ color: '#718096', fontSize: '0.95rem', fontWeight: '500' }}>
                      23K views
                    </div>
                  </div>
                </div>

                {/* Sidebar Playlist Area */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <h5 style={{ fontSize: '1.15rem', color: '#000000', fontWeight: '800', marginBottom: '20px' }}>
                    Biology 101: Intro to Biology
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '430px', paddingRight: '8px' }}>
                    
                    {/* Playlist Item 1 */}
                    <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                        <img 
                          src="https://images.unsplash.com/photo-1596700078839-a8cbf32a5127?auto=format&fit=crop&q=80&w=200" 
                          alt="Thumbnail" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div>
                        <p style={{ color: '#000000', fontSize: '0.95rem', lineHeight: '1.4', margin: 0, fontWeight: '500' }}>
                          Populations: Density, Survivorship and Life H...
                        </p>
                      </div>
                    </div>

                    {/* Playlist Item 2 */}
                    <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                        <img 
                          src="https://images.unsplash.com/photo-1550993540-3372c3dffb74?auto=format&fit=crop&q=80&w=200" 
                          alt="Frog Thumbnail" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div>
                        <p style={{ color: '#000000', fontSize: '0.95rem', lineHeight: '1.4', margin: 0, fontWeight: '500' }}>
                          Survivorship Curve Definition, Types & Exa...
                        </p>
                      </div>
                    </div>

                    {/* Playlist Item 3 */}
                    <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                        <img 
                          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=200" 
                          alt="Leaves Thumbnail" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div>
                        <p style={{ color: '#000000', fontSize: '0.95rem', lineHeight: '1.4', margin: 0, fontWeight: '500' }}>
                          Carrying Capacity | Definition, Graph & Exa...
                        </p>
                      </div>
                    </div>

                    {/* Playlist Item 4 */}
                    <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                        <img 
                          src="https://images.unsplash.com/photo-1428353381622-cba98317a151?auto=format&fit=crop&q=80&w=200" 
                          alt="Forest Thumbnail" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div>
                        <p style={{ color: '#000000', fontSize: '0.95rem', lineHeight: '1.4', margin: 0, fontWeight: '500' }}>
                          Ecological Succession | Definition, Graph & Exa...
                        </p>
                      </div>
                    </div>

                    {/* Playlist Item 5 */}
                    <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}>
                      <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                        <img 
                          src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&q=80&w=200" 
                          alt="Monkey Thumbnail" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div>
                        <p style={{ color: '#000000', fontSize: '0.95rem', lineHeight: '1.4', margin: 0, fontWeight: '500' }}>
                          How Introduced and Invasive Species Alter...
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. REAL PEOPLE BREAKTHROUGHS SECTION */}
      <section style={{ padding: '80px 24px 160px 24px', width: '100%', backgroundColor: '#f4f9f9', position: 'relative', overflow: 'hidden' }}>
        
        {/* Large Decorative Dashed Line SVG Background */}
        <div style={{ position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice">
            <path 
              d="M 150,0 Q 250,250 500,400 T 1200,500" 
              stroke="#00b5ad" 
              strokeWidth="4" 
              strokeDasharray="20 20" 
              strokeLinecap="round" 
              fill="none" 
            />
          </svg>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ 
            fontSize: '2.8rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            letterSpacing: '-0.02em',
            margin: '0 0 80px 0',
            textAlign: 'center'
          }}>
            Real people. Real breakthroughs.
          </h2>

          <div className="responsive-grid-3" style={{ gap: '32px' }}>
            
            {/* Card 1 */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '16px', 
              padding: '40px 32px 60px 32px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              position: 'relative',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ color: '#ffb627', fontSize: '5rem', fontFamily: 'serif', lineHeight: '0.6', alignSelf: 'flex-start', marginBottom: '20px' }}>
                “
              </div>
              <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
                Study.com allowed me to complete my courses in a fraction of the time it took my peers and for a fraction of the cost. I highly recommend their comprehensive programs.
              </p>
              <h4 style={{ color: '#000000', fontSize: '1.2rem', fontWeight: '700', margin: '0' }}>Aimee K.</h4>
              {/* Profile Image Hanging */}
              <div style={{ 
                position: 'absolute', 
                bottom: '-40px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" alt="Aimee K." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 2 */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '16px', 
              padding: '40px 32px 60px 32px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              position: 'relative',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ color: '#ffb627', fontSize: '5rem', fontFamily: 'serif', lineHeight: '0.6', alignSelf: 'flex-start', marginBottom: '20px' }}>
                “
              </div>
              <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
                I always received poor grades in History. Study.com really helped me learn the material and I received my highest CLEP score ever!
              </p>
              <h4 style={{ color: '#000000', fontSize: '1.2rem', fontWeight: '700', margin: '0' }}>Sharla W.</h4>
              {/* Profile Image Hanging */}
              <div style={{ 
                position: 'absolute', 
                bottom: '-40px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt="Sharla W." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: '16px', 
              padding: '40px 32px 60px 32px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              position: 'relative',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ color: '#ffb627', fontSize: '5rem', fontFamily: 'serif', lineHeight: '0.6', alignSelf: 'flex-start', marginBottom: '20px' }}>
                “
              </div>
              <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '32px' }}>
                Study.com is literally the best guide to help you through rigorous class material and will help foster growth within your educational journey.
              </p>
              <h4 style={{ color: '#000000', fontSize: '1.2rem', fontWeight: '700', margin: '0' }}>John W.</h4>
              {/* Profile Image Hanging */}
              <div style={{ 
                position: 'absolute', 
                bottom: '-40px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #ffffff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" alt="John W." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. MEET STUDY AI SECTION */}
      <section style={{ padding: '80px 24px 60px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
              fontSize: '2.8rem', 
              color: '#000000', 
              fontFamily: "var(--font-heading), sans-serif", 
              fontWeight: '900', 
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0'
            }}>
              Meet Study AI
          </h2>
          <p style={{ 
            fontSize: '1.15rem', 
            color: '#4a5568', 
            marginBottom: '40px' 
          }}>
            Your new assistant is here to help you get results! What wonders will you work together?
          </p>

          {/* Chat Box */}
          <div style={{ 
            border: '1px solid #d2dbe5', 
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
            minHeight: '250px'
          }}>
            {/* Top Gradient Border */}
            <div style={{ height: '4px', width: '100%', background: 'linear-gradient(90deg, #13809c 0%, #ffb627 50%, #13809c 100%)' }}></div>
            
            <div style={{ padding: '32px', display: 'flex', gap: '24px' }}>
              {/* Avatar Column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  border: '3px solid #ffb627', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#ffffff'
                }}>
                  {/* Star icon representing AI */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="#0c2330" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6L16.5 13.5L24 16L16.5 18.5L14 26L11.5 18.5L4 16L11.5 13.5L14 6Z" />
                    <path d="M24 6L25 10L29 11L25 12L24 16L23 12L19 11L23 10L24 6Z" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0c2330', marginTop: '8px' }}>Study AI</span>
              </div>
              
              {/* Message Column */}
              <div style={{ paddingTop: '12px' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#000000', fontWeight: '800', margin: '0 0 12px 0' }}>
                  Hi, I’m Study AI. How can I help you today?
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#4a5568', margin: 0 }}>
                  I can help you make the most of
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HIGHER ED TEACHER TEST PREP SECTION */}
      <section style={{ padding: '40px 24px 80px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            minHeight: '440px'
          }} className="flex-col-mobile">
            {/* Left Image */}
            <div style={{ flex: '1.1', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800" 
                alt="Teacher preparing" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
              />
            </div>

            {/* Right Content */}
            <div style={{ flex: '1', padding: '60px 48px', backgroundColor: '#187c94', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ 
                fontSize: '2.2rem', 
                color: '#ffffff', 
                fontFamily: "var(--font-heading), sans-serif", 
                fontWeight: '900', 
                marginBottom: '24px',
                letterSpacing: '-0.01em',
                lineHeight: '1.2'
              }}>
                Higher Ed Teacher Test Prep
              </h3>
              
              <ul style={{ 
                color: '#ffffff', 
                fontSize: '1.05rem', 
                lineHeight: '1.6', 
                paddingLeft: '24px',
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontWeight: '400'
              }}>
                <li>Test prep for Praxis, TExES, FTCE, CSET, and more</li>
                <li>Trusted by hundreds of universities and higher education partners</li>
                <li>Over 92% of students pass their exam</li>
                <li>Practice personalized with AI helps learners focus their time where it matters most</li>
              </ul>

              <div>
                <button 
                  onClick={() => setActivePage('catalog')}
                  style={{ 
                    padding: '12px 32px',
                    backgroundColor: 'transparent',
                    border: '2px solid #ffffff',
                    color: '#ffffff',
                    borderRadius: '6px',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontFamily: "var(--font-body)"
                  }}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EXPLORE OUR CONTENT SECTION */}
      <section style={{ padding: '60px 24px 80px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #d2dbe5', marginBottom: '32px' }}>
            <button 
              onClick={() => setActiveContentTab('subjects')}
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '0 0 16px 0', 
                fontSize: '1.2rem', 
                fontWeight: '700', 
                color: activeContentTab === 'subjects' ? '#0c2330' : '#13809c', 
                borderBottom: activeContentTab === 'subjects' ? '4px solid #0c2330' : '4px solid transparent',
                cursor: 'pointer',
                fontFamily: "var(--font-body)"
              }}
            >
              Subjects
            </button>
            <button 
              onClick={() => setActiveContentTab('courses')}
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '0 0 16px 0', 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                color: activeContentTab === 'courses' ? '#0c2330' : '#13809c', 
                borderBottom: activeContentTab === 'courses' ? '4px solid #0c2330' : '4px solid transparent',
                cursor: 'pointer',
                fontFamily: "var(--font-body)"
              }}
            >
              Courses
            </button>
            <button 
              onClick={() => setActiveContentTab('skills')}
              style={{ 
                background: 'none', 
                border: 'none', 
                padding: '0 0 16px 0', 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                color: activeContentTab === 'skills' ? '#0c2330' : '#13809c', 
                borderBottom: activeContentTab === 'skills' ? '4px solid #0c2330' : '4px solid transparent',
                cursor: 'pointer',
                fontFamily: "var(--font-body)"
              }}
            >
              Skills
            </button>
          </div>

          {/* Grid */}
          <div className="responsive-grid-4">
            {/* Array of Subjects */}
            {[
              { name: 'Art', img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400' },
              { name: 'Business', img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=400' },
              { name: 'Computer Science', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400' },
              { name: 'Teaching', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400' },
              { name: 'English', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400' },
              { name: 'Health & Medicine', img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400' },
              { name: 'History', img: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&q=80&w=400' },
              { name: 'Humanities', img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400' },
              { name: 'Math', img: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?auto=format&fit=crop&q=80&w=400' },
              { name: 'Psychology', img: 'https://images.unsplash.com/photo-1551727974-8af20a3322f1?auto=format&fit=crop&q=80&w=400' },
              { name: 'Science', img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400' },
              { name: 'Social Science', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400' }
            ].map((subject, idx) => (
              <div 
                key={idx}
                onClick={() => setActivePage('catalog')}
                style={{
                  position: 'relative',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  height: '140px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <img 
                  src={subject.img} 
                  alt={subject.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
                {/* Dark overlay for text readability */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(12, 35, 48, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  textAlign: 'center'
                }}>
                  <span style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    {subject.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FEATURED CONTENT SECTION */}
      <section style={{ padding: '60px 24px 80px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '2.4rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            textAlign: 'center',
            marginBottom: '48px',
            letterSpacing: '-0.02em'
          }}>
            Featured content
          </h2>

          <div className="responsive-grid-4" style={{ gap: '24px' }}>
            {/* Column 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['ASWB Test Preparation & Resources', 'Business 106', 'Communications 101', 'English 104', 'HESI Admission Assessment (A2) Ex...', 'Introduction to Communications 101', 'Sociology 101'].map((link, i) => (
                <a key={i} href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'none', lineHeight: '1.4' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a>
              ))}
            </div>
            {/* Column 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Biology 101', 'Business 107', 'Computer Science 102', 'Free Online Courses and Education', 'History 103', 'Math 101', 'Statistics 101'].map((link, i) => (
                <a key={i} href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'none', lineHeight: '1.4' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a>
              ))}
            </div>
            {/* Column 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Business 101', 'Chemistry', 'CSET English', 'GED Test Preparation & Resources', 'HSPT Practice Test', 'Math 108', 'TACHS Practice Test'].map((link, i) => (
                <a key={i} href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'none', lineHeight: '1.4' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a>
              ))}
            </div>
            {/* Column 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Business 104', 'CLEP History of the United States', 'Economics 101', 'Grand Canyon University Transfer', 'Humanities 201', 'Political Science 102', 'Western Governors University Trans...'].map((link, i) => (
                <a key={i} href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'none', lineHeight: '1.4' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. IN THE PRESS SECTION */}
      <section style={{ padding: '60px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.4rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            marginBottom: '48px',
            letterSpacing: '-0.02em'
          }}>
            In the press
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '60px', opacity: 0.8 }}>
            {/* Placeholder styled text for logos */}
            <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#333' }}>abc</span>
            <span style={{ fontSize: '2.5rem', fontFamily: 'serif', fontWeight: '700', color: '#333' }}>Forbes</span>
            <span style={{ fontSize: '2.5rem', fontFamily: 'serif', fontWeight: '700', color: '#333' }}>WSJ</span>
            <span style={{ fontSize: '2.8rem', fontWeight: '900', color: '#333' }}>Inc.</span>
            <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#333' }}>CBS</span>
            <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#333' }}>NBC</span>
          </div>
        </div>
      </section>

      {/* 13. OUR INITIATIVES SECTION */}
      <section style={{ padding: '80px 24px 100px 24px', width: '100%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '2.8rem', 
            color: '#000000', 
            fontFamily: "var(--font-heading), sans-serif", 
            fontWeight: '900', 
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Our Initiatives
          </h2>
          <p style={{ 
            fontSize: '1.15rem', 
            color: '#4a5568', 
            maxWidth: '800px', 
            margin: '0 auto 48px auto',
            lineHeight: '1.5'
          }}>
            We're passionate about initiatives that open the door to the life-changing impact of education for those who need it most.
          </p>

          <div className="responsive-grid-2" style={{ gap: '32px' }}>
            {/* Initiative Card 1 */}
            <div style={{ 
              borderRadius: '8px', 
              overflow: 'hidden', 
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '300px', width: '100%' }}>
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" 
                  alt="Teacher in classroom" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
                {/* Logo Placeholder */}
                <div style={{ 
                  flexShrink: 0, 
                  width: '140px', 
                  height: '64px', 
                  backgroundColor: '#13809c', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: '4px',
                  border: '1px solid #0f6c84'
                }}>
                  <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2', letterSpacing: '0.05em' }}>
                    KEYS TO THE<br/>CLASSROOM
                  </span>
                </div>
                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                    Keys to the Classroom is our initiative that helps combat the teacher shortage across the nation.
                  </p>
                  <a href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'underline' }}>
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            
            {/* Initiative Card 2 */}
            <div style={{ 
              borderRadius: '8px', 
              overflow: 'hidden', 
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '300px', width: '100%' }}>
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?auto=format&fit=crop&q=80&w=800" 
                  alt="Diverse group of people" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '32px', display: 'flex', gap: '24px', alignItems: 'flex-start', flex: 1 }}>
                {/* Logo Placeholder */}
                <div style={{ 
                  flexShrink: 0, 
                  width: '140px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px'
                }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    <div style={{ width: '12px', height: '32px', backgroundColor: '#e53e3e', borderBottomLeftRadius: '4px' }}></div>
                    <div style={{ width: '12px', height: '24px', backgroundColor: '#dd6b20', alignSelf: 'flex-end' }}></div>
                  </div>
                  <span style={{ color: '#000000', fontSize: '0.8rem', fontWeight: '900', lineHeight: '1.1', fontFamily: "var(--font-heading)" }}>
                    WORKING<br/>SCHOLARS
                  </span>
                </div>
                {/* Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                    A new way for working adults and underserved community members to earn a college degree.
                  </p>
                  <a href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'underline' }}>
                    Learn more
                  </a>
                </div>
              </div>
            </div>
            
            {/* Initiative Card 3 (Scholarships) */}
            <div style={{ 
              borderRadius: '8px', 
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              padding: '32px', 
              display: 'flex', 
              gap: '24px', 
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              {/* Logo Placeholder */}
              <div style={{ flexShrink: 0, width: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg width="48" height="32" viewBox="0 0 24 24" fill="none" stroke="#13809c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <div style={{ position: 'relative', width: '100%', marginTop: '4px', textAlign: 'center' }}>
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: '#ffb627', zIndex: 1 }}></div>
                  <span style={{ color: '#13809c', fontSize: '0.8rem', fontWeight: '900', position: 'relative', zIndex: 2, padding: '0 4px', letterSpacing: '0.05em' }}>
                    SCHOLARSHIPS
                  </span>
                </div>
              </div>
              {/* Text Content */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                  We offer over 40 different academic awards and scholarships to help make education more accessible.
                </p>
                <a href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </div>
            </div>

            {/* Initiative Card 4 (Pledge 1%) */}
            <div style={{ 
              borderRadius: '8px', 
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              padding: '32px', 
              display: 'flex', 
              gap: '24px', 
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              {/* Logo Placeholder */}
              <div style={{ flexShrink: 0, width: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#718096', fontSize: '0.9rem', fontWeight: '900', letterSpacing: '0.05em', lineHeight: '1' }}>PLEDGE</span>
                <span style={{ color: '#d69e2e', fontSize: '3.5rem', fontWeight: '900', lineHeight: '0.9' }}>1%</span>
              </div>
              {/* Text Content */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: '#4a5568', fontSize: '1.05rem', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                  We are a proud Pledge 1% partner. Pledge 1% partners are leading organizations committed to making giving back a priority.
                </p>
                <a href="#" style={{ color: '#13809c', fontSize: '1rem', fontWeight: '600', textDecoration: 'underline' }}>
                  Learn more
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 14. UNLOCK YOUR POTENTIAL SECTION */}
      <section style={{ 
        position: 'relative', 
        width: '100%', 
        height: '600px', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <img 
            src="https://images.unsplash.com/photo-1537368910025-702350c1b4e4?auto=format&fit=crop&q=80&w=1600" 
            alt="Smiling man in scrubs" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} 
          />
          {/* Subtle dark overlay for text readability */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' }}></div>
        </div>
        
        {/* Decorative Graphics */}
        <div style={{ position: 'absolute', top: '20%', left: '42%', zIndex: 2 }}>
           {/* Yellow dashes */}
           <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
              <path d="M10,120 L30,110 M20,80 L40,85 M50,40 L60,60 M90,20 L80,45" stroke="#ffb627" strokeWidth="6" strokeLinecap="round"/>
           </svg>
        </div>
        <div style={{ position: 'absolute', top: '15%', right: '15%', zIndex: 1 }}>
           {/* Yellow large arc */}
           <svg width="400" height="600" viewBox="0 0 400 600" fill="none">
              <path d="M0,-50 A 250 250 0 0 1 200 450" stroke="#ffb627" strokeWidth="6" strokeLinecap="round" fill="none"/>
           </svg>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '1100px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
          <div style={{ maxWidth: '400px' }}>
            <h2 style={{ 
              fontSize: '3.5rem', 
              color: '#ffffff', 
              fontFamily: "var(--font-heading), sans-serif", 
              fontWeight: '900', 
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Unlock your potential.
            </h2>
            <p style={{ color: '#ffffff', fontSize: '1.15rem', lineHeight: '1.5', marginBottom: '32px' }}>
              Blaze a trail. Learn something new.<br/>
              Opportunity's knocking. Will you answer?
            </p>
            <button style={{ 
              backgroundColor: '#ffb627', 
              color: '#000000', 
              padding: '14px 32px', 
              borderRadius: '8px', 
              fontSize: '1.1rem', 
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "var(--font-body)"
            }}>
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* 15. FOOTER */}
      <footer style={{ backgroundColor: '#ffffff', padding: '60px 24px 40px 24px', borderTop: '1px solid #e2e8f0', width: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', gap: '32px', marginBottom: '60px' }}>
            
            {/* Column 1: Logo and About */}
            <div style={{ paddingRight: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="white" stroke="#d2dbe5" strokeWidth="2"/>
                  <path d="M15 12L28 20L15 28V12Z" fill="#ffb627"/>
                  <path d="M15 12L22 16L15 28V12Z" fill="#13809c"/>
                </svg>
              </div>
              <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Study.com is a leading online learning platform offering flexible and affordable learning products that help learners earn degrees, certifications, and credentials aligned with real-world outcomes.
              </p>
              {/* BBB Accredited Badge Placeholder */}
              <div style={{ width: '140px', height: '50px', border: '1px solid #13809c', display: 'flex' }}>
                <div style={{ width: '30%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#13809c', fontWeight: 'bold', fontSize: '0.8rem' }}>BBB</span>
                </div>
                <div style={{ width: '70%', backgroundColor: '#13809c', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
                  <span style={{ color: '#ffffff', fontSize: '0.6rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>ACCREDITED<br/>BUSINESS</span>
                </div>
              </div>
            </div>

            {/* Column 2: Plans */}
            <div>
              <h4 style={{ color: '#000000', fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>Plans</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Study Help', 'Test Preparation', 'College Credit', 'Teacher Resources', 'Working Scholars®'].map((link, i) => (
                  <li key={i}><a href="#" style={{ color: '#13809c', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 3: About us */}
            <div>
              <h4 style={{ color: '#000000', fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>About us</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Blog', 'Careers', 'Teach for Us', 'Press Center', 'Ambassador', 'Scholarships'].map((link, i) => (
                  <li key={i}><a href="#" style={{ color: '#13809c', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <h4 style={{ color: '#000000', fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['FAQ', 'Site Feedback', 'Terms of Use', 'Privacy Policy', 'DMCA Notice', 'ADA Compliance', 'Honor Code for Students', 'Resources and Guides'].map((link, i) => (
                  <li key={i}><a href="#" style={{ color: '#13809c', fontSize: '0.9rem', fontWeight: '600', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 5: Mobile Apps */}
            <div>
              <h4 style={{ color: '#000000', fontSize: '1.1rem', fontWeight: '800', marginBottom: '24px' }}>Mobile Apps</h4>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ width: '130px', height: '40px', backgroundColor: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#ffffff', fontSize: '0.7rem' }}>GET IT ON Google Play</span>
                </div>
                <div style={{ width: '130px', height: '40px', backgroundColor: '#000000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#ffffff', fontSize: '0.7rem' }}>Download on the App Store</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #e2e8f0', paddingTop: '32px' }}>
            <div>
              <p style={{ color: '#718096', fontSize: '0.8rem', margin: '0 0 8px 0' }}>
                Contact us by phone at (877) 266-4919, or by mail at 100 View Street #202, Mountain View, CA 94041.
              </p>
              <p style={{ color: '#718096', fontSize: '0.8rem', margin: 0 }}>
                © Copyright 2026 Study.com. All other trademarks and copyrights are the property of their respective owners. All rights reserved.
              </p>
            </div>
            
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>f</div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px' }}>▶</div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>📷</div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>X</div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>in</div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
