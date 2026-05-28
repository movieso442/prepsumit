import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function Plans({ onStartSignup, setActivePage }) {
  const [selectedTest, setSelectedTest] = useState('Select a test');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const testOptions = [
    'Accuplacer',
    'ACT®',
    'AEPA',
    'AFOQT',
    'ANCC Family Nurse Practitioner',
    'ANCC Adult Gerontology Acute Nurse Care',
    'ANCC Gerontological Nursing',
    'ANCC Adult Gerontology Primary Nurse Care',
    'AP',
    'ASCP',
    'ASP',
    'ASVAB',
    'ASWB',
    'CCM',
    'CCXP',
    'FTCE Professional Education Test',
    'TEAS Test Prep'
  ];

  const handleChoosePlan = (planName, price, test = null) => {
    // Save chosen plan state or pass directly to signup/checkout
    const signupData = {
      planName,
      price,
      selectedTest: test || selectedTest !== 'Select a test' ? test || selectedTest : null
    };
    onStartSignup(signupData);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Plans Section Container */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ========================================================================= */}
        {/* ROW 0: COLLEGE ACCELERATOR (Left Details | Right Visual) */}
        {/* ========================================================================= */}
        <section style={{ display: 'flex', flexWrap: 'wrap', minHeight: '520px', width: '100%' }}>
          {/* Details (Left) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#ffffff', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: '60px 8%',
            boxSizing: 'border-box'
          }}>
            <span style={{ 
              color: '#13809c', 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              College Accelerator
            </span>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: '#1f4e5a', 
              fontWeight: '700', 
              lineHeight: '1.2', 
              marginBottom: '28px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Earn transferable college credit quickly and affordably
            </h2>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Earn real college credit accepted at over 1,500 colleges and universities',
                'Choose from over 300 online courses to fulfill degree requirements',
                'Dynamic visual lessons, practice tests, and custom study plans',
                'Online proctored exams included in your membership',
                '24/7 homework help and academic tutoring support',
                'Save thousands of dollars on college tuition'
              ].map((bullet, idx) => (
                <li key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  fontSize: '0.98rem', 
                  color: '#4a5568', 
                  lineHeight: '1.5' 
                }}>
                  <span style={{ 
                    color: '#ffb627', 
                    fontSize: '1.2rem', 
                    marginRight: '12px', 
                    lineHeight: '1',
                    marginTop: '-2px'
                  }}>■</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '2rem', color: '#13809c', fontWeight: '700' }}>
                $235.00<span style={{ fontSize: '0.95rem', color: '#718096', fontWeight: '400' }}>/month</span>
              </div>
              <button 
                onClick={() => handleChoosePlan('College Accelerator', '$235.00')}
                style={{
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fba919'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffb627'}
              >
                Choose plan
              </button>
            </div>
          </div>

          {/* Visual (Right) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#e8f7fc', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            padding: '60px 40px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#222222', 
              fontWeight: '800', 
              marginBottom: '32px',
              zIndex: 2,
              fontFamily: "'Outfit', sans-serif"
            }}>
              College Accelerator
            </h3>
            
            {/* Visual Container */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
              {/* Blue Cloud Shape Backing */}
              <div style={{
                position: 'absolute',
                top: '5%',
                right: '-10%',
                width: '180px',
                height: '180px',
                backgroundColor: '#33aed0',
                borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                opacity: 0.8,
                zIndex: 1
              }}></div>
              
              {/* Orange Arrow/Chevron Decorator */}
              <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '-12%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}>
                <svg viewBox="0 0 100 100" width="60" height="60" fill="#f97316">
                  <path d="M10 30 L40 50 L10 70 L25 70 L55 50 L25 30 Z" />
                  <path d="M45 30 L75 50 L45 70 L60 70 L90 50 L60 30 Z" opacity="0.7" />
                </svg>
              </div>

              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop&crop=faces" 
                alt="College Accelerator student" 
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  zIndex: 2,
                  border: '4px solid #ffffff'
                }}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 1: TEST PREP (Left Visual | Right Details) */}
        {/* ========================================================================= */}
        <section style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '560px', width: '100%' }}>
          {/* Visual (Left) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#e8f7fc', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            padding: '60px 40px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#222222', 
              fontWeight: '800', 
              marginBottom: '32px',
              zIndex: 2,
              fontFamily: "'Outfit', sans-serif"
            }}>
              Test Prep
            </h3>
            
            {/* Visual Container */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
              {/* Blue Cloud Shape Backing */}
              <div style={{
                position: 'absolute',
                top: '5%',
                right: '-10%',
                width: '180px',
                height: '180px',
                backgroundColor: '#33aed0',
                borderRadius: '50% 50% 30% 70% / 50% 60% 40% 60%',
                opacity: 0.8,
                zIndex: 1
              }}></div>
              
              {/* Orange Arrow/Chevron Decorator */}
              <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '-12%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}>
                <svg viewBox="0 0 100 100" width="60" height="60" fill="#f97316">
                  <path d="M10 30 L40 50 L10 70 L25 70 L55 50 L25 30 Z" />
                  <path d="M45 30 L75 50 L45 70 L60 70 L90 50 L60 30 Z" opacity="0.7" />
                </svg>
              </div>

              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces" 
                alt="Test Prep student" 
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  zIndex: 2,
                  border: '4px solid #ffffff'
                }}
              />
            </div>
          </div>

          {/* Details (Right) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#faf8f0', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: '60px 8%',
            boxSizing: 'border-box'
          }}>
            <span style={{ 
              color: '#13809c', 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Test Prep
            </span>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: '#1f4e5a', 
              fontWeight: '700', 
              lineHeight: '1.2', 
              marginBottom: '28px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Study more effectively and be confident on test day
            </h2>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Full test coverage for realistic exam practice',
                'Unlimited access to 88,000+ test prep video lessons (transcripts included)',
                'Check your knowledge with quizzes and practice tests',
                'Learn on the go with our mobile app'
              ].map((bullet, idx) => (
                <li key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  fontSize: '0.98rem', 
                  color: '#4a5568', 
                  lineHeight: '1.5' 
                }}>
                  <span style={{ 
                    color: '#ffb627', 
                    fontSize: '1.2rem', 
                    marginRight: '12px', 
                    lineHeight: '1',
                    marginTop: '-2px'
                  }}>■</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Test Selection Dropdown */}
            <div style={{ marginBottom: '32px', position: 'relative', maxWidth: '420px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', color: '#4a5568', marginBottom: '8px' }}>
                What test are you preparing for?
              </label>
              
              {/* Custom Styled Select Trigger */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  border: '1.5px solid #d2dbe5',
                  backgroundColor: '#ffffff',
                  borderRadius: '4px',
                  padding: '11px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  color: selectedTest === 'Select a test' ? '#718096' : '#222222'
                }}
              >
                <span>{selectedTest}</span>
                <ChevronDown size={18} style={{ color: '#718096', transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
              </div>

              {/* Dropdown Options List */}
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #d2dbe5',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  zIndex: 10,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.06)'
                }}>
                  {testOptions.map((opt) => (
                    <div 
                      key={opt}
                      onClick={() => {
                        setSelectedTest(opt);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 16px',
                        fontSize: '0.95rem',
                        color: '#4a5568',
                        cursor: 'pointer',
                        backgroundColor: selectedTest === opt ? '#f2f6f9' : '#ffffff',
                        borderBottom: '1px solid #f2f6f9',
                        transition: 'background-color 0.1s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f2f6f9'}
                      onMouseOut={(e) => {
                        if (selectedTest !== opt) {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '2rem', color: '#13809c', fontWeight: '700' }}>
                <span style={{ fontSize: '0.95rem', color: '#718096', fontWeight: '400', marginRight: '6px' }}>From</span>
                $59.99<span style={{ fontSize: '0.95rem', color: '#718096', fontWeight: '400' }}>/month</span>
              </div>
              <button 
                onClick={() => handleChoosePlan('Test Prep', '$59.99')}
                style={{
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fba919'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffb627'}
              >
                Choose plan
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 2: PREMIUM EDITION (Left Details | Right Visual) */}
        {/* ========================================================================= */}
        <section style={{ display: 'flex', flexWrap: 'wrap', minHeight: '580px', width: '100%' }}>
          {/* Details (Left) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#f2f9fb', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: '60px 8%',
            boxSizing: 'border-box'
          }}>
            <span style={{ 
              color: '#13809c', 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Premium Edition
            </span>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: '#1f4e5a', 
              fontWeight: '700', 
              lineHeight: '1.2', 
              marginBottom: '28px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Learning simplified with videos, study tools, and homework help
            </h2>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Unlimited access to over 88,000 video lessons (transcripts included) to help you gain knowledge quickly',
                '24/7 personalized homework help from expert instructors',
                'Check your knowledge with over 60,000 quizzes and practice tests',
                'Access over 2,800,000 step-by-step solutions to difficult homework problems',
                'Learn on the go with our mobile app',
                'Help across all subjects for learners of all ages'
              ].map((bullet, idx) => (
                <li key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  fontSize: '0.98rem', 
                  color: '#4a5568', 
                  lineHeight: '1.5' 
                }}>
                  <span style={{ 
                    color: '#ffb627', 
                    fontSize: '1.2rem', 
                    marginRight: '12px', 
                    lineHeight: '1',
                    marginTop: '-2px'
                  }}>■</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '2rem', color: '#13809c', fontWeight: '700' }}>
                $59.99<span style={{ fontSize: '0.95rem', color: '#718096', fontWeight: '400' }}>/month</span>
              </div>
              <button 
                onClick={() => handleChoosePlan('Premium Edition', '$59.99')}
                style={{
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fba919'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffb627'}
              >
                Choose plan
              </button>
            </div>
          </div>

          {/* Visual (Right) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#faf8f0', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            padding: '60px 40px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#222222', 
              fontWeight: '800', 
              marginBottom: '32px',
              zIndex: 2,
              fontFamily: "'Outfit', sans-serif"
            }}>
              Premium Edition
            </h3>
            
            {/* Visual Container */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
              {/* Blue Cloud Shape Backing */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '-10%',
                width: '180px',
                height: '180px',
                backgroundColor: '#33aed0',
                borderRadius: '30% 70% 70% 30% / 50% 60% 40% 50%',
                opacity: 0.8,
                zIndex: 1
              }}></div>
              
              {/* Orange Arrow/Chevron Decorator */}
              <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '-12%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}>
                <svg viewBox="0 0 100 100" width="60" height="60" fill="#f97316">
                  <path d="M10 30 L40 50 L10 70 L25 70 L55 50 L25 30 Z" />
                  <path d="M45 30 L75 50 L45 70 L60 70 L90 50 L60 30 Z" opacity="0.7" />
                </svg>
              </div>

              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces" 
                alt="Premium Edition student" 
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  zIndex: 2,
                  border: '4px solid #ffffff'
                }}
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROW 3: CLASSROOM TEACHER EDITION (Left Visual | Right Details) */}
        {/* ========================================================================= */}
        <section style={{ display: 'flex', flexWrap: 'wrap-reverse', minHeight: '620px', width: '100%' }}>
          {/* Visual (Left) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#faf8f0', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative',
            padding: '60px 40px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#222222', 
              fontWeight: '800', 
              marginBottom: '32px',
              zIndex: 2,
              fontFamily: "'Outfit', sans-serif"
            }}>
              Teacher Edition
            </h3>
            
            {/* Visual Container */}
            <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
              {/* Blue Cloud Shape Backing */}
              <div style={{
                position: 'absolute',
                top: '5%',
                right: '-10%',
                width: '180px',
                height: '180px',
                backgroundColor: '#33aed0',
                borderRadius: '40% 40% 60% 60% / 50% 50% 50% 50%',
                opacity: 0.8,
                zIndex: 1
              }}></div>
              
              {/* Orange Arrow/Chevron Decorator */}
              <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '-12%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}>
                <svg viewBox="0 0 100 100" width="60" height="60" fill="#f97316">
                  <path d="M10 30 L40 50 L10 70 L25 70 L55 50 L25 30 Z" />
                  <path d="M45 30 L75 50 L45 70 L60 70 L90 50 L60 30 Z" opacity="0.7" />
                </svg>
              </div>

              {/* Main Image */}
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop" 
                alt="Teacher Edition classroom" 
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  zIndex: 2,
                  border: '4px solid #ffffff'
                }}
              />
            </div>
          </div>

          {/* Details (Right) */}
          <div style={{ 
            flex: '1 1 50%', 
            backgroundColor: '#ffffff', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: '60px 8%',
            boxSizing: 'border-box'
          }}>
            <span style={{ 
              color: '#13809c', 
              fontSize: '0.85rem', 
              fontWeight: '800', 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Classroom Teacher Edition
            </span>
            <h2 style={{ 
              fontSize: '2.2rem', 
              color: '#1f4e5a', 
              fontWeight: '700', 
              lineHeight: '1.2', 
              marginBottom: '28px',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Lesson planning and classroom engagement made easy
            </h2>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Unlimited access to over 88,000 video lessons (transcripts included) to show in the classroom',
                '10,000 rich lesson plans, activities, games, and more to supplement your lessons',
                'Create classrooms and assign homework, lessons or quizzes to your students',
                'Printable worksheets, lesson plans and chapter practice exams to use in the classroom',
                'Access Quiz Party, an interactive game that tests students understanding in class',
                'Automatic grading and reporting to track student performance',
                'Google Single Sign-On (SSO)',
                '650 English language learner resources',
                '24/7 access through our mobile app'
              ].map((bullet, idx) => (
                <li key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  fontSize: '0.98rem', 
                  color: '#4a5568', 
                  lineHeight: '1.5' 
                }}>
                  <span style={{ 
                    color: '#ffb627', 
                    fontSize: '1.2rem', 
                    marginRight: '12px', 
                    lineHeight: '1',
                    marginTop: '-2px'
                  }}>■</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '2rem', color: '#13809c', fontWeight: '700' }}>
                $29.99<span style={{ fontSize: '0.95rem', color: '#718096', fontWeight: '400' }}>/month</span>
              </div>
              <button 
                onClick={() => handleChoosePlan('Classroom Teacher Edition', '$29.99')}
                style={{
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '14px 28px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'background-color 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fba919'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffb627'}
              >
                Choose plan
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
