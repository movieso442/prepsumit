import { useState } from 'react';
import { Check, Star, Play, FileText, Users, Award, ShieldCheck, ChevronRight, HelpCircle } from 'lucide-react';

export default function CategoryLanding({ category, courses, onSelectCourse, onStartSignup, onBackToHome }) {
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);
  // Find courses matching this category
  const getFilteredCourses = () => {
    if (category.startsWith('subject-')) {
      const subj = category.split('-')[1]; // math, science, english, business, humanities
      return courses.filter(c => {
        const titleAndSubj = (c.title + ' ' + c.subject).toLowerCase();
        if (subj === 'math') return titleAndSubj.includes('math') || titleAndSubj.includes('calculus') || titleAndSubj.includes('algebra');
        if (subj === 'science') return titleAndSubj.includes('biology') || titleAndSubj.includes('science');
        if (subj === 'english') return titleAndSubj.includes('english') || titleAndSubj.includes('composition') || titleAndSubj.includes('writing');
        if (subj === 'business') return titleAndSubj.includes('business') || titleAndSubj.includes('macroeconomics') || titleAndSubj.includes('finance');
        if (subj === 'humanities') return titleAndSubj.includes('psychology') || titleAndSubj.includes('history') || titleAndSubj.includes('humanities');
        return false;
      });
    }

    if (category === 'college-credit') {
      return courses.filter(c => 
        c.level === 'College Prep' || 
        c.level === 'Advanced Placement' || 
        c.id === 'working-scholars-intro'
      );
    }

    if (category === 'teacher-resources') {
      return courses.filter(c => 
        c.level === 'Teacher Certification' || 
        c.id === 'lesson-planning-101'
      );
    }

    if (category === 'homeschool') {
      return courses.filter(c => 
        c.level === 'Advanced Placement' || 
        c.level === 'College Prep' ||
        c.subject === 'Science' || 
        c.subject === 'Mathematics'
      );
    }

    return courses;
  };

  const matchedCourses = getFilteredCourses();

  // Get dynamic meta-information based on the landing category type
  const getLandingData = () => {
    switch (category) {
      case 'college-credit':
        return {
          title: "Earn Affordable & Transferable College Credits",
          subtitle: "Skip expensive introductory courses. Study online at your own pace and transfer credits to over 1,500 colleges and universities.",
          heroBg: "linear-gradient(135deg, #0c2330 0%, #153e54 100%)",
          accentColor: "#ffb627",
          stats: [
            { label: "Transfer Partners", value: "1,500+" },
            { label: "ACE/NCCRS Courses", value: "220+" },
            { label: "Tuition Savings", value: "Up to 90%" }
          ],
          features: [
            "ACE & NCCRS recommended course credits accepted nationally",
            "Self-paced learning with expert video lessons and practice tests",
            "Proctored online exams that you can take directly from home",
            "Seamless transcript delivery straight to your target university"
          ],
          testimonials: [
            { quote: "PrepSumit allowed me to earn 15 credits in just two months and transfer them directly to my state university. I saved over $7,000!", author: "Sarah K., Business Student" },
            { quote: "The videos are short, engaging, and directly aligned with the final exams. Transferring credits was incredibly straightforward.", author: "James L., Working Adult" }
          ]
        };
      case 'teacher-resources':
        return {
          title: "Engage Your Classroom with State-Aligned Resources",
          subtitle: "Plan standard-compliant K-12 lessons with ease using educational videos, printable worksheets, and interactive quizzes.",
          heroBg: "linear-gradient(135deg, #0f343a 0%, #1a5660 100%)",
          accentColor: "#ffb627",
          stats: [
            { label: "K-12 Video Lessons", value: "85,000+" },
            { label: "Printable Worksheets", value: "10,000+" },
            { label: "Standards Aligned", value: "100%" }
          ],
          features: [
            "Search for lessons aligned to common core and individual state standard codes",
            "Assign self-grading quizzes and video homework directly to your student rosters",
            "Ready-made classroom worksheets, activity plans, and slideshow presentations",
            "Keys to the Classroom initiative helping teachers clear licensure exams easily"
          ],
          testimonials: [
            { quote: "My students love the short animated videos. They understand difficult concepts much quicker, and my lesson prep time was cut in half!", author: "Mrs. Davis, 7th Grade Science Teacher" }
          ]
        };
      case 'homeschool':
        return {
          title: "Complete Online Homeschool Curriculum for Grades 6-12",
          subtitle: "Empower your child with structured, high-quality video courses, progress tracking dashboards, and customizable learning schedules.",
          heroBg: "linear-gradient(135deg, #2b1f3c 0%, #44315e 100%)",
          accentColor: "#ffb627",
          stats: [
            { label: "Accredited Pathways", value: "Full 6-12" },
            { label: "Parent Progress Portals", value: "Real-time" },
            { label: "Student Satisfaction", value: "96%" }
          ],
          features: [
            "Comprehensive textbooks and courses covering math, science, history, and English",
            "Automatic grading and parent reports to comply with state homeschooling files",
            "Option to earn transferable college credit while still in high school",
            "Self-paced instruction perfect for student athletes and accelerated learners"
          ],
          testimonials: [
            { quote: "This curriculum was a lifesaver for our family. My daughter could learn independently, and I could track her progress in seconds.", author: "Robert G., Parent" }
          ]
        };
      default: // Subjects (subject-math, subject-science, etc.)
        const subjName = category.split('-')[1];
        const formattedSubj = subjName.charAt(0).toUpperCase() + subjName.slice(1);
        return {
          title: `Master ${formattedSubj} Courses & Concepts`,
          subtitle: `Boost your grades, study for AP exams, or prep for college classes with PrepSumit.com-aligned visual guides and adaptive practice questions.`,
          heroBg: "linear-gradient(135deg, #13809c 0%, #1f4e5a 100%)",
          accentColor: "#ffb627",
          stats: [
            { label: "Expert Instructors", value: "Top Tier" },
            { label: "Interactive Questions", value: "Thousands" },
            { label: "Average Grade Boost", value: "1 letter" },
          ],
          features: [
            `Detailed micro-lessons breaking down complicated ${formattedSubj} formulas`,
            "Step-by-step written answers and video walkthroughs for every problem",
            "Chapter tests and diagnostic feedback to focus your study time",
            "Earn certificates of completion to boost your college resume"
          ],
          testimonials: [
            { quote: `The explanation for each question is what makes this stand out. I went from failing my quizzes to a solid A!`, author: `David M., ${formattedSubj} Scholar` }
          ]
        };
    }
  };

  const landingData = getLandingData();

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '60px' }}>
      
      {/* 1. HERO BANNER */}
      <section style={{
        background: landingData.heroBg,
        color: '#ffffff',
        padding: '80px 24px',
        borderRadius: '12px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative circles */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}></div>

        <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.15', fontFamily: 'var(--font-heading)', letterSpacing: '-0.02em' }}>
            {landingData.title}
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: '1.5', maxWidth: '720px', margin: '0 auto' }}>
            {landingData.subtitle}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }} className="flex-col-mobile">
            <button 
              onClick={onStartSignup}
              style={{
                backgroundColor: landingData.accentColor,
                color: '#222222',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '800',
                fontSize: '1.05rem',
                padding: '14px 32px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                transition: 'transform 0.15s'
              }}
              onMouseOver={e => e.target.style.transform = 'translateY(-1px)'}
              onMouseOut={e => e.target.style.transform = 'none'}
            >
              Start Risk-FREE Trial
            </button>
            <button 
              onClick={onBackToHome}
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                borderRadius: '4px',
                fontWeight: '700',
                fontSize: '1.05rem',
                padding: '12px 28px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'}
              onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS ROW */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          backgroundColor: '#ffffff',
          border: '1.5px solid #d2dbe5',
          borderRadius: '8px',
          padding: '32px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)'
        }} className="flex-col-mobile">
          {landingData.stats.map((stat, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px',
              borderRight: idx < 2 ? '1px solid #e2e8f0' : 'none'
            }} className="no-border-mobile">
              <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary-dark)', lineHeight: '1' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VALUE PROPOSITION & BENEFITS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'center' }} className="flex-col-mobile">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#1f4e5a', fontWeight: '900', fontFamily: 'var(--font-heading)' }}>
            Why Students Excel on PrepSumit
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {landingData.features.map((feature, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, fontWeight: '600' }}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Side Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {landingData.testimonials.map((test, idx) => (
            <div key={idx} className="card" style={{ padding: '28px', borderLeft: '4px solid var(--primary)', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', gap: '2px', color: '#ffb627', marginBottom: '14px' }}>
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#ffb627" stroke="#ffb627" />)}
              </div>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '16px' }}>
                "{test.quote}"
              </p>
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                — {test.author}
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAPPED ALIGNED COURSES CATALOG */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '2rem', color: '#1f4e5a', fontWeight: '900', fontFamily: 'var(--font-heading)', margin: 0 }}>
            Featured Courses in this Program
          </h2>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: '700' }}>
            {matchedCourses.length} study guides available
          </span>
        </div>

        {matchedCourses.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
            {matchedCourses.map(course => {
              const courseHref = course.id === 'ftce-professional-education-test' ? '/ftce' : (course.id === 'teas-prep' ? '/teas' : `/courses/${course.id}`);
              return (
                <a 
                  key={course.id}
                  href={courseHref}
                  className="card"
                  onClick={(e) => { e.preventDefault(); onSelectCourse(course); }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1.5px solid #d2dbe5',
                    transition: 'transform 0.15s',
                    textDecoration: 'none'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                >
                  {/* Course Banner Image */}
                  <div style={{ height: '180px', width: '100%', position: 'relative' }}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)'
                    }}></div>
                    <span style={{
                      position: 'absolute', bottom: '12px', left: '16px',
                      backgroundColor: 'var(--accent)', color: '#222222',
                      fontSize: '0.75rem', fontWeight: '800', padding: '3px 8px', borderRadius: '20px'
                    }}>
                      {course.subject}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', fontWeight: '800', margin: 0, lineHeight: '1.3' }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                      {course.description.substring(0, 140)}...
                    </p>
                    
                    {/* Footer Meta Row */}
                    <div style={{ 
                      marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f0f4f8',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
                    }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700' }}>
                        {course.lessonsCount} lessons • {course.duration}
                      </span>
                      <span style={{ 
                        fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700',
                        display: 'flex', alignItems: 'center', gap: '2px'
                      }}>
                        Study Course <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
            <p>No aligned courses matching this category were found.</p>
          </div>
        )}
      </section>

      {/* 5. DYNAMIC FAQ ACCORDION SECTION */}
      <section style={{ maxWidth: '850px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <h2 style={{ fontSize: '2rem', color: '#1f4e5a', fontWeight: '900', fontFamily: 'var(--font-heading)', textAlign: 'center', margin: 0 }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              question: "How do I get started with the free trial?",
              answer: "You can start your risk-free trial in less than 2 minutes! Select any course, click 'Create an account', fill out the quick survey questions, and you will have full unlimited access to lessons, quizzes, and tests immediately."
            },
            {
              question: "Can I cancel my membership at any time?",
              answer: "Yes, absolutely! You can cancel your membership online with just a few clicks in your student dashboard. There are no long-term contracts, cancelation fees, or obligations."
            },
            ...(category === 'college-credit' ? [{
              question: "How do course credits transfer?",
              answer: "Our courses carry ACE and NCCRS recommendation status. Once you pass a course's online proctored exam, you request a transcript from us, which we send directly to your college registrar for standard credit conversion."
            }] : [])
          ].map((faq, idx) => {
            const isExpanded = activeFaqIdx === idx;
            return (
              <div 
                key={idx} 
                className="card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '24px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaqIdx(isExpanded ? null : idx)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    color: 'var(--text-primary)'
                  }}
                >
                  <h4 style={{ 
                    fontSize: '1.05rem', 
                    color: 'var(--primary-dark)', 
                    fontWeight: '800', 
                    margin: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    flex: 1
                  }}>
                    <HelpCircle size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} /> {faq.question}
                  </h4>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '1.25rem',
                    fontWeight: '900',
                    fontFamily: 'monospace',
                    transition: 'transform 0.2s ease',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)',
                    color: '#13809c',
                    marginLeft: '16px',
                    userSelect: 'none',
                    flexShrink: 0
                  }}>
                    &gt;
                  </span>
                </button>
                <div style={{
                  maxHeight: isExpanded ? '300px' : '0px',
                  transition: 'all 0.3s cubic-bezier(0, 1, 0, 1)',
                  opacity: isExpanded ? 1 : 0
                }}>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)', 
                    lineHeight: '1.5', 
                    margin: '12px 0 0 0',
                    paddingLeft: '24px'
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM TRIAL CONVERSION BANNER */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
        <div style={{
          backgroundColor: '#f2f6f9',
          border: '1.5px dashed var(--primary)',
          borderRadius: '12px',
          padding: '48px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <ShieldCheck size={48} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.8rem', color: '#1f4e5a', fontWeight: '900', fontFamily: 'var(--font-heading)', margin: 0 }}>
            Join 30+ Million Learners Today
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: '1.5', margin: '0 auto' }}>
            Boost your grades, study for standard state certification licensing, and earn college credit easily. Cancel online anytime.
          </p>
          <button 
            onClick={onStartSignup}
            style={{
              backgroundColor: 'var(--accent)',
              color: '#222222',
              fontWeight: '800',
              fontSize: '1rem',
              padding: '12px 36px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '12px',
              boxShadow: '0 4px 6px rgba(255,182,39,0.2)'
            }}
          >
            Get Started risk-FREE
          </button>
        </div>
      </section>

    </div>
  );
}
