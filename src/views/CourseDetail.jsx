import { useState } from 'react';
import { Star, HelpCircle, ArrowLeft, Play, ChevronDown, ChevronUp } from 'lucide-react';

export default function CourseDetail({ course, onBack, onSelectLesson, onStartSignup }) {
  const [activeTab, setActiveTab] = useState('Overview'); // 'Overview', 'Syllabus', 'Test'
  const [expandedChapters, setExpandedChapters] = useState({ 0: true, 1: true });
  
  const getDynamicReview = () => {
    const title = (course.title || '').toLowerCase();
    const subject = (course.subject || '').toLowerCase();
    
    if (title.includes('ftce')) {
      return `"I was terrified of the FTCE exam, but after watching these video lessons, I passed on my first attempt. Highly recommended study guide!"`;
    }
    if (title.includes('praxis')) {
      return `"I was struggling with the Praxis exam prep for weeks. This course broke down every single competency clearly, and I passed on my first try!"`;
    }
    if (title.includes('nclex') || title.includes('nursing')) {
      return `"As a nursing student, the NCLEX preparation can feel overwhelming. The video lessons and practice quizzes here made it manageable and fun. I passed easily!"`;
    }
    if (title.includes('calculus') || title.includes('math') || subject.includes('math')) {
      return `"Calculus was my weakest subject, but this study guide made the derivative and limit concepts click. I got an A on my final exam!"`;
    }
    if (title.includes('biology') || title.includes('science') || subject.includes('science')) {
      return `"The biology diagrams and explanations in this course were so clear. It really helped me study cell structures and pass my exams."`;
    }
    if (title.includes('psychology')) {
      return `"An amazing resource for Intro to Psychology! The flashcards and practice quizzes helped me master the conditioning theories in no time."`;
    }
    if (title.includes('economics') || title.includes('finance') || title.includes('gdp')) {
      return `"Macroeconomics concepts like GDP and inflation were made simple. The lessons are short, clear, and perfectly aligned with the exams!"`;
    }
    if (title.includes('history')) {
      return `"I always received poor grades in US History. This guide really helped me learn the material and I received a fantastic score!"`;
    }
    if (title.includes('composition') || title.includes('english')) {
      return `"Writing essays used to stress me out, but this English composition guide helped me structure my arguments and avoid common grammar mistakes."`;
    }
    if (title.includes('real estate')) {
      return `"This was the perfect real estate prep course. It explained property ownership and eminent domain clearly, helping me pass my licensing exam."`;
    }
    return `"This prep course was an amazing resource. The lessons are short and direct, and the quizzes give you immediate feedback. Highly recommended!"`;
  };
  
  // Quiz widget state (Screenshot 484 style)
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  if (!course) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
        <p>No course selected. Please return to the course catalog.</p>
        <button className="btn" onClick={onBack}>Go to Catalog</button>
      </div>
    );
  }

  // Group lessons into simulated chapters (e.g. 3 chapters)
  const chapters = [
    {
      title: "Competency 1: Instructional Design and Lesson Planning",
      lessons: course.lessons.slice(0, 2)
    },
    {
      title: "Competency 2: Classroom Management and Learning Environments",
      lessons: course.lessons.slice(2, 4)
    },
    {
      title: "Competency 3: Teaching English Language Learners (ELL) and ESOL Programs",
      lessons: course.lessons.slice(4) // any extra
    }
  ];

  const handleToggleChapter = (idx) => {
    setExpandedChapters(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const activeLessonForQuiz = course.lessons[0];
  const activeQuizQ = activeLessonForQuiz?.quiz?.[currentQuizIndex];

  const handleSubmitQuiz = () => {
    if (selectedOption === null) {
      alert("Please select an answer option.");
      return;
    }
    setQuizSubmitted(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    if (currentQuizIndex + 1 < activeLessonForQuiz.quiz.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setCurrentQuizIndex(0); // loop
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Back Button */}
      <div>
        <button 
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#13809c',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '700',
            fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>
      </div>

      {/* Course Hero Banner */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        borderBottom: '1px solid #d2dbe5',
        paddingBottom: '24px'
      }}>
        <span className="badge" style={{ backgroundColor: '#f2f6f9', color: '#13809c', alignSelf: 'flex-start', fontWeight: '800' }}>
          {course.subject}
        </span>
        <h1 style={{ 
          fontSize: '2.3rem', 
          fontWeight: '900', 
          color: '#1f4e5a', 
          lineHeight: '1.2',
          fontFamily: 'var(--font-heading)'
        }}>
          {course.title}
        </h1>
        
        {/* Flat Tabs Section (Overview, Syllabus, Test) */}
        <div style={{ display: 'flex', gap: '28px', marginTop: '16px' }}>
          {['Overview', 'Syllabus', 'Test'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 0 12px 0',
                fontSize: '1rem',
                fontWeight: '700',
                color: activeTab === tab ? '#13809c' : '#718096',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '3.5px solid #13809c' : '3.5px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Left Details vs Right sidebar Course Stats Card */}
      <div className="course-detail-layout-grid">
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {activeTab === 'Overview' && (
            <>
              {/* Quiz Widget Section (Screenshot 484 style) */}
              {activeQuizQ && (
                <div className="card" style={{ padding: '28px', borderLeft: '4px solid #13809c' }}>
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#1f4e5a', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <HelpCircle size={18} style={{ color: '#13809c' }} /> Test-aligned Practice Question
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: '#718096', fontWeight: '700' }}>
                      Question {currentQuizIndex + 1} of {activeLessonForQuiz.quiz.length}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.98rem', color: '#222222', lineHeight: '1.6', marginBottom: '20px', fontWeight: '600' }}>
                    {activeQuizQ.question}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                    {activeQuizQ.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === activeQuizQ.answer;
                      const isSelected = oIdx === selectedOption;
                      
                      let borderStyle = '1px solid #d2dbe5';
                      let bgStyle = '#ffffff';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          borderStyle = '2px solid #10b981';
                          bgStyle = 'rgba(16,185,129,0.06)';
                        } else if (isSelected) {
                          borderStyle = '2px solid #ef4444';
                          bgStyle = 'rgba(239,68,68,0.06)';
                        }
                      } else if (isSelected) {
                        borderStyle = '2.5px solid #13809c';
                        bgStyle = 'rgba(19,128,156,0.04)';
                      }

                      return (
                        <label 
                          key={oIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 16px',
                            border: borderStyle,
                            borderRadius: '4px',
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            backgroundColor: bgStyle,
                            fontSize: '0.92rem',
                            transition: 'all 0.15s'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="widget-quiz" 
                            disabled={quizSubmitted}
                            checked={isSelected}
                            onChange={() => setSelectedOption(oIdx)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#13809c' }}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Submit / Continue Buttons */}
                  {quizSubmitted ? (
                    <div style={{
                      backgroundColor: selectedOption === activeQuizQ.answer ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                      padding: '16px',
                      borderRadius: '4px',
                      marginBottom: '20px',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      borderLeft: selectedOption === activeQuizQ.answer ? '4px solid #10b981' : '4px solid #ef4444'
                    }}>
                      <strong style={{ color: selectedOption === activeQuizQ.answer ? '#10b981' : '#ef4444', display: 'block', marginBottom: '4px' }}>
                        {selectedOption === activeQuizQ.answer ? "✓ Correct Answer!" : "✗ Incorrect Answer"}
                      </strong>
                      <p style={{ color: '#4a5568' }}>{activeQuizQ.explanation}</p>
                      
                      <button 
                        onClick={handleNextQuiz}
                        style={{
                          backgroundColor: '#13809c',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontWeight: '800',
                          fontSize: '0.9rem',
                          padding: '10px 24px',
                          cursor: 'pointer',
                          marginTop: '12px'
                        }}
                      >
                        Continue &rarr;
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleSubmitQuiz}
                      style={{
                        backgroundColor: '#ffb627',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#222222',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        padding: '12px 24px',
                        cursor: 'pointer'
                      }}
                    >
                      Submit Answer
                    </button>
                  )}
                </div>
              )}

              {/* Course Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#1f4e5a', fontWeight: '800', margin: 0 }}>
                  About this Study Prep Guide
                </h3>
                <p style={{ color: '#4a5568', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {course.description}
                </p>
              </div>

              {/* Trustpilot Excellent rating (Screenshot 485) */}
              <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontWeight: '800', color: '#1f4e5a' }}>Trustpilot</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} style={{ backgroundColor: '#00b67a', color: 'white', padding: '2px', borderRadius: '2px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Star size={10} fill="white" stroke="white" />
                      </span>
                    ))}
                  </div>
                </div>
                <strong style={{ fontSize: '1rem', color: '#1f4e5a' }}>
                  Excellent 4.8 out of 5 stars based on 12,450 student reviews
                </strong>
                <p style={{ fontSize: '0.85rem', color: '#718096', lineHeight: '1.4' }}>
                  {getDynamicReview()}
                </p>
              </div>
            </>
          )}

          {activeTab === 'Syllabus' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#1f4e5a', fontWeight: '800', margin: 0 }}>
                  Course Syllabus Chapters
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#718096', fontWeight: '700' }}>
                  {chapters.length} chapters • {course.lessonsCount} lessons
                </span>
              </div>

              {/* Chapter Collapsible Accordions (Screenshot 487) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {chapters.map((chapter, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="card"
                    style={{ 
                      padding: 0, 
                      overflow: 'hidden', 
                      border: '1px solid #d2dbe5',
                      borderRadius: '6px' 
                    }}
                  >
                    {/* Header trigger */}
                    <div 
                      onClick={() => handleToggleChapter(cIdx)}
                      style={{
                        backgroundColor: expandedChapters[cIdx] ? '#f2f6f9' : '#ffffff',
                        padding: '18px 24px',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyItems: 'center',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: expandedChapters[cIdx] ? '1px solid #d2dbe5' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <strong style={{ color: '#1f4e5a', fontSize: '0.98rem', maxWidth: '85%' }}>
                        {chapter.title}
                      </strong>
                      {expandedChapters[cIdx] ? <ChevronUp size={18} style={{ color: '#13809c' }} /> : <ChevronDown size={18} style={{ color: '#13809c' }} />}
                    </div>

                    {/* Collapsible lesson list */}
                    {expandedChapters[cIdx] && (
                      <div style={{ padding: '8px 0', backgroundColor: '#ffffff' }}>
                        {chapter.lessons && chapter.lessons.length > 0 ? (
                          chapter.lessons.map((lesson, lIdx) => (
                            <div 
                              key={lesson.id}
                              onClick={() => onSelectLesson(lesson)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '12px 24px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              className="nav-item"
                              onMouseOver={e => e.currentTarget.style.backgroundColor = '#f9fbfd'}
                              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <div style={{ 
                                width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f2f6f9', color: '#13809c',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                              }}>
                                <Play size={12} fill="#13809c" />
                              </div>
                              <div style={{ flexGrow: 1 }}>
                                <span style={{ fontSize: '0.9rem', color: '#222222', fontWeight: '700', display: 'block' }}>
                                  Lesson {lIdx + 1}: {lesson.title}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#718096' }}>
                                  Video lesson ({lesson.duration})
                                </span>
                              </div>
                              <span style={{ fontSize: '0.82rem', color: '#13809c', fontWeight: '700' }}>
                                View &rarr;
                              </span>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#718096', fontStyle: 'italic' }}>
                            Upgrade to unlock Comp {cIdx + 1} chapter guidelines and practice quizzes.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Test' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1f4e5a', fontWeight: '800', margin: 0 }}>
                Full-length Practice Exams
              </h3>
              <p style={{ color: '#4a5568', fontSize: '0.92rem' }}>
                Simulate standard testing center conditions. Practice 9 full-length teacher certification exams with feedback score telemetry.
              </p>

              <div className="card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '4px solid #ffb627' }}>
                <strong style={{ fontSize: '1.15rem', color: '#1f4e5a' }}>
                  FTCE PEd Diagnostic Test
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#718096', lineHeight: '1.4' }}>
                  Measure your baseline competency distribution score. Time: 120 mins. 110 aligned multiple choice questions.
                </p>
                <button 
                  onClick={onStartSignup}
                  style={{
                    backgroundColor: '#ffb627',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#222222',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    padding: '12px 24px',
                    cursor: 'pointer',
                    width: 'fit-content',
                    marginTop: '8px'
                  }}
                >
                  Start Diagnostic Exam
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar stats card and Success Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Course Details Sidebar Card (Screenshot 483 style) */}
          <div className="card" style={{ 
            backgroundColor: '#f2f6f9', 
            padding: '32px 24px', 
            border: '1px solid #d2dbe5',
            borderRadius: '6px'
          }}>
            <h3 style={{ color: '#1f4e5a', fontSize: '1.2rem', marginBottom: '20px', fontWeight: '800', borderBottom: '1px solid #d2dbe5', paddingBottom: '12px' }}>
              Course Statistics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#4a5568' }}>
                <span>Practice Questions:</span>
                <strong style={{ color: '#1f4e5a' }}>{course.practiceQuestions || 507}</strong>
              </div>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#4a5568' }}>
                <span>Practice Tests:</span>
                <strong style={{ color: '#1f4e5a' }}>{course.practiceTests || 9}</strong>
              </div>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#4a5568' }}>
                <span>Video Lessons:</span>
                <strong style={{ color: '#1f4e5a' }}>{course.videos || 92}</strong>
              </div>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#4a5568' }}>
                <span>Hours of Video:</span>
                <strong style={{ color: '#1f4e5a' }}>{course.hoursOfVideo || 9} hrs</strong>
              </div>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem', color: '#4a5568' }}>
                <span>Text Lessons:</span>
                <strong style={{ color: '#1f4e5a' }}>{course.lessonsCount}</strong>
              </div>
            </div>

            {/* Create an Account Solid orange button */}
            <button 
              onClick={onStartSignup}
              style={{
                backgroundColor: '#ffb627',
                border: 'none',
                borderRadius: '4px',
                color: '#222222',
                fontWeight: '900',
                fontSize: '1.05rem',
                padding: '14px 20px',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 4px 6px rgba(255,182,39,0.2)',
                marginBottom: '12px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
              onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
            >
              Create an account
            </button>

            <span style={{ display: 'block', textAlign: 'center', fontSize: '0.8rem', color: '#718096', fontWeight: '600' }}>
              Unlock all lessons, flashcards & exams.
            </span>
          </div>

          {/* How our students succeed circular metrics (Screenshot 484) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ color: '#1f4e5a', fontSize: '1rem', fontWeight: '800', margin: 0 }}>
              How our students succeed
            </h4>

            <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              {/* Circle 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '4px solid #13809c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: '#13809c',
                  fontSize: '1rem',
                  backgroundColor: '#ffffff'
                }}>
                  92%
                </div>
                <span style={{ fontSize: '0.74rem', color: '#4a5568', textAlign: 'center', lineHeight: '1.3' }}>
                  Passed their exams
                </span>
              </div>

              {/* Circle 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '4px solid #ffb627',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: '#ffb627',
                  fontSize: '1rem',
                  backgroundColor: '#ffffff'
                }}>
                  96%
                </div>
                <span style={{ fontSize: '0.74rem', color: '#4a5568', textAlign: 'center', lineHeight: '1.3' }}>
                  Found lessons helpful
                </span>
              </div>

              {/* Circle 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '4px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  color: '#10b981',
                  fontSize: '1rem',
                  backgroundColor: '#ffffff'
                }}>
                  94%
                </div>
                <span style={{ fontSize: '0.74rem', color: '#4a5568', textAlign: 'center', lineHeight: '1.3' }}>
                  Boosted confidence
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
