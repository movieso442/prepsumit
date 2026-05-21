import React, { useState } from 'react';
import { 
  Search, Compass, BookOpen, Sparkles, Brain, Calculator, Dna, 
  DollarSign, ArrowRight, Star, GraduationCap, School, Bot, 
  MessageSquare, Check, Play, Volume2, Users, HelpCircle 
} from 'lucide-react';

export default function Home({ courses, setActivePage, setSearchQuery, onSelectCourse }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [activeCardDropdown, setActiveCardDropdown] = useState(null);
  
  // AI assistant states (retained original feature logic)
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  // Interactive sections states
  const [activeVideoTab, setActiveVideoTab] = useState('simplified'); // 'simplified', 'individualized', 'confidence'
  const [cheetahTab, setCheetahTab] = useState('instruction'); // 'instruction', 'activity', 'practice'
  const [activeContentTab, setActiveContentTab] = useState('subjects'); // 'subjects', 'courses', 'skills'
  const [homeSearchInput, setHomeSearchInput] = useState('');

  const programs = [
    {
      title: "Study for class",
      description: "Master new concepts with helpful video lessons, practice questions and step-by-step answer explanations.",
      dropdownText: "Explore our programs",
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=80",
      items: [
        { label: "K-12 Subject Help", search: "K-12" },
        { label: "College Courses", search: "College" },
        { label: "AP Exam Help", search: "AP" }
      ]
    },
    {
      title: "Ace your test prep",
      description: "92% pass rate. Prep for 1,500+ exams with custom study guides, practice tests and video lessons.",
      dropdownText: "Explore our programs",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=80",
      items: [
        { label: "FTCE Teacher Certification", search: "FTCE" },
        { label: "CLEP Exams", search: "CLEP" },
        { label: "SAT/ACT Prep", search: "SAT" }
      ]
    },
    {
      title: "Earn college credit",
      description: "Save time and money on 220+ upper and lower-division courses and skip what you already know.",
      dropdownText: "Explore our programs",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=80",
      items: [
        { label: "Transferable Credit courses", search: "Credit" },
        { label: "Degree pathways", search: "Degree" },
        { label: "Partner Colleges", search: "Partner" }
      ]
    },
    {
      title: "Teach your class",
      description: "Plan lessons with ease using state-standard-aligned videos and practice for all K-12 subjects.",
      dropdownText: "Select subject or resource",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?w=500&auto=format&fit=crop&q=80",
      items: [
        { label: "Lesson Plans", search: "Lesson" },
        { label: "Classroom Activities", search: "Classroom" },
        { label: "Teacher Professional Development", search: "Teacher" }
      ]
    },
    {
      title: "Homeschool your child",
      description: "Earn certificates of completion and potential college credit with full 6-12 curriculum.",
      dropdownText: "Select subject or resource",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=80",
      items: [
        { label: "Middle School Curriculum", search: "Middle" },
        { label: "High School Curriculum", search: "High" },
        { label: "Progress Reports", search: "Reports" }
      ]
    },
    {
      title: "AI mastery",
      description: "Practical AI skills for the modern workforce, with optional college credit available. Gain the AI skills for the careers of tomorrow.",
      dropdownText: "Explore AI courses",
      imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80",
      items: [
        { label: "Generative AI Basics", search: "AI" },
        { label: "AI Prompt Engineering", search: "Prompt" },
        { label: "AI Ethics & Application", search: "Ethics" }
      ]
    }
  ];

  const subjectGrid = [
    { name: "Art", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&auto=format&fit=crop&q=80" },
    { name: "Business", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80" },
    { name: "Computer Science", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80" },
    { name: "Teaching", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&auto=format&fit=crop&q=80" },
    { name: "English", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&auto=format&fit=crop&q=80" },
    { name: "Health & Medicine", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&auto=format&fit=crop&q=80" },
    { name: "History", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&auto=format&fit=crop&q=80" },
    { name: "Humanities", img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&auto=format&fit=crop&q=80" },
    { name: "Math", img: "https://images.unsplash.com/photo-1453733190148-c44698c26588?w=400&auto=format&fit=crop&q=80" },
    { name: "Psychology", img: "https://images.unsplash.com/photo-1518291344630-48572d739f43?w=400&auto=format&fit=crop&q=80" },
    { name: "Science", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&auto=format&fit=crop&q=80" },
    { name: "Social Science", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=80" }
  ];

  const featuredLinks = [
    { title: "ASWB Test Preparation & Resources", search: "ASWB" },
    { title: "Biology 101", search: "Biology" },
    { title: "Business 101", search: "Business" },
    { title: "Business 104", search: "Business" },
    { title: "Business 106", search: "Business" },
    { title: "Business 107", search: "Business" },
    { title: "Chemistry", search: "Chemistry" },
    { title: "CLEP History of the United States", search: "CLEP" },
    { title: "Communications 101", search: "Communications" },
    { title: "Computer Science 102", search: "Computer" },
    { title: "CSET English", search: "CSET" },
    { title: "Economics 101", search: "Economics" },
    { title: "English 104", search: "English" },
    { title: "Free Online Courses and Education", search: "Free" },
    { title: "GED Test Preparation & Resources", search: "GED" },
    { title: "Grand Canyon University Transfer", search: "Transfer" },
    { title: "HESI Admission Assessment (A2) Ex...", search: "HESI" },
    { title: "History 103", search: "History" },
    { title: "HSPT Practice Test", search: "HSPT" },
    { title: "Humanities 201", search: "Humanities" },
    { title: "Introduction to Communications 101", search: "Communications" },
    { title: "Math 101", search: "Math" },
    { title: "Math 108", search: "Math" },
    { title: "Political Science 102", search: "Political" },
    { title: "Sociology 101", search: "Sociology" },
    { title: "Statistics 101", search: "Statistics" },
    { title: "TACHS Practice Test", search: "TACHS" },
    { title: "Western Governors University Trans...", search: "Transfer" }
  ];

  const handleQuickSignupSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setActivePage('signup');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!homeSearchInput.trim()) return;
    setSearchQuery(homeSearchInput);
    setActivePage('catalog');
  };

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    const query = aiInput.toLowerCase();
    if (query.includes('ftce') || query.includes('ped') || query.includes('test') || query.includes('passing')) {
      setAiResponse("Hi! I'm Study AI. For the FTCE Professional Education Test (PEd), you need a scaled score of 200 to pass, which represents approximately 70-75% correct answers. The test covers 8 competencies, including instructional design, learning environments, and teaching English language learners (ELL). PrepSummit.com's prep course offers 105 video lessons and 507 test-aligned practice questions to guarantee your first-time pass!");
    } else if (query.includes('calculus') || query.includes('limit')) {
      setAiResponse("Hello! I'm Study AI. Limits describe what value a function approaches as x gets closer to a target value. For AP Calculus BC, mastering limits, derivatives, and Taylor series is critical. Check out our limits lesson in the catalog to practice interactive quizzes!");
    } else {
      setAiResponse("Hello there! I'm Study AI, your custom study assistant. You can ask me any academic or exam preparation questions! Ask me about 'FTCE passing score' or 'Limits in Calculus' for aligned guidelines.");
    }
    setAiInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '100%', margin: '0 auto' }}>
      
      {/* 1. Medical Professional Hero Section (Screenshot 539 & 540) */}
      <section style={{
        backgroundColor: '#0c2330',
        padding: '64px 32px',
        color: '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Floating Star graphics mimicking study.com details */}
        <div style={{ position: 'absolute', left: '4%', top: '15%', color: '#68b1c4', fontSize: '4.5rem', fontWeight: 'bold', userSelect: 'none', opacity: 0.35 }}>★</div>
        <div style={{ position: 'absolute', right: '4%', top: '8%', color: '#68b1c4', fontSize: '5rem', fontWeight: 'bold', userSelect: 'none', opacity: 0.35 }}>★</div>

        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '900', 
          color: '#ffffff', 
          textAlign: 'center',
          maxWidth: '850px',
          margin: '0 auto',
          lineHeight: '1.25',
          fontFamily: 'var(--font-heading)'
        }}>
          Learn faster. Stay motivated. Study smarter.
        </h1>

        {/* 6 Program Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
          maxWidth: '1200px',
          zIndex: 2
        }}>
          {programs.map((prog, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                color: '#222222',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                transition: 'transform 0.2s',
                border: '1px solid #eef2f6'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Card Image Cover */}
              <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                <img 
                  src={prog.imageUrl} 
                  alt={prog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <h3 
                  onClick={() => {
                    setSearchQuery(prog.items[0].search);
                    setActivePage('catalog');
                  }}
                  style={{ 
                    fontSize: '1.4rem', 
                    color: '#0c2330', 
                    fontWeight: '800', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {prog.title} <ArrowRight size={18} style={{ color: '#13809c' }} />
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: '1.6', flexGrow: 1 }}>
                  {prog.description}
                </p>

                {/* Programs Selector Dropdown */}
                <div style={{ position: 'relative', marginTop: '12px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCardDropdown(activeCardDropdown === idx ? null : idx);
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #d2dbe5',
                      borderRadius: '6px',
                      textAlign: 'left',
                      fontSize: '0.9rem',
                      color: '#13809c',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    <span>{prog.dropdownText}</span>
                    <span style={{ fontSize: '0.75rem', transform: activeCardDropdown === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                  </button>

                  {activeCardDropdown === idx && (
                    <div style={{
                      position: 'absolute',
                      bottom: '52px',
                      left: 0,
                      right: 0,
                      zIndex: 99,
                      backgroundColor: '#ffffff',
                      padding: '8px',
                      border: '1.5px solid #13809c',
                      borderRadius: '6px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      {prog.items.map((item, keyIdx) => (
                        <div 
                          key={keyIdx} 
                          onClick={() => {
                            setActiveCardDropdown(null);
                            setSearchQuery(item.search);
                            setActivePage("catalog");
                          }}
                          style={{ 
                            fontSize: '0.9rem', 
                            color: '#4a5568', 
                            cursor: 'pointer', 
                            padding: '10px 12px',
                            borderRadius: '4px',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={e => {
                            e.target.style.backgroundColor = '#f2f6f9';
                            e.target.style.color = '#13809c';
                          }}
                          onMouseOut={e => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#4a5568';
                          }}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Quick Registration Section (Screenshot 540) */}
      <section style={{
        backgroundColor: '#000000',
        padding: '24px 32px',
        borderTop: '1px solid #1c2730',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <form onSubmit={handleQuickSignupSubmit} style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          width: '100%'
        }}>
          <input 
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '4px',
              border: '1px solid #4a5568',
              backgroundColor: '#ffffff',
              color: '#000000',
              outline: 'none',
              width: '280px',
              fontSize: '0.95rem'
            }}
          />
          
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '4px',
              border: '1px solid #4a5568',
              backgroundColor: '#ffffff',
              color: '#000000',
              outline: 'none',
              width: '240px',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher / Educator</option>
            <option value="parent">Parent / Homeschooler</option>
            <option value="professional">Professional Career Seeker</option>
          </select>

          <button 
            type="submit"
            style={{
              backgroundColor: '#ffb627',
              color: '#222222',
              fontWeight: '800',
              fontSize: '0.95rem',
              padding: '12px 32px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
            onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
          >
            Create an account
          </button>
        </form>
      </section>

      {/* 3. Search & ETS Partnership Section (Screenshot 541) */}
      <section style={{
        backgroundColor: '#eef6f9',
        padding: '56px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0c2330' }}>
            What do you want to learn today?
          </h2>
          <form onSubmit={handleSearchSubmit} style={{ 
            display: 'flex', 
            position: 'relative', 
            width: '100%', 
            maxWidth: '640px', 
            margin: '0 auto' 
          }}>
            <Search 
              size={20} 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} 
            />
            <input 
              type="text"
              placeholder="Search Courses & Lessons"
              value={homeSearchInput}
              onChange={e => setHomeSearchInput(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 48px',
                borderRadius: '50px',
                border: '1.5px solid #d2dbe5',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                backgroundColor: '#ffffff'
              }}
            />
          </form>
        </div>

        {/* ETS Banner */}
        <div style={{
          backgroundColor: '#fffdf9',
          border: '1px solid #ffb627',
          borderRadius: '8px',
          padding: '24px 32px',
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(255,182,39,0.06)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0c2330' }}>
            Official Test Prep Provider for Praxis® and TOEFL®
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#4a5568', lineHeight: '1.6', maxWidth: '800px' }}>
            We partnered with ETS, the makers of Praxis® and TOEFL® tests, to deliver test prep proven to boost confidence and improve scores.
          </p>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0c2330', letterSpacing: '-1px' }}>
                <span style={{ color: '#ffb627' }}>✱</span>praxis
              </span>
              <button 
                onClick={() => { setSearchQuery('Praxis'); setActivePage('catalog'); }}
                style={{
                  backgroundColor: '#cbdcf0',
                  color: '#004c6c',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Learn more
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0c2330', letterSpacing: '-1px' }}>
                <span style={{ color: '#ffb627' }}>✱</span>toefl
              </span>
              <button 
                onClick={() => { setSearchQuery('TOEFL'); setActivePage('catalog'); }}
                style={{
                  backgroundColor: '#cbdcf0',
                  color: '#004c6c',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Value Proposition Section (Screenshot 542) */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0c2330', lineHeight: '1.25' }}>
            The affordable, flexible way to ace your exams, master AI skills, and earn college credit
          </h2>
          <p style={{ fontSize: '1rem', color: '#718096' }}>
            Powered by AI, learning science, and expert-created curriculum, built around how people actually learn.
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '32px',
          maxWidth: '1100px',
          width: '100%',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* AI Skills Mastery Card */}
          <div style={{
            flex: '1 1 450px',
            backgroundColor: '#0c2330',
            borderRadius: '12px',
            padding: '40px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
                AI Skills Mastery
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#a0aec0' }}>
                Learn AI skills for the careers of tomorrow.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Check size={20} style={{ color: '#ffb627', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem' }}>Master the skills employers are hiring for</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Check size={20} style={{ color: '#ffb627', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem' }}>Use AI tools reshaping your industry</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Check size={20} style={{ color: '#ffb627', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontSize: '0.95rem' }}>Earn college credit as you build real skills</span>
              </div>
            </div>

            <span 
              onClick={() => { setSearchQuery('AI'); setActivePage('catalog'); }}
              style={{ color: '#ffb627', fontWeight: '800', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.95rem', marginTop: '8px' }}
            >
              Learn more
            </span>
          </div>

          {/* Value Prop Image */}
          <div style={{
            flex: '1 1 450px',
            height: '340px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&auto=format&fit=crop&q=80" 
              alt="AI Skills Student"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 5. Interactive video and course dashboard (Screenshot 543 & 544) */}
      <section style={{
        backgroundColor: '#f7fafc',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0c2330', textAlign: 'center', maxWidth: '800px' }}>
          Opening the door to the life-changing impact of education
        </h2>

        {/* Dynamic Navigation Tabs */}
        <div style={{
          display: 'flex',
          border: '1px solid #d2dbe5',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setActiveVideoTab('simplified')}
            style={{
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              backgroundColor: activeVideoTab === 'simplified' ? '#13809c' : '#ffffff',
              color: activeVideoTab === 'simplified' ? '#ffffff' : '#13809c',
              transition: 'all 0.2s'
            }}
          >
            Simplified learning
          </button>
          <button
            onClick={() => setActiveVideoTab('individualized')}
            style={{
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              backgroundColor: activeVideoTab === 'individualized' ? '#13809c' : '#ffffff',
              color: activeVideoTab === 'individualized' ? '#ffffff' : '#13809c',
              transition: 'all 0.2s'
            }}
          >
            Individualized experience
          </button>
          <button
            onClick={() => setActiveVideoTab('confidence')}
            style={{
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              backgroundColor: activeVideoTab === 'confidence' ? '#13809c' : '#ffffff',
              color: activeVideoTab === 'confidence' ? '#ffffff' : '#13809c',
              transition: 'all 0.2s'
            }}
          >
            Confidence-building resources
          </button>
        </div>

        {/* Dynamic content rendering based on selected Tab */}
        {activeVideoTab === 'simplified' && (
          <div className="fade-in" style={{ maxWidth: '1100px', width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0c2330', fontWeight: '800', marginBottom: '8px' }}>Bite-sized video lessons</h3>
              <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>Take our short, engaging video lessons on the go. Simplify your learning process by learning anywhere, anytime.</p>
            </div>

            {/* Video mockup frame */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
            }}>
              {/* Left Column: Cheetah Video Player */}
              <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '1.25rem', color: '#0c2330', fontWeight: '800' }}>
                  Predator & Prey | Overview, Interactions & Types
                </h4>

                <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <button 
                    onClick={() => setCheetahTab('instruction')}
                    style={{
                      background: 'none', border: 'none', color: cheetahTab === 'instruction' ? '#13809c' : '#718096',
                      fontWeight: '800', borderBottom: cheetahTab === 'instruction' ? '2.5px solid #13809c' : 'none',
                      paddingBottom: '8px', cursor: 'pointer', fontSize: '0.85rem'
                    }}
                  >
                    Instruction
                  </button>
                  <button 
                    onClick={() => setCheetahTab('activity')}
                    style={{
                      background: 'none', border: 'none', color: cheetahTab === 'activity' ? '#13809c' : '#718096',
                      fontWeight: '800', borderBottom: cheetahTab === 'activity' ? '2.5px solid #13809c' : 'none',
                      paddingBottom: '8px', cursor: 'pointer', fontSize: '0.85rem'
                    }}
                  >
                    Activity
                  </button>
                  <button 
                    onClick={() => setCheetahTab('practice')}
                    style={{
                      background: 'none', border: 'none', color: cheetahTab === 'practice' ? '#13809c' : '#718096',
                      fontWeight: '800', borderBottom: cheetahTab === 'practice' ? '2.5px solid #13809c' : 'none',
                      paddingBottom: '8px', cursor: 'pointer', fontSize: '0.85rem'
                    }}
                  >
                    Practice
                  </button>
                </div>

                {cheetahTab === 'instruction' ? (
                  <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '6px', overflow: 'hidden' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd6f3?w=800&auto=format&fit=crop&q=80" 
                      alt="Cheetah"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                    }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#13809c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Play size={28} fill="white" />
                      </div>
                    </div>

                    {/* Bottom controls panel */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white', padding: '10px 16px', display: 'flex', justifyItems: 'center', justifyContent: 'space-between',
                      fontSize: '0.75rem', alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', cursor: 'pointer' }}>Save</span>
                        <span style={{ fontWeight: '700', cursor: 'pointer' }}>Timeline</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>Autoplay</span>
                          <span style={{ width: '32px', height: '16px', borderRadius: '10px', backgroundColor: '#e2e8f0', display: 'inline-block', position: 'relative' }}>
                            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#718096', position: 'absolute', left: '2px', top: '2px' }} />
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span>Speed <strong style={{ textDecoration: 'underline' }}>Normal</strong></span>
                        <span>23K views</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    height: '300px', backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', 
                    borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '12px', padding: '24px', textAlign: 'center'
                  }}>
                    <HelpCircle size={40} style={{ color: '#13809c' }} />
                    <h5 style={{ fontWeight: '700', fontSize: '1rem', color: '#0c2330' }}>
                      {cheetahTab === 'activity' ? "Interactive Worksheet Lesson Activity" : "Lesson Practice Quiz"}
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#718096', maxWidth: '360px' }}>
                      {cheetahTab === 'activity' 
                        ? "Master predator/prey classification and trophic levels with downloadable PDF exercises and diagrams." 
                        : "Test your comprehension with 5 quick exam-aligned multiple choice questions."}
                    </p>
                    <button 
                      onClick={() => {
                        const ftce = courses.find(c => c.id === 'ftce-professional-education-test');
                        if (ftce) onSelectCourse(ftce);
                        else setActivePage('catalog');
                      }}
                      style={{
                        backgroundColor: '#13809c', color: 'white', padding: '8px 16px', borderRadius: '4px',
                        border: 'none', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer'
                      }}
                    >
                      Access Lesson Resources
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Playlist */}
              <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h5 style={{ fontSize: '1rem', fontWeight: '800', color: '#0c2330', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  Biology 101: Intro to Biology
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '310px' }}>
                  {[
                    "Populations: Density, Survivorship and Life H...",
                    "Survivorship Curve Definition, Types & Exa...",
                    "Interspecific Competition | Definition, Graph & Exa...",
                    "Ecological Succession | Definition, Graph & Exa...",
                    "How Introduced and Invasive Species Alter..."
                  ].map((lesson, lessonIdx) => (
                    <div 
                      key={lessonIdx}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '4px',
                        backgroundColor: lessonIdx === 0 ? '#eef6f9' : 'transparent',
                        borderLeft: lessonIdx === 0 ? '3.5px solid #13809c' : 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        color: lessonIdx === 0 ? '#13809c' : '#4a5568',
                        fontWeight: lessonIdx === 0 ? '700' : '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={e => { if (lessonIdx !== 0) e.target.style.backgroundColor = '#f8fafc'; }}
                      onMouseOut={e => { if (lessonIdx !== 0) e.target.style.backgroundColor = 'transparent'; }}
                    >
                      {lesson}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeVideoTab === 'individualized' && (
          <div className="fade-in" style={{ maxWidth: '900px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#0c2330', fontWeight: '800', marginBottom: '8px' }}>Personalized study paths</h3>
              <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>Track your progress, get recommendations on what to study next, and practice with adaptive flashcards built just for you.</p>
            </div>
            
            {/* Dashboard Mockup */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0c2330' }}>Your Weekly Dashboard Study Plan</span>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '700', backgroundColor: '#e6f7f0', padding: '4px 10px', borderRadius: '12px' }}>On Track - 80% Complete</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '200px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#718096' }}>NEXT RECOMMENDED LESSON</span>
                  <strong style={{ fontSize: '0.95rem', color: '#0c2330' }}>FTCE Instructional Design Principles</strong>
                  <button 
                    onClick={() => {
                      const ftce = courses.find(c => c.id === 'ftce-professional-education-test');
                      if (ftce) onSelectCourse(ftce);
                      else setActivePage('catalog');
                    }}
                    style={{ alignSelf: 'flex-start', marginTop: '8px', backgroundColor: '#13809c', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Resume Study
                  </button>
                </div>
                <div style={{ flex: '1', minWidth: '200px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#718096' }}>ADAPTIVE PROGRESS FLASHCARDS</span>
                  <strong style={{ fontSize: '0.95rem', color: '#0c2330' }}>94 Flashcards Mastered</strong>
                  <span style={{ fontSize: '0.8rem', color: '#718096' }}>32 Remaining in Weekly Queue</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeVideoTab === 'confidence' && (
          <div className="fade-in" style={{ maxWidth: '900px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#0c2330', fontWeight: '800', marginBottom: '8px' }}>Guaranteed pass prep</h3>
              <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>Ace your exams on the first try with our study tools, comprehensive practice tests, and detailed answer explanations.</p>
            </div>

            {/* Passing Rate Scoreboard Mockup */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              textAlign: 'left',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#13809c', lineHeight: '1' }}>92%</div>
                  <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: '600', marginTop: '6px' }}>EXAM PASS RATE GUARANTEE</div>
                </div>
                <div style={{ width: '1px', height: '60px', backgroundColor: '#e2e8f0' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#ffb627', lineHeight: '1' }}>1,500+</div>
                  <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: '600', marginTop: '6px' }}>EXAMS COVERED IN LIBRARY</div>
                </div>
                <div style={{ width: '1px', height: '60px', backgroundColor: '#e2e8f0' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#10b981', lineHeight: '1' }}>4.8★</div>
                  <div style={{ fontSize: '0.85rem', color: '#718096', fontWeight: '600', marginTop: '6px' }}>USER SATISFACTION SCORE</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. Testimonials Section (Screenshot 545) */}
      <section style={{
        backgroundColor: '#eef6f9',
        padding: '80px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Graphic connector line running in background */}
        <div style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '55%',
          height: '2px',
          borderTop: '2px dashed #13809c',
          opacity: 0.18,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0c2330', textAlign: 'center', zIndex: 2 }}>
          Real people. Real breakthroughs.
        </h2>

        <div style={{
          display: 'flex',
          gap: '24px',
          maxWidth: '1200px',
          width: '100%',
          zIndex: 2,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            {
              quote: "Study.com allowed me to complete my courses in a fraction of the time it took my peers and for a fraction of the cost. I highly recommend their comprehensive programs.",
              author: "Aimee K.",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "I always received poor grades in History. Study.com really helped me learn the material and I received my highest CLEP score ever!",
              author: "Sharla W.",
              img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "Study.com is literally the best guide to help you through rigorous class material and will help foster growth within your educational journey.",
              author: "John W.",
              img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
            }
          ].map((t, idx) => (
            <div 
              key={idx}
              style={{
                flex: '1 1 340px',
                maxWidth: '380px',
                backgroundColor: '#ffffff',
                border: '1px solid #d2dbe5',
                borderRadius: '8px',
                padding: '32px 28px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative'
              }}
            >
              {/* Quote Mark */}
              <span style={{ fontSize: '3rem', fontWeight: '900', color: '#ffb627', height: '30px', display: 'block', lineHeight: '1', fontFamily: 'serif' }}>
                “
              </span>
              
              <p style={{ fontSize: '0.92rem', color: '#4a5568', lineHeight: '1.6', flexGrow: 1, minHeight: '90px' }}>
                {t.quote}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '2.5px solid #ffb627' }}>
                  <img src={t.img} alt={t.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <strong style={{ fontSize: '0.95rem', color: '#0c2330' }}>{t.author}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Study AI Widget Box (Screenshot 546) */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0c2330' }}>Meet Study AI</h2>
          <p style={{ color: '#718096', fontSize: '1rem' }}>
            Your new assistant is here to help you get results! What wonders will you work together?
          </p>
        </div>

        {/* AI Dialog Box Mockup */}
        <div style={{
          maxWidth: '850px',
          width: '100%',
          border: '1.5px solid #13809c',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 24px rgba(19,128,156,0.06)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header gradient bar */}
          <div style={{ height: '5px', background: 'linear-gradient(90deg, #13809c 0%, #ffb627 100%)' }} />

          {/* AI Output Pane */}
          <div style={{ padding: '32px', display: 'flex', gap: '20px', alignItems: 'flex-start', minHeight: '140px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eef6f9', border: '1.5px solid #13809c',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#13809c', flexShrink: 0
            }}>
              <Bot size={24} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <strong style={{ fontSize: '1rem', color: '#0c2330' }}>Study AI</strong>
              <div style={{ fontSize: '0.98rem', color: '#222222', lineHeight: '1.6' }}>
                {aiResponse ? aiResponse : (
                  <>
                    Hi, I'm Study AI. How can I help you today?<br/>
                    I can help you make the most of PrepSummit's courses, search for certification details, or explain limits in calculus! Try submitting a question below.
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleAskAI} style={{
            borderTop: '1px solid #eef2f6',
            padding: '16px 32px',
            backgroundColor: '#fafbfc',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <input 
              type="text" 
              placeholder="Ask Study AI, e.g. How is the FTCE Professional Education test scored?"
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                border: '1.5px solid #d2dbe5',
                borderRadius: '6px',
                outline: 'none',
                fontSize: '0.95rem',
                backgroundColor: '#ffffff'
              }}
            />
            <button 
              type="submit" 
              style={{ 
                backgroundColor: '#13809c', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '6px',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.92rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#0f6880'}
              onMouseOut={e => e.target.style.backgroundColor = '#13809c'}
            >
              Ask AI
            </button>
          </form>
        </div>
      </section>

      {/* 8. Higher Ed Teacher Test Prep (Screenshot 547) */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '64px 32px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          maxWidth: '1100px',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          flexWrap: 'wrap'
        }}>
          {/* Left: Instructor Image */}
          <div style={{ flex: '1 1 500px', height: '400px', minWidth: '320px' }}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80" 
              alt="Teacher Prep Instructor"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Right: Teal Info Banner */}
          <div style={{
            flex: '1 1 450px',
            backgroundColor: '#13809c',
            padding: '48px',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' }}>
              Higher Ed Teacher Test Prep
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                "Test prep for Praxis, TExES, FTCE, CSET, and more",
                "Trusted by hundreds of universities and higher education partners",
                "Over 92% of students pass their exam",
                "Practice personalized with AI helps learners focus their time where it matters most"
              ].map((bullet, key) => (
                <div key={key} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', color: '#ffb627' }}>●</span>
                  <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{bullet}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); }}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1.5px solid #ffffff',
                borderRadius: '6px',
                padding: '12px 28px',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: '8px'
              }}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#13809c';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* 9. Content Explorer Section (Screenshot 548 & 549) */}
      <section style={{
        backgroundColor: '#f7fafc',
        padding: '80px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0c2330' }}>Explore our content</h2>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '8px' }}>
            <span 
              onClick={() => setActiveContentTab('subjects')}
              style={{ 
                fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', 
                color: activeContentTab === 'subjects' ? '#0c2330' : '#a0aec0',
                borderBottom: activeContentTab === 'subjects' ? '2.5px solid #0c2330' : 'none',
                paddingBottom: '6px'
              }}
            >
              Subjects
            </span>
            <span 
              onClick={() => setActiveContentTab('courses')}
              style={{ 
                fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', 
                color: activeContentTab === 'courses' ? '#0c2330' : '#a0aec0',
                borderBottom: activeContentTab === 'courses' ? '2.5px solid #0c2330' : 'none',
                paddingBottom: '6px'
              }}
            >
              Courses
            </span>
            <span 
              onClick={() => setActiveContentTab('skills')}
              style={{ 
                fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', 
                color: activeContentTab === 'skills' ? '#0c2330' : '#a0aec0',
                borderBottom: activeContentTab === 'skills' ? '2.5px solid #0c2330' : 'none',
                paddingBottom: '6px'
              }}
            >
              Skills
            </span>
          </div>
        </div>

        {/* Dynamic subject tab grids */}
        {activeContentTab === 'subjects' && (
          <div className="fade-in" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            width: '100%',
            maxWidth: '1100px'
          }}>
            {subjectGrid.map((sub, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setSearchQuery(sub.name);
                  setActivePage('catalog');
                }}
                style={{
                  height: '140px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={sub.img} alt={sub.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0, backgroundColor: 'rgba(12, 35, 48, 0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
                }}>
                  <strong style={{ color: '#ffffff', fontSize: '1.15rem', textAlign: 'center', fontWeight: '800' }}>
                    {sub.name}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeContentTab === 'courses' && (
          <div className="fade-in" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '1100px'
          }}>
            {courses.map((course, idx) => (
              <div 
                key={idx}
                onClick={() => onSelectCourse(course)}
                style={{
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d2dbe5',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <strong style={{ color: '#0c2330', fontSize: '1.05rem', fontWeight: '800' }}>{course.title}</strong>
                <span style={{ fontSize: '0.8rem', color: '#13809c', fontWeight: '700' }}>{course.subject} ({course.lessonsCount} lessons)</span>
              </div>
            ))}
          </div>
        )}

        {activeContentTab === 'skills' && (
          <div className="fade-in" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            width: '100%',
            maxWidth: '1100px'
          }}>
            {[
              { title: "Generative AI Basics", search: "AI" },
              { title: "Prompt Engineering Foundations", search: "Prompt" },
              { title: "Calculus Problem Solving", search: "Limits" },
              { title: "AP Test-taking Strategy", search: "Calculus" },
              { title: "Instructional Design Standards", search: "FTCE" },
              { title: "Classroom Engagement Metrics", search: "Teacher" }
            ].map((skill, idx) => (
              <div 
                key={idx}
                onClick={() => { setSearchQuery(skill.search); setActivePage('catalog'); }}
                style={{
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d2dbe5',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <strong style={{ color: '#0c2330', fontSize: '1.05rem', fontWeight: '800' }}>{skill.title}</strong>
                <span style={{ fontSize: '0.8rem', color: '#13809c', fontWeight: '700' }}>Practice Module &rarr;</span>
              </div>
            ))}
          </div>
        )}

        {/* Featured Content Links (Screenshot 549) */}
        <div style={{
          width: '100%',
          maxWidth: '1100px',
          borderTop: '1px solid #cbd5e1',
          paddingTop: '56px',
          marginTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0c2330' }}>
            Featured content
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px 24px',
            width: '100%'
          }}>
            {featuredLinks.map((link, idx) => (
              <span 
                key={idx}
                onClick={() => {
                  setSearchQuery(link.search);
                  setActivePage('catalog');
                }}
                style={{
                  color: '#004c6c',
                  textDecoration: 'underline',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  lineHeight: '1.4'
                }}
              >
                {link.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Press Logos & Initiatives (Screenshot 550, 551, 552) */}
      <section style={{
        backgroundColor: '#ffffff',
        padding: '64px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '56px',
        width: '100%'
      }}>
        {/* In the press block */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '28px', width: '100%', maxWidth: '1100px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0c2330' }}>In the press</h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: 0.65
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#222222', fontFamily: 'serif' }}>abc</span>
            <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#222222', fontStyle: 'italic', fontFamily: 'serif' }}>Forbes</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#222222', letterSpacing: '-1px' }}>WSJ</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '950', color: '#222222', letterSpacing: '-1.5px', fontStyle: 'italic' }}>Inc.</span>
            <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#222222' }}>OCBS</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#222222', letterSpacing: '1px' }}>NBC</span>
          </div>
        </div>

        {/* Our Initiatives block */}
        <div style={{ 
          width: '100%', 
          maxWidth: '1100px', 
          borderTop: '1px solid #e2e8f0', 
          paddingTop: '56px',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '40px' 
        }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0c2330' }}>Our Initiatives</h3>
            <p style={{ fontSize: '0.98rem', color: '#718096', lineHeight: '1.5' }}>
              We're passionate about initiatives that open the door to the life-changing impact of education for those who need it most.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            width: '100%'
          }}>
            {/* Initiative Card 1 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}>
              <div style={{ height: '140px', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&auto=format&fit=crop&q=80" alt="Keys to Classroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                <div style={{
                  color: '#ffffff', backgroundColor: '#004c6c', fontWeight: '800', fontSize: '0.78rem',
                  padding: '4px 10px', borderRadius: '4px', alignSelf: 'flex-start', textTransform: 'uppercase'
                }}>
                  Keys to the Classroom
                </div>
                <p style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.5', flexGrow: 1 }}>
                  Keys to the Classroom is our initiative that helps combat the teacher shortage across the nation.
                </p>
                <span 
                  onClick={() => { setSearchQuery('Teacher'); setActivePage('catalog'); }}
                  style={{ color: '#004c6c', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Learn more
                </span>
              </div>
            </div>

            {/* Initiative Card 2 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}>
              <div style={{ height: '140px', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80" alt="Working Scholars" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                <div style={{
                  color: '#ffffff', backgroundColor: '#e28743', fontWeight: '800', fontSize: '0.78rem',
                  padding: '4px 10px', borderRadius: '4px', alignSelf: 'flex-start', textTransform: 'uppercase'
                }}>
                  Working Scholars
                </div>
                <p style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.5', flexGrow: 1 }}>
                  A new way for working adults and underserved community members to earn a college degree.
                </p>
                <span 
                  onClick={() => { setSearchQuery('Credit'); setActivePage('catalog'); }}
                  style={{ color: '#004c6c', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Learn more
                </span>
              </div>
            </div>

            {/* Initiative Card 3 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eef6f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#13809c'
                }}>
                  <GraduationCap size={18} />
                </div>
                <strong style={{ fontSize: '1rem', color: '#0c2330', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>Scholarships</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.5', flexGrow: 1 }}>
                We offer over 40 different academic awards and scholarships to help make education more accessible.
              </p>
              <span 
                onClick={() => { setActivePage('signup'); }}
                style={{ color: '#004c6c', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Learn more
              </span>
            </div>

            {/* Initiative Card 4 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d2dbe5',
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              justifyContent: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '4px', backgroundColor: '#ffb627',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#222222',
                  fontWeight: '900', fontSize: '0.85rem'
                }}>
                  1%
                </div>
                <strong style={{ fontSize: '1rem', color: '#0c2330', textTransform: 'uppercase', letterSpacing: '-0.2px' }}>Pledge 1%</strong>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.5', flexGrow: 1 }}>
                We are a proud Pledge 1% partner. Pledge 1% partners are leading organizations committed to making giving back a priority.
              </p>
              <span 
                onClick={() => setActivePage('signup')}
                style={{ color: '#004c6c', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Learn more
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Bottom Hero Section (Screenshot 553) */}
      <section style={{
        position: 'relative',
        height: '420px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        background: "linear-gradient(90deg, rgba(12,35,48,0.92) 0%, rgba(12,35,48,0.6) 50%, rgba(12,35,48,0.2) 100%), url('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&auto=format&fit=crop&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        width: '100%'
      }}>
        {/* Semi-circular overlay graphic mimicking the screenshot */}
        <div style={{
          position: 'absolute',
          right: '15%',
          bottom: '0',
          width: '280px',
          height: '140px',
          borderTopLeftRadius: '140px',
          borderTopRightRadius: '140px',
          backgroundColor: '#ffb627',
          opacity: 0.15,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '560px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{
            fontSize: '3rem',
            color: '#ffffff',
            fontWeight: '900',
            lineHeight: '1.15',
            margin: 0
          }}>
            Unlock your potential.
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: '#e2e8f0',
            lineHeight: '1.6',
            margin: 0
          }}>
            Blaze a trail. Learn something new. Opportunity's knocking. Will you answer?
          </p>
          <div>
            <button 
              onClick={() => setActivePage('signup')}
              style={{
                backgroundColor: '#ffb627',
                border: 'none',
                borderRadius: '4px',
                color: '#222222',
                fontWeight: '800',
                fontSize: '1.05rem',
                padding: '14px 36px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255,182,39,0.25)',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
              onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
            >
              Get started
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
