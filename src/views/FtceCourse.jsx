import { useState } from 'react';
import { 
  Search, BookOpen, Star, Check, Play, HelpCircle, 
  Award, Clock, ChevronDown, ChevronUp, ChevronRight,
  Layers, CheckSquare, FileText, Tv
} from 'lucide-react';

export default function FtceCourse({ 
  courses, 
  activeTab, 
  setActiveTab, 
  setActivePage, 
  setSearchQuery, 
  onSelectCourse, 
  onSelectLesson,
  onStartSignup
}) {
  // Search state
  const [homeSearchInput, setHomeSearchInput] = useState('');

  // Accordion state (Chapters 1 to 10)
  // Chapter 1 is open by default (true), others closed (false)
  const [expandedChapters, setExpandedChapters] = useState({
    1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false
  });
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);

  // Expand / Collapse all accordion actions
  const expandAllChapters = () => {
    setExpandedChapters({
      1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true
    });
  };

  const collapseAllChapters = () => {
    setExpandedChapters({
      1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false
    });
  };

  // Toggle chapter collapse/expand
  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  // 5 Quiz Questions for Study Guide View
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

  // 3 Quiz Questions for Practice Test (Exam) View
  const examQuestions = [
    {
      question: "Ms. Hudson is a high school science teacher. She wants to increase the levels of active engagement in her classroom. Currently, she requires a lot of teacher-student engagement through a variety of activities. However, she wants to increase the amount of student-student engagement. Which of the following strategies should she implement?",
      options: [
        "Cold calling",
        "Higher order questioning",
        "Partner Share",
        "Bellringer"
      ],
      correctAnswer: 2,
      explanation: "Partner Share (also known as Think-Pair-Share) is a collaborative learning strategy where students discuss their ideas with a peer, directly increasing student-to-student engagement."
    },
    {
      question: "Which of the following is the most suitable strategy for helping English Language Learners (ELLs) understand new academic vocabulary during a science lesson?",
      options: [
        "Provide a dictionary and have them write definitions",
        "Use visual aids, gestures, and contextual definition cards",
        "Ask them to read the textbook chapter twice",
        "Excuse them from vocabulary assessments"
      ],
      correctAnswer: 1,
      explanation: "Visual aids, gestures, and contextual vocabulary cards provide comprehensible input for ELLs, helping them connect words to concrete concepts without relying solely on translation."
    },
    {
      question: "Under the Florida Code of Ethics, a teacher's primary professional concern must always be for ______.",
      options: [
        "The school administration",
        "The student and the development of the student's potential",
        "The local teacher union",
        "The teacher's own professional record"
      ],
      correctAnswer: 1,
      explanation: "The Code of Ethics of the Education Profession in Florida states that the educator's primary professional concern will always be for the student and the development of the student's potential."
    }
  ];

  // 10 Syllabus Chapters Mapping (Screenshot 561)
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
      title: "Instructional Design & Curriculum Planning",
      lessons: [
        { title: "Florida Educator Accomplished Practices (FEAPs) Overview", duration: "7 mins" },
        { title: "Analyzing Cognitive, Social, and Physical Development", duration: "8 mins" },
        { title: "Establishing Measurable Learning Objectives", duration: "6 mins" },
        { title: "Selecting and Adapting Standards-Aligned Materials", duration: "5 mins" }
      ]
    },
    {
      id: 3,
      title: "Learning Environments & Classroom Management",
      lessons: [
        { title: "Establishing Classroom Rules, Procedures, and Expectations", duration: "6 mins" },
        { title: "Behavior Intervention Plans & Positive Reinforcement", duration: "7 mins" },
        { title: "Optimizing the Physical and Emotional Learning Space", duration: "5 mins" }
      ]
    },
    {
      id: 4,
      title: "Instructional Delivery & Facilitation",
      lessons: [
        { title: "Active Learning & Student-Centered Engagement Strategies", duration: "8 mins" },
        { title: "Integrating Assistive and Instructional Technology", duration: "6 mins" },
        { title: "Collaborative Learning Structures & Group Work Dynamics", duration: "7 mins" }
      ]
    },
    {
      id: 5,
      title: "Assessing Student Learning",
      lessons: [
        { title: "Formative vs. Summative Assessments: Best Practices", duration: "7 mins" },
        { title: "Designing Validity-Aligned Rubrics & Examinations", duration: "8 mins" },
        { title: "Interpreting Assessment Performance & Standardized Scores", duration: "9 mins" }
      ]
    },
    {
      id: 6,
      title: "Professional Development for Educators",
      lessons: [
        { title: "Principles of Continuous Professional Improvement", duration: "7 mins" },
        { title: "Analyzing Student Performance Data for Lesson Planning", duration: "8 mins" },
        { title: "Participating in Learning Communities & Peer Feedback", duration: "6 mins" }
      ]
    },
    {
      id: 7,
      title: "Ethics & Professional Conduct for Florida Educators",
      lessons: [
        { title: "Code of Ethics of the Education Profession in Florida", duration: "8 mins" },
        { title: "Legal Rights and Mandated Reporting Responsibilities", duration: "7 mins" },
        { title: "FERPA Compliance: Maintaining Student Record Confidentiality", duration: "6 mins" }
      ]
    },
    {
      id: 8,
      title: "Teaching English Language Learners (ELLs)",
      lessons: [
        { title: "Language Acquisition Stages & Bilingual Strategies", duration: "8 mins" },
        { title: "Modifying Instruction and Materials for ELL Students", duration: "7 mins" },
        { title: "Culturally Responsive Teaching in the ELL Classroom", duration: "6 mins" }
      ]
    },
    {
      id: 9,
      title: "Literacy Strategies Across the Curriculum",
      lessons: [
        { title: "Integrating Reading and Writing Skills in Content Areas", duration: "7 mins" },
        { title: "Vocabulary Acquisition and Text Comprehension Methods", duration: "8 mins" },
        { title: "Selecting Diverse and Level-Appropriate Texts", duration: "6 mins" }
      ]
    },
    {
      id: 10,
      title: "FTCE GK Reading & General Test Prep Review",
      lessons: [
        { title: "Overlapping Competencies: General Knowledge & PEd", duration: "8 mins" },
        { title: "Time Management and Test-Taking Strategies", duration: "7 mins" },
        { title: "Final Review: Competency Checklist and Practice Exam Tips", duration: "10 mins" }
      ]
    }
  ];

  // FAQs Array (Test View)
  const faqList = [
    {
      question: "How is the FTCE 083 scored?",
      answer: "The passing score for the FTCE Professional Education exam is 200 points. This score is scaled, meaning the raw score has been standardized to account for changes to the exam's relative difficulty. The scale ranges from 100-300 points, with 100 as the lowest and 300 as the highest possible score."
    },
    {
      question: "How do you score an FTCE Professional Education 083 practice test?",
      answer: "The FTCE Professional Exam practice test needs to be completed before any of the results are shown. Upon completing the test, learners will know whether they passed or failed, and can check out their completion time, accuracy of responses, and other informative stats."
    },
    {
      question: "How many questions are on the FTCE 083?",
      answer: "Specific question counts are unavailable. However, the test has approximately 80 questions to answer over the span of 150 minutes. These questions are taken from the test's eight subsections, or competencies. Two of the largest competencies, instructional design and instructional delivery, are worth roughly 36% of the total score."
    },
    {
      question: "How to prepare for the FTCE 083?",
      answer: "The FTCE Professional Education practice test on PrepSumit.com is a popular choice among online learners. Our practice tests help learners by simulating the experience of taking the real test so that they can be fully prepared when the day arrives."
    },
    {
      question: "If I don't pass, can I retake the test?",
      answer: "Yes, you can retake the FTCE 083 exam if you don't pass the first time. You'll need to wait 31 days before trying again, and you'll have to register and pay the retake fee just like the first time. The good news is that there's no limit on how many times you can retake it, so you can keep practicing and improving until you pass. Each attempt has the same format and time limit, so using practice tests and review materials in between attempts can really help boost your chances of success."
    },
    {
      question: "Who receives my test scores and when?",
      answer: "Your FTCE Professional Education exam scores are sent to both you (through your FTCE/FELE account) and the Florida Department of Education's Bureau of Educator Certification. If you chose a college or university as a score recipient during registration, they will also receive your results. Scores are typically released within a few weeks after your test date, and you'll get an email once they are available online."
    }
  ];

  // FAQ state is not used in flat FAQ layout

  // Study Guide Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Exam Quiz state
  const [examQIndex, setExamQIndex] = useState(0);
  const [selectedExamOption, setSelectedExamOption] = useState(null);
  const [isExamAnswered, setIsExamAnswered] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);

  // Handles search redirects to the course catalog
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!homeSearchInput.trim()) return;
    setSearchQuery(homeSearchInput);
    setActivePage('search');
  };

  // Handles clicking a recommended course
  const handleCourseClick = (courseId) => {
    const found = courses.find(c => c.id === courseId);
    if (found && onSelectCourse) {
      onSelectCourse(found);
    } else {
      setActivePage('catalog');
    }
  };

  // Lesson Click triggers navigation to the Player
  const handleLessonClick = (chapterId, lessonIdx) => {
    if (chapterId === 1) {
      const ftceCourse = courses.find(c => c.id === 'ftce-professional-education-test');
      if (ftceCourse) {
        const lessonIds = ['ftce-passing-score', 'ftce-what-is-on-test', 'ftce-registration-how-to', 'ftce-retake-policy'];
        const lessonId = lessonIds[lessonIdx];
        const lesson = ftceCourse.lessons.find(l => l.id === lessonId);
        if (lesson && onSelectLesson) {
          onSelectCourse(ftceCourse);
          onSelectLesson(lesson);
          return;
        }
      }
    }
    handleLockLesson();
  };

  const handleLockLesson = () => {
    // For other chapters, show mock lessons click as signup prompt
    onStartSignup();
  };

  // Quiz interactive triggers (Study Guide)
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

  // Exam Quiz triggers
  const handleExamOptionSelect = (optionIndex) => {
    if (isExamAnswered) return;
    setSelectedExamOption(optionIndex);
    isExamAnswered || setIsExamAnswered(true);
    if (optionIndex === examQuestions[examQIndex].correctAnswer) {
      setExamScore(prev => prev + 1);
    }
  };

  const handleNextExamQuestion = () => {
    if (examQIndex + 1 < examQuestions.length) {
      setExamQIndex(prev => prev + 1);
      setSelectedExamOption(null);
      setIsExamAnswered(false);
    } else {
      setExamCompleted(true);
    }
  };

  const handleRestartExamQuiz = () => {
    setExamQIndex(0);
    setSelectedExamOption(null);
    setIsExamAnswered(false);
    setExamScore(0);
    setExamCompleted(false);
  };


  // 1. RENDER PRACTICE TEST (EXAM) VIEW
  if (activeTab === 'Test') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'var(--font-body)' }}>
        
        {/* Full-width dark teal hero box */}
        <div style={{ 
          backgroundColor: '#042a33', 
          color: '#ffffff', 
          width: '100vw', 
          position: 'relative', 
          left: '50%', 
          right: '50%', 
          marginLeft: '-50vw', 
          marginRight: '-50vw',
          padding: '40px 24px',
          marginBottom: '40px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }} className="exam-hero-grid">
            {/* Hero details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <a href="/" onClick={(e) => { e.preventDefault(); setActivePage('home'); setSearchQuery(''); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Test Prep Courses</a>
                <ChevronRight size={10} />
                <a href="/ftce" onClick={(e) => { e.preventDefault(); setActiveTab('Overview'); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>FTCE Professional Education (PEd) (083) Study Guide and Exam Prep</a>
              </div>
              
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', color: '#ffffff', margin: 0 }}>
                FTCE Professional Education (PEd) (083) Practice Test
              </h1>
              
              <p style={{ fontSize: '1.15rem', opacity: 0.95, fontWeight: '600' }}>
                92% of our students passed their exam*
              </p>

              <button 
                onClick={() => {
                  const quizElement = document.getElementById('practice-test-widget');
                  if (quizElement) {
                    quizElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px 32px',
                  fontWeight: '800',
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
                onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
              >
                Start your free practice test
              </button>
            </div>

            {/* Illustrated vector desk scene SVG (Premium PrepSumit.com look representation) */}
            <div style={{ display: 'flex', justifyContent: 'center' }} className="desktop-only">
              <svg width="340" height="260" viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Circle Background */}
                <circle cx="170" cy="130" r="110" fill="#0d414a" />
                <circle cx="170" cy="130" r="95" fill="#135561" />
                {/* Desk Base line */}
                <line x1="40" y1="210" x2="300" y2="210" stroke="#ffb627" strokeWidth="4" strokeLinecap="round" />
                {/* Laptop base */}
                <rect x="110" y="195" width="120" height="8" rx="2" fill="#d2dbe5" />
                <polygon points="120,195 220,195 230,150 110,150" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
                {/* Smiling Girl Avatar representation */}
                <circle cx="170" cy="100" r="34" fill="#ffb627" /> {/* Face outline */}
                <path d="M148 100 C148 70, 192 70, 192 100 Z" fill="#4a3728" /> {/* Hair */}
                <path d="M150 102 C150 120, 190 120, 190 102 Z" fill="#ffb627" /> {/* Face bottom */}
                <circle cx="162" cy="102" r="2.5" fill="#222222" /> {/* Eyes */}
                <circle cx="178" cy="102" r="2.5" fill="#222222" />
                <path d="M166 110 Q170 114 174 110" stroke="#222222" strokeWidth="2" strokeLinecap="round" /> {/* Smile */}
                {/* Body clothes */}
                <path d="M136 150 L204 150 L195 195 L145 195 Z" fill="#c05c5c" />
                {/* Floating academic items */}
                {/* Book */}
                <rect x="65" y="80" width="36" height="24" rx="2" fill="#3b82f6" transform="rotate(-15 65 80)" />
                <line x1="72" y1="88" x2="90" y2="83" stroke="white" strokeWidth="2" transform="rotate(-15 65 80)" />
                {/* Light bulb */}
                <circle cx="270" cy="90" r="12" fill="#ffb627" />
                <path d="M266 102 L274 102" stroke="#222222" strokeWidth="2" />
                {/* Checkmark badge */}
                <circle cx="260" cy="160" r="14" fill="#10b981" />
                <path d="M254 160 L258 164 L267 155" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Practice Test Body (MaxWidth 1200px) */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
          
          {/* Section 1: 4 Suite cards */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', textAlign: 'center', margin: 0 }}>
              Your full suite of study tools for the FTCE Professional Education Test (PEd)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', width: '100%' }}>
              
              {/* Card 1 */}
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <CheckSquare size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Practice Questions</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Build confidence with multiple practice tests and feedback.</span>
              </div>

              {/* Card 2 */}
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <Tv size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Videos</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Bite-sized videos simplify complex educational concepts.</span>
              </div>

              {/* Card 3 */}
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <FileText size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Lessons</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Read written summaries of the video lectures.</span>
              </div>

              {/* Card 4 */}
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <Layers size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Flashcards</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Review key vocabulary and teacher competencies.</span>
              </div>

            </div>
          </section>

          {/* Section 2: Banner CTA */}
          <div style={{ 
            backgroundColor: '#eef6f9', 
            padding: '20px 24px', 
            borderRadius: 'var(--radius-lg)', 
            border: '1.5px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '4px', margin: 0 }}>
                Create an account to study for the exam today
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                Used by over 30 million learners and educators each month
              </p>
            </div>
            <button 
              onClick={() => onStartSignup()}
              style={{
                backgroundColor: '#ffb627',
                color: '#222222',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 24px',
                fontWeight: '800',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Create an account
            </button>
          </div>

          {/* Section 3: Centered informational & FAQ text stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Understanding the FTCE 083 Exam
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                The FTCE 083 exam is intended for candidates who wish to teach professionally in the state of Florida. This comprehensive test covers many subjects throughout its eight competencies. Instructional design & delivery techniques, literacy strategies, and professional conduct are just a few of the topics test-takers are expected to know before writing the exam. This test consists of approximately 80 multiple-choice questions to be answered over the span of 150 minutes.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                FTCE 083 Exam Overview
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
                There are eight competencies tested on the FTCE 083 exam:
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.5' }}>
                <li>Knowledge of instructional design and planning (18%)</li>
                <li>Knowledge of appropriate student-centered learning environments (15%)</li>
                <li>Knowledge of instructional delivery and facilitation through a comprehensive understanding of subject matter (18%)</li>
                <li>Knowledge of various types of assessment strategies for determining impact on student learning (14%)</li>
                <li>Knowledge of relevant continuous professional improvement (12%)</li>
                <li>Knowledge of the Principles of Professional Conduct of the Education Profession in Florida (9%)</li>
                <li>Knowledge of research-based practices appropriate for teaching English Language Learners (ELLs) (7%)</li>
                <li>Knowledge of effective literacy strategies that can be applied across the curriculum to impact student learning (7%)</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Benefits of the FTCE 083 Practice Test
              </h3>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Add our FTCE Professional Education practice test to your study routine to experience its numerous benefits. Practice tests on PrepSumit.com prepare learners by offering explanations for every test answer and going over the most important concepts to know. Perks like these make the FTCE 083 practice test an ideal tool for future professional educators in Florida. Candidates also gain access to many insights into the test content when they complete this test. Submit the free practice exam to view your passing status, strengths, weaknesses, and more. On PrepSumit.com, learners and educators are given equal opportunity to excel. Visit PrepSumit.com today to view millions of expert-created learning materials.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                How to Use the FTCE 083 Practice Test Effectively
              </h3>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                The FTCE 083 practice test on PrepSumit.com is a popular choice among online learners. Take this practice test to experience how taking the real test feels so that you can be fully prepared when the day arrives. Complete this test to see the results and how you stand regarding the actual test. Upon completing the FTCE 082 practice test, learn whether you passed or failed, and check out your completion time, accuracy of responses, and other informative stats. Learn from your mistakes, retake the practice test as many times as needed, and improve your score efficiently.
              </p>
            </div>

            {/* FAQs List Section (Interactive accordion with animated rotation of greater than sign) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                FAQs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqList.map((faq, idx) => {
                  const isExpanded = activeFaqIdx === idx;
                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        borderBottom: '1px solid #e2e8f0', 
                        paddingBottom: '12px',
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
                          padding: '8px 0',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <span style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4' }}>
                          {faq.question}
                        </span>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '1.25rem',
                          fontWeight: '900',
                          fontFamily: 'monospace',
                          transition: 'transform 0.2s ease',
                          transform: isExpanded ? 'rotate(90deg)' : 'rotate(-90deg)',
                          color: '#13809c',
                          marginLeft: '16px',
                          userSelect: 'none'
                        }}>
                          &gt;
                        </span>
                      </button>
                      <div style={{
                        maxHeight: isExpanded ? '500px' : '0px',
                        transition: 'all 0.3s cubic-bezier(0, 1, 0, 1)',
                        opacity: isExpanded ? 1 : 0
                      }}>
                        <p style={{ 
                          fontSize: '0.94rem', 
                          color: 'var(--text-secondary)', 
                          lineHeight: '1.6', 
                          margin: '8px 0 0 0',
                          paddingRight: '24px'
                        }}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Start Practice Test Trigger Button (Screenshot 574 - Centered blue button) */}
            <button 
              onClick={() => {
                const quizElement = document.getElementById('practice-test-widget');
                if (quizElement) {
                  quizElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                alignSelf: 'center',
                backgroundColor: '#eef6f9',
                color: 'var(--primary)',
                border: '1.5px solid var(--primary)',
                borderRadius: '4px',
                padding: '12px 36px',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                marginTop: '20px',
                marginBottom: '10px'
              }}
              onMouseOver={e => { e.target.style.backgroundColor = 'var(--primary)'; e.target.style.color = '#ffffff'; }}
              onMouseOut={e => { e.target.style.backgroundColor = '#eef6f9'; e.target.style.color = 'var(--primary)'; }}
            >
              Start your free practice test
            </button>

            {/* Second Banner CTA */}
            <div style={{ 
              backgroundColor: '#eef6f9', 
              padding: '20px 24px', 
              borderRadius: 'var(--radius-lg)', 
              border: '1.5px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              width: '100%',
              marginBottom: '20px'
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '4px', margin: 0 }}>
                  Create an account to study for the exam today
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Used by over 30 million learners and educators each month
                </p>
              </div>
              <button 
                onClick={() => onStartSignup()}
                style={{
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 24px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Create an account
              </button>
            </div>

          </div>

          {/* Section 4: Interactive 3-Question Practice Test Widget (Centered Full-Width Stream) */}
          <div id="practice-test-widget" style={{ 
            maxWidth: '850px', 
            margin: '0 auto', 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            scrollMarginTop: '100px'
          }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                FTCE Professional Education (PEd) (083) Practice Test
              </h3>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Answer practice questions and get explanations for every answer.
              </span>
            </div>

            {/* Quiz Box */}
            <div style={{ 
              backgroundColor: '#f1f6fa', 
              border: '1.5px solid #d2dbe5', 
              borderRadius: 'var(--radius-lg)', 
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: 'var(--shadow-md)',
              width: '100%'
            }}>
              {!examCompleted ? (
                <div style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid #cbd5e1', 
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-tertiary)' }}>
                    Answered {examQIndex} of 3 questions
                  </span>

                  <p style={{ fontSize: '1.05rem', fontWeight: '750', color: 'var(--text-primary)', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                    {examQIndex + 1}. {examQuestions[examQIndex].question}
                  </p>

                  {/* Radio Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {examQuestions[examQIndex].options.map((option, oIdx) => {
                      const isSelected = selectedExamOption === oIdx;
                      const isCorrect = examQuestions[examQIndex].correctAnswer === oIdx;
                      
                      let optBg = '#ffffff';
                      let optBorder = '#cbd5e1';
                      let dotColor = '#cbd5e1';
                      let dotBg = 'transparent';

                      if (isExamAnswered) {
                        if (isCorrect) {
                          optBg = 'var(--success-light)';
                          optBorder = 'var(--success)';
                          dotBg = 'var(--success)';
                          dotColor = '#ffffff';
                        } else if (isSelected) {
                          optBg = 'var(--error-light)';
                          optBorder = 'var(--error)';
                          dotBg = 'var(--error)';
                          dotColor = '#ffffff';
                        }
                      } else if (isSelected) {
                        optBg = 'var(--primary-light)';
                        optBorder = 'var(--primary)';
                        dotBg = 'var(--primary)';
                        dotColor = '#ffffff';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isExamAnswered}
                          onClick={() => handleExamOptionSelect(oIdx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            borderRadius: '4px',
                            border: `1.5px solid ${optBorder}`,
                            backgroundColor: optBg,
                            color: 'var(--text-primary)',
                            fontSize: '0.92rem',
                            fontWeight: '600',
                            textAlign: 'left',
                            cursor: isExamAnswered ? 'default' : 'pointer',
                            transition: 'all 0.15s ease',
                            width: '100%'
                          }}
                        >
                          <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: dotBg === 'transparent' ? '2px solid var(--text-tertiary)' : 'none',
                            backgroundColor: dotBg,
                            color: dotColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            fontWeight: '800',
                            flexShrink: 0
                          }}>
                            {dotBg !== 'transparent' && '✓'}
                          </div>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isExamAnswered && (
                    <div style={{ 
                      backgroundColor: 'var(--bg-tertiary)', 
                      borderLeft: '4px solid var(--accent)', 
                      padding: '16px', 
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      color: 'var(--text-secondary)'
                    }}>
                      <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)' }}>
                        {selectedExamOption === examQuestions[examQIndex].correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                      </strong>
                      {examQuestions[examQIndex].explanation}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <button
                      disabled={!isExamAnswered}
                      onClick={handleNextExamQuestion}
                      style={{
                        backgroundColor: isExamAnswered ? 'var(--primary)' : '#cbd5e1',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 24px',
                        fontWeight: '700',
                        fontSize: '0.9rem',
                        cursor: isExamAnswered ? 'pointer' : 'default',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      {examQIndex + 1 === examQuestions.length ? "Finish Test" : "Continue"}
                    </button>
                  </div>

                </div>
              ) : (
                // Results box
                <div style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid #cbd5e1', 
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '20px'
                }}>
                  <div style={{ 
                    width: '72px', height: '72px', borderRadius: '50%',
                    backgroundColor: examScore >= 2 ? 'var(--success-light)' : 'var(--error-light)',
                    color: examScore >= 2 ? 'var(--success)' : 'var(--error)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem', fontWeight: '800'
                  }}>
                    {examScore}/3
                  </div>
                  
                  <div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                      {examScore === 3 ? "Perfect Score!" : examScore >= 2 ? "Great Job!" : "Keep Practicing!"}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5', maxWidth: '400px' }}>
                      Unlock all 500+ realistic practice questions with a full subscription.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                    <button 
                      onClick={() => onStartSignup()}
                      style={{
                        backgroundColor: '#ffb627',
                        color: '#222222',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px 32px',
                        fontWeight: '850',
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                      }}
                    >
                      Unlock full test prep
                    </button>
                    <button 
                      onClick={handleRestartExamQuiz}
                      style={{
                        backgroundColor: 'transparent',
                        border: '1.5px solid #cbd5e1',
                        color: 'var(--text-secondary)',
                        borderRadius: '4px',
                        padding: '12px 32px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                      }}
                    >
                      Retake practice test
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Centered success metrics block (Centered circles, text below) */}
          <section style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid var(--border-light)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '40px 24px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px'
          }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', textAlign: 'center', margin: 0 }}>
              How our students succeed*
            </h2>

            {/* Circles and centered labels */}
            <div className="how-we-succeed-grid">
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ 
                  width: '84px', height: '84px', borderRadius: '50%', 
                  backgroundColor: '#0c2330', color: '#ffffff', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: '800', fontSize: '1.5rem' 
                }}>
                  92%
                </div>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600', maxWidth: '240px', lineHeight: '1.4' }}>
                  passed their exam after using PrepSumit.com
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ 
                  width: '84px', height: '84px', borderRadius: '50%', 
                  backgroundColor: '#0c2330', color: '#ffffff', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: '800', fontSize: '1.5rem' 
                }}>
                  96%
                </div>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600', maxWidth: '240px', lineHeight: '1.4' }}>
                  found PrepSumit.com a valuable test prep resource
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
                <div style={{ 
                  width: '84px', height: '84px', borderRadius: '50%', 
                  backgroundColor: '#0c2330', color: '#ffffff', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: '800', fontSize: '1.5rem' 
                }}>
                  94%
                </div>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: '600', maxWidth: '240px', lineHeight: '1.4' }}>
                  were more confident after using PrepSumit.com
                </span>
              </div>

            </div>
          </section>

          {/* Section 6: Press logo bar */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', padding: '16px 0' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              PrepSumit.com has been featured on
            </span>
            <div className="featured-logos-grid" style={{ opacity: 0.6 }}>
              {/* Logo Replicas using neat typography */}
              <strong style={{ fontSize: '1.5rem', color: '#000000', letterSpacing: '-1px' }}>CBS</strong>
              <strong style={{ fontSize: '1.5rem', color: '#000000' }}>NBC</strong>
              <strong style={{ fontSize: '1.5rem', color: '#000000', fontFamily: 'serif', fontStyle: 'italic' }}>Forbes</strong>
              <strong style={{ fontSize: '1.5rem', color: '#000000', letterSpacing: '-2px' }}>abc</strong>
              <strong style={{ fontSize: '1.5rem', color: '#000000', fontWeight: '900' }}>Inc.</strong>
              <strong style={{ fontSize: '1.5rem', color: '#000000', fontFamily: 'serif' }}>WSJ</strong>
              <strong style={{ fontSize: '1.3rem', color: '#000000', border: '1px solid #000000', padding: '2px 4px' }}>U.S.News</strong>
              <strong style={{ fontSize: '1.3rem', color: '#000000', letterSpacing: '-0.5px' }}>USA TODAY</strong>
            </div>

            {/* Bottom Centered CTA and disclaimer */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => onStartSignup()}
                style={{
                  backgroundColor: '#ffb627',
                  color: '#222222',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '12px 32px',
                  fontWeight: '850',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                Create an account
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Try it risk-free for 30 days
              </span>
            </div>
            
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic', marginTop: '10px' }}>
              *Percentages come from surveys of over 300 test prep customers.
            </span>
          </section>

          {/* Section 7: Big bottom call to action banner in dark teal */}
          <section style={{ 
            backgroundColor: '#042a33', 
            color: '#ffffff', 
            padding: '48px 32px', 
            borderRadius: 'var(--radius-xl)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            gap: '24px',
            width: '100%',
            boxShadow: 'var(--shadow-xl)',
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '1.8rem', color: '#ffffff', fontWeight: '800', margin: 0 }}>
              We help millions of students every month.
            </h3>
            <p style={{ fontSize: '1.1rem', opacity: 0.95, margin: 0 }}>
              Try it risk-free today! No obligation, cancel anytime.
            </p>
            <button 
              onClick={() => onStartSignup()}
              style={{
                backgroundColor: '#ffb627',
                color: '#222222',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 40px',
                fontWeight: '800',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
              onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
            >
              Start now
            </button>
          </section>

        </div>
      </div>
    );
  }

  // 2. DEFAULT RENDER: STUDY GUIDE VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', fontFamily: 'var(--font-body)', padding: '0 8px' }}>
      
      {/* Main Two-Column Layout Grid for PC / Desktop alignment (Left contains text/widgets, Right contains details sidebar) */}
      <div className="study-guide-main-grid">
        
        {/* Left Column Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
          
          {/* Breadcrumbs Row */}
          <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <a href="/catalog" onClick={(e) => { e.preventDefault(); setActivePage('catalog'); setSearchQuery(''); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>All Test Prep</a>
            <ChevronRight size={12} />
            <a href="/search?q=FTCE" onClick={(e) => { e.preventDefault(); setSearchQuery('FTCE'); setActivePage('search'); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>FTCE Test Preparation & Resources</a>
            <ChevronRight size={12} />
            <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>FTCE PEd</span>
          </div>

          {/* Heading Title & Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h1 style={{ fontSize: '2.3rem', fontWeight: '800', color: 'var(--primary-dark)', lineHeight: '1.2', margin: 0 }}>
              FTCE Professional Education Test (PEd) Study Guide and Test Prep
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', color: '#ffb627' }}>
                <Star size={16} fill="#ffb627" stroke="none" />
                <Star size={16} fill="#ffb627" stroke="none" />
                <Star size={16} fill="#ffb627" stroke="none" />
                <Star size={16} fill="#ffb627" stroke="none" />
                <Star size={16} fill="#ffb627" stroke="none" />
              </div>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>4.8/5</span>
              <span style={{ color: 'var(--text-tertiary)' }}>(318 reviews)</span>
            </div>
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

          {/* Course Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Course summary</h2>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              PrepSumit.com's FTCE Professional Education Test (083) study guide helps you prepare for this important Florida teacher certification exam with confidence. This comprehensive prep course features engaging video lessons, quick self-check quizzes, and realistic full-length practice tests designed to strengthen your teaching knowledge and test-taking skills. With your PrepSumit.com subscription, you'll have full access to this FTCE 083 study guide along with every other FTCE prep course.
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
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', marginBottom: '4px', margin: 0 }}>
                Create an account to start this course today
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Try it risk-free for 30 days
              </p>
            </div>
            <button 
              onClick={() => onStartSignup()}
              style={{
                backgroundColor: '#ffb627',
                color: '#222222',
                border: 'none',
                borderRadius: '4px',
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

          {/* How our students succeed metrics row */}
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
            <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', textAlign: 'center', margin: 0 }}>
              How our students succeed*
            </h2>

            {/* 3 Metric Badges (Horizontal format: circle left, text right) */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              width: '100%', 
              flexWrap: 'wrap', 
              gap: '24px' 
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 240px' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: '#0c2330', 
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
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  of students <strong>passed their exam</strong> after using PrepSumit.com*
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 240px' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: '#0c2330', 
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
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  found PrepSumit a <strong>valuable test prep</strong> resource
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 240px' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  backgroundColor: '#0c2330', 
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
                <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                  were <strong>more confident</strong> after using PrepSumit
                </span>
              </div>

            </div>
          </section>

          {/* Interactive Quiz Card Section */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                Try test-aligned practice questions for free
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
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
                  <p style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '8px', margin: 0 }}>
                    {currentQuestionIndex + 1}. {quizQuestions[currentQuestionIndex].question}
                  </p>

                  {/* Options list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {quizQuestions[currentQuestionIndex].options.map((option, oIdx) => {
                      const isSelected = selectedOptionIndex === oIdx;
                      const isCorrectAnswer = quizQuestions[currentQuestionIndex].correctAnswer === oIdx;
                      
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
                            transition: 'all 0.15s ease',
                            width: '100%'
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
                            {markerBg !== 'transparent' ? '✓' : String.fromCharCode(65 + oIdx)}
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
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
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
                        cursor: 'pointer',
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
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px', margin: 0 }}>
                      {score === 5 ? "Perfect Score!" : score >= 3 ? "Great Job!" : "Keep Studying!"}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: '1.6', margin: 0 }}>
                      {score === 5 
                        ? "Excellent! You are well on your way to passing the FTCE Professional Education Test." 
                        : score >= 3 
                          ? "Good effort! A little more study and you'll be fully prepared to ace this exam." 
                          : "Don't worry! PrepSumit has all the resources, practice questions, and guides to help you master these concepts."}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => onStartSignup()}
                      style={{
                        backgroundColor: '#ffb627',
                        color: '#222222',
                        border: 'none',
                        borderRadius: '4px',
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContainer: 'space-between', gap: '20px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.92rem', fontWeight: '750', color: 'var(--primary-dark)' }}>
                    Check your knowledge of this course with a practice test
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('Test')}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid var(--primary)',
                    borderRadius: '4px',
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

          {/* Trustpilot & Student Testimonials Block */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }} id="testimonials-section">
            <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
              What students are saying
            </h2>

            {/* Gray testimonial card (Screenshot 559) and Trustpilot score card */}
            <div className="testimonials-grid">
              
              {/* Left Testimonial Card */}
              <div style={{ 
                backgroundColor: '#f1f3f5', 
                borderRadius: 'var(--radius-lg)', 
                padding: '28px',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                minHeight: '220px'
              }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0, fontStyle: 'normal', fontWeight: '500' }}>
                  "I used PrepSumit.com to study for my FTCE Professional Education Test. It was an amazing resource, and I easily passed the state exam on my first attempt! Now I am going to use PrepSumit.com for my GK exams! I would definitely recommend this program to anyone."
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #d2dbe5', paddingTop: '12px', marginTop: '4px' }}>
                  <div>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Hollie</strong>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>On college credit success</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--success)', fontWeight: '700' }}>
                    Via <span style={{ color: 'var(--success)' }}>★</span> Trustpilot
                  </div>
                </div>
              </div>

              {/* Right Trustpilot & User Cards grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Trustpilot logo replicas */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '16px' }}>
                  <span style={{ fontSize: '1.35rem', fontWeight: '850', color: 'var(--text-primary)', letterSpacing: '-0.4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#00b67a' }}>★</span> Trustpilot reviews
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-primary)' }}>4.6</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1,2,3,4,5].map(idx => (
                      <div key={idx} style={{ width: '16px', height: '16px', backgroundColor: '#00b67a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: '700' }}>★</div>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    2860 reviews
                  </span>
                </div>

                {/* Stacked reviews */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ff9800', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', flexShrink: 0 }}>
                      ET
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#00b67a' }}>
                        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '12px' }}>★</span>)}
                        <span style={{ color: '#222222', fontSize: '11px', fontWeight: '700', marginLeft: '6px' }}>5</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        The best part about PrepSumit.com when compared to other test prep sites that I was using when preparing for my FTCE's was that PrepSumit.com was actually teaching and testing your comprehension in the subject matter whereas most other sites just gave you sample questions you would expect to find on the test. PrepSumit.com actually gave you ways to use the information you learned to make educated decisions and reasons for picking an answer as opposed to just memorizing which answer fits to what question.
                      </p>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                        Encik Micah Ray Thomas
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#795548', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', flexShrink: 0 }}>
                      M
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#00b67a' }}>
                        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '12px' }}>★</span>)}
                        <span style={{ color: '#222222', fontSize: '11px', fontWeight: '700', marginLeft: '6px' }}>5</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        I love this site. I was struggle to pass my FCTE general knowledge test. I took the math portion eight times. The site was recommended by a friend. I use the lessons provided on the site. After studying with PrepSumit.com. I passed my test.
                      </p>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                        Margot
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#ffc107', color: '#333333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '800', flexShrink: 0 }}>
                      NB
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', gap: '2px', color: '#00b67a' }}>
                        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '12px' }}>★</span>)}
                        <span style={{ color: '#222222', fontSize: '11px', fontWeight: '700', marginLeft: '6px' }}>5</span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        Trying to find the resources when studying for state licensure exams can be extremely difficult, but along came PrepSumit.com! I used PrepSumit.com to study for my FTCE k-12, FTCE Special Education, and Praxis Special Education exams. Without PrepSumit.com I would have failed but, I have passed 3/6, with only 3 left to take until all my exams are completed and one step closer to being a Special Ed Teacher. Thank you PrepSumit.com!
                      </p>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                        Nina Bell
                      </strong>
                    </div>
                  </div>

                </div>

                <button
                  onClick={() => onStartSignup()}
                  style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid var(--primary)',
                    borderRadius: '4px',
                    color: 'var(--primary)',
                    padding: '8px 20px',
                    fontWeight: '750',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    marginTop: '8px'
                  }}
                  onMouseOver={e => e.target.style.backgroundColor = 'var(--primary-light)'}
                  onMouseOut={e => e.target.style.backgroundColor = '#ffffff'}
                >
                  View more
                </button>

              </div>

            </div>
          </section>

          {/* Syllabus Tab Component & Expandable Accordions */}
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
              {['Overview', 'Syllabus', 'Test'].map(tabName => {
                return (
                  <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    style={{
                      padding: '12px 24px',
                      background: activeTab === tabName ? '#eef6f9' : 'none',
                      border: 'none',
                      color: activeTab === tabName ? 'var(--primary)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '800',
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s',
                      outline: 'none',
                      borderBottom: activeTab === tabName ? '3px solid var(--primary-dark)' : 'none',
                      borderRadius: '4px 4px 0 0'
                    }}
                  >
                    {tabName}
                  </button>
                );
              })}
            </div>

            {/* Tab Render Area */}
            <div>
              
              {/* OVERVIEW TAB CONTENT (Intro paragraph and competencies summary) */}
              {activeTab === 'Overview' && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                  <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    This comprehensive study guide is meticulously designed to help you prepare for the <strong>FTCE Professional Education Test (PEd)</strong>. Featuring self-paced video lessons and detailed interactive test explanations, PrepSumit ensures you master Florida's teacher competencies with confidence.
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
                </div>
              )}

              {/* SYLLABUS LIST (Rendered for both Overview and Syllabus tabs as in Screenshot 561) */}
              {(activeTab === 'Overview' || activeTab === 'Syllabus') && (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Header Title with Chapters count & Expand/Collapse All triggers */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                        FTCE Professional Education Test (PEd) Study Guide and Test Prep
                      </h3>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>
                        10 chapters | 105 lessons
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.88rem', fontWeight: '700', color: 'var(--primary)' }}>
                      <span onClick={expandAllChapters} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Expand all</span>
                      <span style={{ color: 'var(--text-tertiary)' }}>|</span>
                      <span onClick={collapseAllChapters} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Collapse all</span>
                    </div>
                  </div>

                  {/* Accordions inside Scrollable Container (Screenshot 561 layout) */}
                  <div className="syllabus-scroll-container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {syllabusChapters.map(chapter => {
                        const isOpen = expandedChapters[chapter.id];
                        return (
                          <div 
                            key={chapter.id} 
                            style={{ 
                              border: '1px solid var(--border-light)', 
                              borderRadius: 'var(--radius-md)', 
                              overflow: 'hidden',
                              boxShadow: 'var(--shadow-sm)'
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
                                justifyContainer: 'space-between',
                                alignItems: 'center',
                                color: 'var(--text-primary)',
                                justifyContent: 'space-between'
                              }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Chapter {chapter.id}</span>
                                <strong style={{ fontSize: '1.02rem', fontWeight: '800' }}>
                                  {chapter.title}
                                </strong>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }} className="desktop-only">
                                  {chapter.lessons.length} lessons
                                </span>
                                <div style={{ color: 'var(--text-tertiary)' }}>
                                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                              </div>
                            </button>

                            {/* Accordion list of lessons */}
                            {isOpen && (
                              <div style={{ 
                                borderTop: '1px solid var(--border-light)', 
                                backgroundColor: '#ffffff',
                                display: 'flex',
                                flexDirection: 'column'
                              }}>
                                {chapter.lessons.map((lesson, index) => {
                                  const isSpecialFirstLesson = chapter.id === 1 && index === 0;
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
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                                        <span 
                                          onClick={() => handleLessonClick(chapter.id, index)}
                                          style={{ 
                                            fontSize: '0.92rem', 
                                            fontWeight: '700', 
                                            color: 'var(--primary)', 
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            lineHeight: '1.3'
                                          }}
                                        >
                                          {lesson.title}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '600', flexShrink: 0 }}>
                                          {lesson.duration}
                                        </span>
                                      </div>

                                      {/* Detailed text for first lesson of Chapter 1 */}
                                      {isSpecialFirstLesson && (
                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '4px 0 0 0' }}>
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
                  </div>
                </div>
              )}

            </div>

          </section>

        </div>

        {/* Right Column: Sidebar (Course details card) */}
        <div>
          <div style={{ 
            backgroundColor: '#f2f6f9', 
            borderRadius: 'var(--radius-xl)', 
            border: '1.5px solid var(--border-light)', 
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
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

      </div>

      {/* Recommended Lessons and Courses (Full-Width, below the main layout grid) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        
        {/* Create an account to pass your exam today CTA banner (Screenshot 563) */}
        <div style={{ 
          backgroundColor: '#eef6f9', 
          padding: '24px 32px', 
          borderRadius: 'var(--radius-lg)', 
          border: '1.5px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          width: '100%'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
              Create an account to pass your exam today
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--success)' }}>✔</span> Expertly crafted content
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--success)' }}>✔</span> Learn anywhere, anytime
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--success)' }}>✔</span> Satisfaction guaranteed
              </div>
            </div>
          </div>
          <button 
            onClick={() => onStartSignup()}
            style={{
              backgroundColor: '#ffb627',
              color: '#222222',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 32px',
              fontWeight: '850',
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            Create an account
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
            Recommended lessons and courses for you
          </h2>
        </div>

        {/* Scrollable list of FTCE and custom courses (Screenshot 563) */}
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          overflowX: 'auto', 
          paddingBottom: '16px',
          scrollbarWidth: 'thin',
          position: 'relative'
        }}>
          
          {/* Card 1: FTCE Earth/Space Science */}
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
            onClick={() => { setSearchQuery('FTCE Science'); setActivePage('search'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80" alt="FTCE Earth Science" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>FTCE Exams</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                FTCE Earth/Space Science 6-12 (008) Study Guide
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

          {/* Card 2: FTCE General Knowledge Reading */}
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
            onClick={() => { setSearchQuery('FTCE GK Reading'); setActivePage('search'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&auto=format&fit=crop&q=80" alt="FTCE GK Reading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

          {/* Card 3: FTCE General Knowledge English */}
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
            onClick={() => { setSearchQuery('FTCE GK English'); setActivePage('search'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&auto=format&fit=crop&q=80" alt="FTCE GK English" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>FTCE Exams</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                FTCE General Knowledge Test (GK) English Language (826)
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

          {/* Card 4: FTCE School Psychologist */}
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
            onClick={() => { setSearchQuery('FTCE Psychologist'); setActivePage('search'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&auto=format&fit=crop&q=80" alt="FTCE Psychologist" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>FTCE Exams</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                FTCE School Psychologist PK-12 (036) Study Guide
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

          {/* Card 5: FTCE School Counseling */}
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
            onClick={() => { setSearchQuery('FTCE Counseling'); setActivePage('search'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&auto=format&fit=crop&q=80" alt="FTCE Counseling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>FTCE Exams</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                FTCE School Counseling PK-12 (018) Study Guide
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

          {/* Card 6: FTCE English */}
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
            onClick={() => { setSearchQuery('FTCE English'); setActivePage('search'); }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&auto=format&fit=crop&q=80" alt="FTCE English" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>FTCE Exams</span>
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', height: '42px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }}>
                FTCE English 6-12 (013) Study Guide and Exam Prep
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

          {/* Card 7: AP Calculus */}
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
            <div style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
              <img src="https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=300&auto=format&fit=crop&q=80" alt="AP Calculus" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

        </div>
      </section>

      {/* disclaimer footer */}
      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontStyle: 'italic', alignSelf: 'center', marginTop: '-10px', display: 'block' }}>
        *Percentages come from surveys of over 300 test prep customers.
      </span>

    </div>
  );
}
