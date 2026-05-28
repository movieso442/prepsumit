import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, BookOpen, Star, Check, Play, HelpCircle, 
  Award, Clock, ChevronDown, ChevronUp, ChevronRight,
  Layers, CheckSquare, FileText, Tv
} from 'lucide-react';

export default function PraxisCourse({ 
  courses, 
  activeTab, 
  setActiveTab, 
  setActivePage, 
  setSearchQuery, 
  onSelectCourse, 
  onSelectLesson,
  onStartSignup
}) {
  const [homeSearchInput, setHomeSearchInput] = useState('');
  const [expandedChapters, setExpandedChapters] = useState({
    1: true, 2: false, 3: false, 4: false, 5: false, 6: false
  });

  const expandAllChapters = () => {
    setExpandedChapters({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
  };

  const collapseAllChapters = () => {
    setExpandedChapters({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false });
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const quizQuestions = [
    {
      question: "Which of the following describes the primary purpose of a topic sentence in an essay paragraph?",
      options: [
        "To summarize the entire essay's central thesis",
        "To introduce the main idea of that specific paragraph",
        "To provide a counter-argument to the essay's claim",
        "To present a list of references and citations"
      ],
      correctAnswer: 1,
      explanation: "A topic sentence states the main point of a paragraph, guiding the reader through the paragraph's specific focus and connecting back to the overall thesis."
    },
    {
      question: "A teacher wants to help students identify the main theme of a story. Which question would be most effective?",
      options: [
        "What is the first event that happens in chapter one?",
        "What lesson does the main character learn by the end of the journey?",
        "How many pages are in this story?",
        "What is the name of the protagonist's dog?"
      ],
      correctAnswer: 1,
      explanation: "Asking what lesson the character learns encourages students to synthesize the plot and infer the broader thematic meaning of the narrative."
    },
    {
      question: "What is the mandatory waiting period before retaking a failed Praxis exam?",
      options: [
        "7 calendar days",
        "14 calendar days",
        "28 calendar days",
        "60 calendar days"
      ],
      correctAnswer: 2,
      explanation: "According to ETS guidelines, candidates must wait at least 28 calendar days from the date of the failed attempt before retaking the same Praxis exam."
    }
  ];

  const examQuestions = [
    {
      question: "What is the area of a right triangle with a base of 10 cm and a height of 6 cm?",
      options: [
        "60 sq cm",
        "30 sq cm",
        "20 sq cm",
        "15 sq cm"
      ],
      correctAnswer: 1,
      explanation: "The formula for the area of a triangle is 0.5 * base * height. For this triangle: 0.5 * 10 * 6 = 30 square centimeters."
    },
    {
      question: "Identify the grammatical error in the following sentence: 'The team of scientists were preparing to launch the rocket.'",
      options: [
        "Subject-verb agreement mismatch ('team... were')",
        "Incorrect spelling of 'scientists'",
        "Wrong preposition ('to launch')",
        "Incorrect tense usage"
      ],
      correctAnswer: 0,
      explanation: "The singular subject is 'team' (a collective noun), so the verb should be singular 'was' instead of plural 'were'. Thus, it should be 'The team of scientists was preparing...'"
    }
  ];

  const syllabusChapters = [
    {
      id: 1,
      title: "About the Praxis Core Academic Skills Exams",
      lessons: [
        { title: "Praxis Math: Geometry & Area Formulas", duration: "12 mins", desc: "Understand the geometric principles, Pythagorean theorem, and coordinate plane equations required to pass the Praxis Math subtest." },
        { title: "What is on the Praxis Core Exam? Section Breakdown", duration: "10 mins" },
        { title: "Praxis Registration | Scheduling and Test Locations", duration: "6 mins" },
        { title: "Praxis Retake Rules & Score Release Telemetry", duration: "5 mins" }
      ]
    },
    {
      id: 2,
      title: "Praxis Core Reading (5713) Preparation",
      lessons: [
        { title: "Determining Key Ideas and Structural Details", duration: "8 mins" },
        { title: "Analyzing Integration of Diverse Text Sources", duration: "9 mins" },
        { title: "Contextual Vocabulary & Tone Identification", duration: "7 mins" }
      ]
    },
    {
      id: 3,
      title: "Praxis Core Writing (5723) Competencies",
      lessons: [
        { title: "Subject-Verb Agreement and Sentence Correction", duration: "8 mins" },
        { title: "Structuring Persuasive and Informative Essays", duration: "10 mins" },
        { title: "Grammar, Punctuation, and Vocabulary Precision", duration: "7 mins" }
      ]
    },
    {
      id: 4,
      title: "Praxis Core Mathematics (5733) Foundations",
      lessons: [
        { title: "Ratios, Proportions, Percentages and Basic Algebra", duration: "9 mins" },
        { title: "Geometry Principles, Area Formulas, and Coordinate Plane", duration: "12 mins" },
        { title: "Interpreting Data Graphs, Tables, and Statistics", duration: "8 mins" }
      ]
    },
    {
      id: 5,
      title: "Teacher Preparation & Certification Strategies",
      lessons: [
        { title: "Time Management Strategies for Computer-Based Tests", duration: "7 mins" },
        { title: "Anxiety Reduction and Exam-Day Readiness Guides", duration: "6 mins" }
      ]
    }
  ];

  const faqList = [
    {
      question: "What is the passing score for the Praxis Core?",
      answer: "Passing scores vary by state, but the standard national requirements are typically 156 for Reading (5713), 162 for Writing (5723), and 150 for Mathematics (5733)."
    },
    {
      question: "How do you score a Praxis Core practice test?",
      answer: "Upon completing our diagnostic practice test on PrepSumit.com, you will receive an instant diagnostic breakdown showing your score, accuracy rate, and question-by-question explanations."
    },
    {
      question: "How many times can I retake the Praxis Core?",
      answer: "There is no limit to the number of times you can retake a Praxis test. However, you must wait at least 28 days from your previous test date before taking it again."
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [examQIndex, setExamQIndex] = useState(0);
  const [selectedExamOption, setSelectedExamOption] = useState(null);
  const [isExamAnswered, setIsExamAnswered] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [examCompleted, setExamCompleted] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!homeSearchInput.trim()) return;
    setSearchQuery(homeSearchInput);
    setActivePage('search');
  };

  const handleCourseClick = (courseId) => {
    const found = courses.find(c => c.id === courseId);
    if (found && onSelectCourse) {
      onSelectCourse(found);
    } else {
      setActivePage('catalog');
    }
  };

  const handleLessonClick = (chapterId, lessonIdx) => {
    if (chapterId === 1 && lessonIdx === 0) {
      const praxisCourse = courses.find(c => c.id === 'praxis-core');
      if (praxisCourse && onSelectLesson) {
        onSelectCourse(praxisCourse);
        onSelectLesson(praxisCourse.lessons[0]);
        return;
      }
    }
    onStartSignup();
  };

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

  const handleExamOptionSelect = (optionIndex) => {
    if (isExamAnswered) return;
    setSelectedExamOption(optionIndex);
    setIsExamAnswered(true);
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

  if (activeTab === 'Test') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'var(--font-body)' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <a href="/" onClick={(e) => { e.preventDefault(); setActivePage('home'); setSearchQuery(''); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Test Prep Courses</a>
                <ChevronRight size={10} />
                <a href="/praxis" onClick={(e) => { e.preventDefault(); setActiveTab('Overview'); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Praxis Core (5713, 5723, 5733) Exam Prep</a>
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', color: '#ffffff', margin: 0 }}>
                Praxis Core Academic Skills Practice Test
              </h1>
              <p style={{ fontSize: '1.15rem', opacity: 0.95, fontWeight: '600' }}>
                Pass the Praxis Reading, Writing & Math Subtests with Confidence
              </p>
              <button 
                onClick={() => {
                  const quizElement = document.getElementById('practice-test-widget');
                  if (quizElement) quizElement.scrollIntoView({ behavior: 'smooth' });
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
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '340px', height: '260px' }} className="desktop-only">
              <Image 
                src="/images/praxis-prep-illustration.png" 
                alt="Praxis Prep Illustration" 
                fill 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary-dark)', textAlign: 'center', margin: 0 }}>
              Your full suite of study tools for the Praxis Core Teacher Exams
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', width: '100%' }}>
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <CheckSquare size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Praxis Questions</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Standard-aligned diagnostics to pinpoint study focus areas.</span>
              </div>
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <Tv size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Micro-Lessons</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Focus on core grammatical, mathematical, and comprehension skills.</span>
              </div>
              <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '16px', borderRadius: '50%' }}>
                  <FileText size={28} />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Study Guides</strong>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Printable outlines, essay structures, and key math formulas.</span>
              </div>
            </div>
          </section>

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
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                Unlock all Praxis Core study guides today
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                Used by thousands of candidates to clear state licensure requirements
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
              Sign Up Risk-Free
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Understanding the Praxis Core (5713, 5723, 5733) Exams
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                The Praxis Core Academic Skills for Educators tests measure key skills in reading, writing, and mathematics. These tests are widely used by state education departments and teacher preparation programs to assess competency before admitting candidates to teacher training programs or issuing initial teacher licenses.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
                Frequently Asked Questions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {faqList.map((faq, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0, lineHeight: '1.4' }}>
                      {faq.question}
                    </h4>
                    <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                Praxis Core Practice Diagnostic Quiz
              </h3>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Test your skills and get immediate answers with reasoning.
              </span>
            </div>

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
                    Question {examQIndex + 1} of 2
                  </span>

                  <p style={{ fontSize: '1.05rem', fontWeight: '750', color: 'var(--text-primary)', margin: 0, lineHeight: '1.4' }}>
                    {examQuestions[examQIndex].question}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {examQuestions[examQIndex].options.map((option, oIdx) => {
                      const isSelected = selectedExamOption === oIdx;
                      const isCorrect = examQuestions[examQIndex].correctAnswer === oIdx;
                      
                      let optBg = '#ffffff';
                      let optBorder = '#cbd5e1';

                      if (isExamAnswered) {
                        if (isCorrect) {
                          optBg = 'var(--success-light)';
                          optBorder = 'var(--success)';
                        } else if (isSelected) {
                          optBg = 'var(--error-light)';
                          optBorder = 'var(--error)';
                        }
                      } else if (isSelected) {
                        optBg = 'var(--primary-light)';
                        optBorder = 'var(--primary)';
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
                            cursor: isExamAnswered ? 'default' : 'pointer'
                          }}
                        >
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: '2px solid currentColor',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem'
                          }}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {isExamAnswered && (
                    <div style={{ 
                      backgroundColor: 'var(--bg-light)', 
                      padding: '16px', 
                      borderRadius: '4px', 
                      fontSize: '0.88rem', 
                      color: 'var(--text-secondary)',
                      borderLeft: '4px solid var(--primary)',
                      lineHeight: '1.5'
                    }}>
                      <strong>Explanation:</strong> {examQuestions[examQIndex].explanation}
                    </div>
                  )}

                  {isExamAnswered && (
                    <button
                      onClick={handleNextExamQuestion}
                      style={{
                        alignSelf: 'flex-end',
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 24px',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        cursor: 'pointer'
                      }}
                    >
                      {examQIndex + 1 < examQuestions.length ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <Award size={48} style={{ color: 'var(--primary)' }} />
                  <h4 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                    Diagnostic Completed!
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
                    You scored <strong>{examScore} out of {examQuestions.length}</strong> correct.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button 
                      onClick={handleRestartExamQuiz}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1.5px solid var(--primary)',
                        borderRadius: '4px',
                        color: 'var(--primary)',
                        fontWeight: '700',
                        padding: '10px 20px',
                        cursor: 'pointer'
                      }}
                    >
                      Try Again
                    </button>
                    <button 
                      onClick={() => onStartSignup()}
                      style={{
                        backgroundColor: 'var(--primary)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#ffffff',
                        fontWeight: '800',
                        padding: '10px 24px',
                        cursor: 'pointer'
                      }}
                    >
                      Unlock 300+ Practice Questions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', fontFamily: 'var(--font-body)', gap: '40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', width: '100%' }}>
        <div style={{ 
          backgroundColor: '#07323b', 
          color: '#ffffff', 
          width: '100vw', 
          position: 'relative', 
          left: '50%', 
          right: '50%', 
          marginLeft: '-50vw', 
          marginRight: '-50vw',
          padding: '50px 24px'
        }} className="ftce-hero-section">
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }} className="ftce-hero-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <a href="/" onClick={(e) => { e.preventDefault(); setActivePage('home'); setSearchQuery(''); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit' }}>Test Prep Directory</a>
                <ChevronRight size={10} />
                <span>Praxis Core Exams</span>
              </div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', color: '#ffffff', margin: 0 }}>
                Praxis Core Prep and Practice Tests
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.95, margin: 0, lineHeight: '1.5' }}>
                PrepSumit helps future teachers pass the Praxis Core Academic Skills exams. Access bite-sized video lessons, study outlines, flashcards, and realistic practice quizzes mapped to ETS test specifications.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <button 
                  onClick={() => onStartSignup()}
                  style={{
                    backgroundColor: '#ffb627',
                    color: '#222222',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px 28px',
                    fontWeight: '800',
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  Start Studying Now
                </button>
                <button 
                  onClick={() => setActiveTab('Test')}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1.5px solid #ffffff',
                    borderRadius: '4px',
                    padding: '10.5px 24px',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                >
                  Take Practice Test
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', width: '340px', height: '260px' }} className="desktop-only">
              <Image 
                src="/images/praxis-prep-illustration.png" 
                alt="Praxis Prep Illustration" 
                fill 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', width: '100%' }} className="ftce-layout-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ display: 'flex', borderBottom: '2px solid #cbd5e1', gap: '24px' }}>
            {['Overview', 'Lessons', 'Flashcards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                  padding: '12px 4px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  color: activeTab === tab ? 'var(--primary-dark)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  marginBottom: '-2px'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <section style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  Why Choose PrepSumit for Praxis Core Study?
                </h3>
                <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  We break down dry academic concepts into engaging, visual, bite-sized guides. You study on your own schedule, take practice quizzes to benchmark your accuracy, and review complete text outlines of key competencies. 92% of our graduates pass the state licensure exam on their very first attempt.
                </p>
              </section>

              <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  Interactive Study Outlines
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {syllabusChapters.map((chapter) => (
                    <div key={chapter.id} style={{ border: '1px solid #d2dbe5', borderRadius: '6px', overflow: 'hidden' }}>
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '16px 20px',
                          backgroundColor: '#f8fafc',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                          Chapter {chapter.id}: {chapter.title}
                        </strong>
                        {expandedChapters[chapter.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {expandedChapters[chapter.id] && (
                        <div style={{ padding: '8px 20px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                          {chapter.lessons.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              onClick={() => handleLessonClick(chapter.id, lIdx)}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 0',
                                borderBottom: lIdx + 1 < chapter.lessons.length ? '1px solid #f2f6f9' : 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Play size={14} style={{ color: 'var(--primary)' }} />
                                <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{lesson.title}</span>
                              </div>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'Lessons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Praxis Core Curriculum & Lessons
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>
                Select a lesson to begin learning. Start with Chapter 1 which is fully unlocked for review.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                {syllabusChapters.map((chapter) => (
                  <div key={chapter.id} style={{ border: '1px solid #d2dbe5', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #d2dbe5' }}>
                      <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                        Chapter {chapter.id}: {chapter.title}
                      </strong>
                    </div>
                    <div style={{ padding: '8px 20px', backgroundColor: '#ffffff' }}>
                      {chapter.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          onClick={() => handleLessonClick(chapter.id, lIdx)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 0',
                            borderBottom: lIdx + 1 < chapter.lessons.length ? '1px solid #f2f6f9' : 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Tv size={16} style={{ color: 'var(--primary)' }} />
                            <div>
                              <div style={{ fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-primary)' }}>{lesson.title}</div>
                              {lesson.desc && <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{lesson.desc}</div>}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Flashcards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, alignSelf: 'flex-start' }}>
                Praxis Core Flashcards
              </h3>
              <div style={{
                width: '100%',
                maxWidth: '480px',
                height: '240px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #d2dbe5',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '24px'
              }} onClick={() => onStartSignup()}>
                <div>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>
                    Pythagorean Theorem
                  </h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', display: 'block', marginTop: '12px' }}>
                    Click to reveal definition (requires premium signup)
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
              Course Statistics
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Videos:</span>
                <strong>40 videos</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hours of Video:</span>
                <strong>7.5 hours</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Practice Questions:</span>
                <strong>350 questions</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Rating:</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: '700' }}>
                  <Star size={14} fill="#f59e0b" /> 4.8 / 5.0
                </span>
              </div>
            </div>
            <button 
              onClick={() => onStartSignup()}
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Start Studying
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
