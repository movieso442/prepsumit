import React, { useState } from 'react';
import { 
  Search, BookOpen, ArrowRight, Star, Check, Play, HelpCircle, 
  Award, Clock, ChevronDown, ChevronUp, ChevronRight, X 
} from 'lucide-react';

export default function Home({ courses, setActivePage, setSearchQuery, onSelectCourse }) {
  // Search state
  const [homeSearchInput, setHomeSearchInput] = useState('');

  // Tab state (Overview, Syllabus, Test)
  const [activeTab, setActiveTab] = useState('Overview');

  // Accordion state (Chapters 1 to 7)
  // Chapter 1 is open by default (true), others closed (false)
  const [expandedChapters, setExpandedChapters] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false
  });

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // 5 Quiz Questions
  const quizQuestions = [
    {
      question: "An English-speaking student attends a class in which instruction is 100% in French. This approach to second-language learning is referred to as ______.",
      options: [
        "bilingual education",
        "multicultural education",
        "immersion education",
        "foreign language education"
      ],
      correctAnswer: 2,
      explanation: "In immersion programs, instruction is conducted entirely in the target language (French), helping students develop native-like proficiency in a natural context."
    },
    {
      question: "Which of the following is the most effective way for a teacher to establish positive communication with parents at the beginning of the school year?",
      options: [
        "Send a copy of the classroom rules and consequences",
        "Call to introduce themselves and share positive expectations",
        "Wait until the first report card to contact them",
        "Only call when a student exhibits behavioral issues"
      ],
      correctAnswer: 1,
      explanation: "Proactive communication, such as a phone call to introduce oneself and share positive goals, helps build a collaborative partnership with parents before any academic or behavioral issues arise."
    },
    {
      question: "Under the Family Educational Rights and Privacy Act (FERPA), which of the following is considered directory information and can be disclosed without consent?",
      options: [
        "Student social security number",
        "Grades and GPA",
        "Student's name and enrollment status",
        "Disciplinary records"
      ],
      correctAnswer: 2,
      explanation: "Directory information includes public details such as a student's name, address, telephone number, dates of attendance, and enrollment status, which can be disclosed without prior consent."
    },
    {
      question: "A teacher wants to foster critical thinking during a class discussion. Which type of question would be most effective?",
      options: [
        "A closed-ended question",
        "An open-ended question",
        "A recall question",
        "A yes/no question"
      ],
      correctAnswer: 1,
      explanation: "Open-ended questions encourage high-order critical thinking skills like evaluation, synthesis, and analysis, as they require students to explain and defend their reasoning."
    },
    {
      question: "What is the mandatory waiting period before retaking a failed FTCE exam?",
      options: [
        "7 calendar days",
        "14 calendar days",
        "31 calendar days",
        "60 calendar days"
      ],
      correctAnswer: 2,
      explanation: "According to the Florida Department of Education guidelines, candidates must wait at least 31 calendar days from the date of the failed attempt before retaking the same examination."
    }
  ];

  // Syllabus mock chapters mapping
  const syllabusChapters = [
    {
      id: 1,
      title: "About the FTCE Professional Education Test",
      lessons: [
        { title: "FTCE Professional Education Test: Passing Score", duration: "8 mins", desc: "The FTCE Professional Education test is scored using a PASS / NOT PASS system and requires a scaled score of 200. Read on for a description of this system, and find out what percentage of questions you'll need to answer correctly to pass." },
        { title: "What is on the FTCE Professional Education Test?", duration: "10 mins" },
        { title: "FTCE Registration | How to Sign Up for the FTCE Exam", duration: "6 mins" },
        { title: "FTCE Retake Policy", duration: "5 mins" }
      ]
    },
    {
      id: 2,
      title: "Instructional Design and Planning",
      lessons: [
        { title: "Florida Educator Accomplished Practices (FEAPs) Overview", duration: "7 mins" },
        { title: "Analyzing Cognitive, Social, and Physical Development", duration: "8 mins" },
        { title: "Establishing Measurable Learning Objectives", duration: "6 mins" },
        { title: "Selecting and Adapting Standards-Aligned Materials", duration: "5 mins" }
      ]
    },
    {
      id: 3,
      title: "Student Learning and Diversity",
      lessons: [
        { title: "Strategies for English Language Learners (ELL)", duration: "9 mins" },
        { title: "Individualized Education Programs (IEPs) & Accommodation Rules", duration: "10 mins" },
        { title: "Addressing Diverse Socioeconomic & Cultural Backgrounds", duration: "8 mins" }
      ]
    },
    {
      id: 4,
      title: "Classroom Management and Learning Environments",
      lessons: [
        { title: "Establishing Classroom Rules, Procedures, and Expectations", duration: "6 mins" },
        { title: "Behavior Intervention Plans & Positive Reinforcement", duration: "7 mins" },
        { title: "Optimizing the Physical and Emotional Learning Space", duration: "5 mins" }
      ]
    },
    {
      id: 5,
      title: "Instructional Delivery and Facilitation",
      lessons: [
        { title: "Active Learning & Student-Centered Engagement Strategies", duration: "8 mins" },
        { title: "Integrating Assistive and Instructional Technology", duration: "6 mins" },
        { title: "Collaborative Learning Structures & Group Work Dynamics", duration: "7 mins" }
      ]
    },
    {
      id: 6,
      title: "Student Assessment and Evaluation",
      lessons: [
        { title: "Formative vs. Summative Assessments: Best Practices", duration: "7 mins" },
        { title: "Designing Validity-Aligned Rubrics & Examinations", duration: "8 mins" },
        { title: "Interpreting Assessment Performance & Standardized Scores", duration: "9 mins" }
      ]
    },
    {
      id: 7,
      title: "Professional Development and Ethics",
      lessons: [
        { title: "Code of Ethics of the Education Profession in Florida", duration: "8 mins" },
        { title: "Legal Rights and Mandated Reporting Responsibilities", duration: "7 mins" },
        { title: "FERPA Compliance: Maintaining Student Record Confidentiality", duration: "6 mins" }
      ]
    }
  ];

  // Handles search redirects to the course catalog
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!homeSearchInput.trim()) return;
    setSearchQuery(homeSearchInput);
    setActivePage('catalog');
  };

  // Handles clicking a course
  const handleCourseClick = (courseId) => {
    const found = courses.find(c => c.id === courseId);
    if (found) {
      onSelectCourse(found);
    } else {
      setActivePage('catalog');
    }
  };

  // Toggle chapter collapse/expand
  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // Quiz interactive triggers
  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    setSelectedOptionIndex(optionIndex);
    setIsAnswered(true);
    if (optionIndex === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // Get the primary FTCE course object
  const ftceCourse = courses.find(c => c.id === 'ftce-professional-education-test') || courses[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', maxWidth: '1200px', margin: '0 auto', fontFamily: 'var(--font-body)' }}>
      
      {/* 1. Breadcrumbs, Header Title, and Course Hero */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        
        {/* Breadcrumbs Row */}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span onClick={() => { setActivePage('home'); setSearchQuery(''); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>All Test Prep</span>
          <ChevronRight size={12} />
          <span onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>FTCE Test Preparation & Resources</span>
          <ChevronRight size={12} />
          <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>FTCE PEd</span>
        </div>

        {/* Hero Section Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px', alignItems: 'start' }} className="course-detail-layout-grid">
          
          {/* Hero Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1 style={{ fontSize: '2.3rem', fontWeight: '800', color: 'var(--primary-dark)', lineHeight: '1.2' }}>
              FTCE Professional Education Test (PEd) Study Guide and Test Prep
            </h1>

            {/* Stars rating block */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', color: '#ffb627' }}>
                <Star size={16} fill="#ffb627" />
                <Star size={16} fill="#ffb627" />
                <Star size={16} fill="#ffb627" />
                <Star size={16} fill="#ffb627" />
                <Star size={16} fill="#ffb627" />
              </div>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>4.8/5</span>
              <span style={{ color: 'var(--text-tertiary)' }}>(318 reviews)</span>
            </div>

            {/* Search bar inside Hero (Praxis, Calculus search utility) */}
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>Searching for a different exam? (e.g. Praxis, CLEP, AP)</span>
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', position: 'relative', width: '100%' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input 
                  type="text"
                  placeholder="Search other study guides..."
                  value={homeSearchInput}
                  onChange={e => setHomeSearchInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 16px 10px 42px',
                    borderRadius: '24px',
                    border: '1.5px solid var(--border-light)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    bottom: '4px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '0 16px',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Search
                </button>
              </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)' }}>Course summary</h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                PrepSummit.com's FTCE Professional Education Test (083) study guide helps you prepare for this important Florida teacher certification exam with confidence. This comprehensive prep course features engaging video lessons, quick self-check quizzes, and realistic full-length practice tests designed to strengthen your teaching knowledge and test-taking skills.
              </p>
            </div>

            {/* Light blue start registration card */}
            <div style={{ 
              backgroundColor: '#eef6f9', 
              padding: '24px', 
              borderRadius: 'var(--radius-lg)', 
              border: '1.5px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '4px' }}>
                  Create an account to start this course today
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Get access to all lessons, flashcards, and practice tests.
                </p>
              </div>
              <button 
                onClick={() => setActivePage('signup')}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 24px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Create an account
              </button>
            </div>

          </div>

          {/* Hero Right Column (Course details box) */}
          <div style={{ 
            backgroundColor: '#f2f6f9', 
            borderRadius: 'var(--radius-xl)', 
            border: '1.5px solid var(--border-light)', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
              Course details
            </h3>

            {/* Detail Rows Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: 'var(--radius-md)', padding: '12px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><HelpCircle size={18} /></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>507 Practice questions</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: 'var(--radius-md)', padding: '12px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><Award size={18} /></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>9 Practice tests</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: 'var(--radius-md)', padding: '12px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><Play size={18} /></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>92 Videos</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: 'var(--radius-md)', padding: '12px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><Clock size={18} /></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>9 Hours of video</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', border: '1px solid #d2dbe5', borderRadius: 'var(--radius-md)', padding: '12px 16px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}><BookOpen size={18} /></div>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>105 Lessons</span>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 2. Circular Metrics Row */}
      <section style={{ 
        width: '100%', 
        backgroundColor: '#ffffff', 
        border: '1px solid var(--border-light)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '32px 24px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', textAlign: 'center' }}>
          How our students succeed*
        </h2>

        {/* 3 Metric Badges */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          width: '100%', 
          flexWrap: 'wrap', 
          gap: '24px' 
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary-dark)', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '800', 
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              92%
            </div>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              of students **passed their exam** on the first attempt
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary-dark)', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '800', 
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              96%
            </div>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              found PrepSummit to be a **valuable test prep** resource
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary-dark)', 
              color: '#ffffff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: '800', 
              fontSize: '1.25rem',
              flexShrink: 0
            }}>
              94%
            </div>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              felt **more confident** entering the testing center
            </span>
          </div>

        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          *Based on a survey of PrepSummit members who used this study guide.
        </span>
      </section>

      {/* 3. Interactive Quiz Card Section */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
            Try test-aligned practice questions for free
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Answer quiz questions and gauge understanding
          </p>
        </div>

        {/* Outer light blue container */}
        <div style={{ 
          backgroundColor: '#eef6f9', 
          border: '1.5px solid var(--border-light)', 
          borderRadius: 'var(--radius-xl)', 
          padding: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          {/* Inner Question Card */}
          {!quizCompleted ? (
            <div style={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #d2dbe5', 
              borderRadius: 'var(--radius-lg)', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              {/* Question Index Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-tertiary)' }}>
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>
                  Answered {currentQuestionIndex} of {quizQuestions.length} questions
                </span>
              </div>

              {/* Progress Segmented Bar */}
              <div style={{ display: 'flex', gap: '6px', width: '100%', height: '6px' }}>
                {quizQuestions.map((_, qIdx) => (
                  <div 
                    key={qIdx} 
                    style={{ 
                      flex: 1, 
                      borderRadius: '3px',
                      backgroundColor: qIdx <= currentQuestionIndex ? 'var(--primary)' : '#e2e8f0',
                      transition: 'background-color 0.2s'
                    }} 
                  />
                ))}
              </div>

              {/* Question Text */}
              <p style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px' }}>
                {quizQuestions[currentQuestionIndex].question}
              </p>

              {/* Options list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quizQuestions[currentQuestionIndex].options.map((option, oIdx) => {
                  const isSelected = selectedOptionIndex === oIdx;
                  const isCorrectAnswer = quizQuestions[currentQuestionIndex].correctAnswer === oIdx;
                  
                  // Style configurations based on quiz state
                  let optionBg = '#ffffff';
                  let optionBorder = '#d2dbe5';
                  let markerColor = 'var(--text-secondary)';
                  let markerBg = 'transparent';

                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      optionBg = 'var(--success-light)';
                      optionBorder = 'var(--success)';
                      markerBg = 'var(--success)';
                      markerColor = '#ffffff';
                    } else if (isSelected) {
                      optionBg = 'var(--error-light)';
                      optionBorder = 'var(--error)';
                      markerBg = 'var(--error)';
                      markerColor = '#ffffff';
                    }
                  } else if (isSelected) {
                    optionBg = 'var(--primary-light)';
                    optionBorder = 'var(--primary)';
                    markerBg = 'var(--primary)';
                    markerColor = '#ffffff';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(oIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '14px 18px',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${optionBorder}`,
                        backgroundColor: optionBg,
                        color: 'var(--text-primary)',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '0.92rem',
                        cursor: isAnswered ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: markerBg === 'transparent' ? '2px solid var(--text-tertiary)' : 'none',
                        backgroundColor: markerBg,
                        color: markerColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        flexShrink: 0
                      }}>
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span style={{ flexGrow: 1 }}>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanations Block */}
              {isAnswered && (
                <div style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  borderLeft: '4px solid var(--accent)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  marginTop: '8px'
                }}>
                  <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {selectedOptionIndex === quizQuestions[currentQuestionIndex].correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                  </strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {quizQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Quiz Continue Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  disabled={!isAnswered}
                  onClick={handleNextQuestion}
                  style={{
                    backgroundColor: isAnswered ? 'var(--primary)' : '#cbd5e1',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 24px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: isAnswered ? 'pointer' : 'default',
                    transition: 'background-color 0.2s'
                  }}
                >
                  {currentQuestionIndex + 1 === quizQuestions.length ? "Finish Quiz" : "Continue"}
                </button>
              </div>

            </div>
          ) : (
            // Quiz Results screen
            <div style={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #d2dbe5', 
              borderRadius: 'var(--radius-lg)', 
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: score >= 4 ? 'var(--success-light)' : 'var(--accent-light)',
                color: score >= 4 ? 'var(--success)' : 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '800'
              }}>
                {score}/5
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {score === 5 ? "Perfect Score!" : score >= 3 ? "Great Job!" : "Keep Studying!"}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.6' }}>
                  {score === 5 
                    ? "Excellent! You are well on your way to passing the FTCE Professional Education Test." 
                    : score >= 3 
                      ? "Good effort! A little more study and you'll be fully prepared to ace this exam." 
                      : "Don't worry! PrepSummit has all the resources, practice questions, and guides to help you master these concepts."}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActivePage('signup')}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 28px',
                    fontWeight: '850',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Unlock full test prep
                </button>
                <button
                  onClick={handleRestartQuiz}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1.5px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 28px',
                    color: 'var(--text-secondary)',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer'
                  }}
                >
                  Retake quiz
                </button>
              </div>
            </div>
          )}

          {/* Under Quiz practice check banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
                Check your knowledge of this course with a practice test
              </span>
            </div>
            <button
              onClick={() => setActivePage('signup')}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid var(--primary)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary)',
                padding: '8px 20px',
                fontWeight: '750',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = 'var(--primary-light)'}
              onMouseOut={e => e.target.style.backgroundColor = '#ffffff'}
            >
              Take practice test
            </button>
          </div>

        </div>
      </section>

      {/* 4. Trustpilot & Student Testimonials Block */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }} id="testimonials-section">
        <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
          What students are saying
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '32px', alignItems: 'start' }} className="course-detail-layout-grid">
          
          {/* Left Testimonial Card */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid var(--border-light)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '28px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--accent)', height: '24px', display: 'block', lineHeight: '1', fontFamily: 'serif' }}>
              “
            </span>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontStyle: 'italic' }}>
              I was very nervous about taking the General Knowledge exam. PrepSummit saved me! The video lessons were short and clear, and the quizzes helped me find my weak areas. I passed on my first try!
            </p>
            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '12px', marginTop: '4px' }}>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>— Hollie</strong>
              <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Teacher in Florida</span>
            </div>
          </div>

          {/* Right Trustpilot & User Cards grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Trustpilot logo replicas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '16px' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: '850', color: 'var(--text-primary)', letterSpacing: '-0.4px' }}>
                ★ Trustpilot
              </span>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(idx => (
                  <div key={idx} style={{ width: '16px', height: '16px', backgroundColor: '#00b67a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>★</div>
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '700' }}>
                TrustScore <strong style={{ color: 'var(--text-primary)' }}>4.6</strong> | 2,860 reviews
              </span>
            </div>

            {/* Stacked reviews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ff9800', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', flexShrink: 0 }}>
                  ET
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Encik Micah Ray Thomas
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    Excellent study guide! The video explanations are amazing, especially for complex teaching competencies.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#795548', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', flexShrink: 0 }}>
                  M
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Margot
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    The practice tests are very similar to the actual FTCE exam. Highly recommend PrepSummit to any teacher candidate!
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '12px 0' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ffeb3b', color: '#333333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', flexShrink: 0 }}>
                  NB
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Nina Bell
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    I love the self-paced structure. The lessons are bite-sized and very easy to follow.
                  </p>
                </div>
              </div>

            </div>

            <button
              onClick={() => setActivePage('signup')}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'transparent',
                border: '1.5px solid var(--primary)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--primary)',
                padding: '8px 20px',
                fontWeight: '750',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                marginTop: '8px'
              }}
              onMouseOver={e => e.target.style.backgroundColor = 'var(--primary-light)'}
              onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
            >
              View more reviews
            </button>

          </div>

        </div>
      </section>

      {/* 5. Syllabus Tab Component & Expandable Accordions */}
      <section style={{ 
        width: '100%', 
        backgroundColor: '#ffffff', 
        border: '1px solid var(--border-light)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        
        {/* Horizontal Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '2.5px solid var(--border-light)', 
          marginBottom: '24px', 
          gap: '16px',
          overflowX: 'auto'
        }}>
          {['Overview', 'Syllabus', 'Test'].map(tabName => (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              style={{
                padding: '12px 24px',
                background: 'none',
                border: 'none',
                color: activeTab === tabName ? 'var(--primary)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                fontSize: '1.05rem',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.2s',
                outline: 'none'
              }}
            >
              {tabName}
              {activeTab === tabName && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '-2.5px',
                  height: '3px',
                  backgroundColor: 'var(--primary)',
                  borderRadius: '2px'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Tab Render Area */}
        <div>
          
          {/* OVERVIEW TAB CONTENT */}
          {activeTab === 'Overview' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                This comprehensive study guide is meticulously designed to help you prepare for the <strong>FTCE Professional Education Test (PEd)</strong>. Featuring self-paced video lessons and detailed interactive test explanations, PrepSummit ensures you master Florida's teacher competencies with confidence.
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px', 
                backgroundColor: 'var(--bg-tertiary)', 
                padding: '20px', 
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Number of questions</span>
                  <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--text-primary)' }}>110 Multiple Choice</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Time limit</span>
                  <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--text-primary)' }}>2.5 Hours</strong>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Passing score</span>
                  <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--text-primary)' }}>Scaled Score 200</strong>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('Syllabus')}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 28px',
                  fontWeight: '700',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                Browse Syllabus Chapters
              </button>
            </div>
          )}

          {/* SYLLABUS TAB CONTENT (Accordions) */}
          {activeTab === 'Syllabus' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {syllabusChapters.map(chapter => {
                const isOpen = expandedChapters[chapter.id];
                return (
                  <div 
                    key={chapter.id} 
                    style={{ 
                      border: '1px solid var(--border-light)', 
                      borderRadius: 'var(--radius-md)', 
                      overflow: 'hidden' 
                    }}
                  >
                    
                    {/* Chapter Accordion Header */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        backgroundColor: '#f8fafc',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <strong style={{ fontSize: '0.98rem', fontWeight: '800' }}>
                          Chapter {chapter.id}: {chapter.title}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>
                          {chapter.lessons.length} lessons
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-tertiary)' }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>

                    {/* Accordion content list of lessons */}
                    {isOpen && (
                      <div style={{ 
                        borderTop: '1px solid var(--border-light)', 
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {chapter.lessons.map((lesson, index) => {
                          const isSpecialLesson = chapter.id === 1 && index === 0;
                          return (
                            <div 
                              key={index} 
                              style={{ 
                                padding: '16px 20px', 
                                borderBottom: index + 1 === chapter.lessons.length ? 'none' : '1px solid #e2e8f0',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span 
                                  onClick={() => handleCourseClick('ftce-professional-education-test')}
                                  style={{ 
                                    fontSize: '0.92rem', 
                                    fontWeight: '700', 
                                    color: 'var(--primary)', 
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                  }}
                                >
                                  {lesson.title}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>
                                  {lesson.duration}
                                </span>
                              </div>

                              {/* Description details for the passing score lesson */}
                              {isSpecialLesson && (
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '4px 0 0 0' }}>
                                  {lesson.desc}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          )}

          {/* TEST TAB CONTENT */}
          {activeTab === 'Test' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Ready to test your knowledge? Take our comprehensive, full-length practice exam designed to mimic the actual FTCE Professional Education Test interface and content weightings.
              </p>
              
              <div style={{ borderLeft: '4.5px solid var(--accent)', paddingLeft: '16px', margin: '8px 0' }}>
                <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Features of the full practice test:
                </strong>
                <ul style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.6' }}>
                  <li>Realistic, timed constraints (150 minutes limit)</li>
                  <li>Diagnostic score reports mapped to the 8 test competencies</li>
                  <li>Detailed explanation writeups for every single option choice</li>
                </ul>
              </div>

              <button
                onClick={() => setActivePage('signup')}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'var(--accent)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 28px',
                  fontWeight: '850',
                  fontSize: '0.92rem',
                  cursor: 'pointer'
                }}
              >
                Take Free Practice Test
              </button>
            </div>
          )}

        </div>

      </section>

      {/* 6. Recommended Lessons and Courses (Horizontal Slider / Cards List) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
          Recommended lessons and courses for you
        </h2>

        {/* Scrollable list of courses */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          overflowX: 'auto', 
          paddingBottom: '16px',
          scrollbarWidth: 'thin'
        }}>
          
          {/* Card 1: FTCE GK (Mock course, links to catalog) */}
          <div style={{
            flex: '0 0 260px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
            onClick={() => { setSearchQuery('FTCE'); setActivePage('catalog'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#eef6f9' }}>
              <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&auto=format&fit=crop&q=80" alt="FTCE GK" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>FTCE Exams</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                FTCE General Knowledge Test (GK) Reading (827)
              </strong>
              <div style={{ display: 'flex', color: '#ffb627', gap: '2px' }}>
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
              </div>
            </div>
          </div>

          {/* Card 2: AP Calculus */}
          <div style={{
            flex: '0 0 260px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
            onClick={() => handleCourseClick('ap-calculus')}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#eef6f9' }}>
              <img src="https://images.unsplash.com/photo-1453733190148-c44698c26588?w=300&auto=format&fit=crop&q=80" alt="AP Calculus" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--math-color)' }}>Mathematics</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                AP Calculus BC: Test Preparation & Practice Guide
              </strong>
              <div style={{ display: 'flex', color: '#ffb627', gap: '2px' }}>
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
              </div>
            </div>
          </div>

          {/* Card 3: Cell Biology */}
          <div style={{
            flex: '0 0 260px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
            onClick={() => handleCourseClick('cell-biology')}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#eef6f9' }}>
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&auto=format&fit=crop&q=80" alt="Cell Biology" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--science-color)' }}>Science</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                College Prep Cell Biology: Concepts & Practice
              </strong>
              <div style={{ display: 'flex', color: '#ffb627', gap: '2px' }}>
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
              </div>
            </div>
          </div>

          {/* Card 4: Psychology */}
          <div style={{
            flex: '0 0 260px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
            onClick={() => handleCourseClick('intro-psychology')}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#eef6f9' }}>
              <img src="https://images.unsplash.com/photo-1518291344630-48572d739f43?w=300&auto=format&fit=crop&q=80" alt="Psychology" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--psych-color)' }}>Humanities</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                Introduction to Psychology: Mind & Behavior
              </strong>
              <div style={{ display: 'flex', color: '#ffb627', gap: '2px' }}>
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
              </div>
            </div>
          </div>

          {/* Card 5: Macroeconomics */}
          <div style={{
            flex: '0 0 260px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
            onClick={() => handleCourseClick('macroeconomics')}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#eef6f9' }}>
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=80" alt="Macroeconomics" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--econ-color)' }}>Business</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                Macroeconomics: Fiscal Policy, GDP & Currency
              </strong>
              <div style={{ display: 'flex', color: '#ffb627', gap: '2px' }}>
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
                <Star size={12} fill="#ffb627" stroke="none" />
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
