"use client";

import { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import dynamic from 'next/dynamic';

const AITutor = dynamic(() => import('@/src/components/AITutor'), { ssr: false });
const EmailPopup = dynamic(() => import('@/src/components/EmailPopup'), { ssr: false });
import { coursesData, userStatsData } from '@/src/data/courses';
import { X, Info } from 'lucide-react';
import Image from 'next/image';

const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

// Inner wrapper to consume search params inside Suspense safely in Next.js
function AppProvidersContent({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Core App States
  const [activePage, setActivePageState] = useState('home');
  const [homeActiveTab, setHomeActiveTab] = useState('Overview');
  const [selectedCourse, setSelectedCourseState] = useState(null);
  const [selectedLesson, setSelectedLessonState] = useState(null);
  const [searchQuery, setSearchQueryState] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [userStats, setUserStats] = useState(userStatsData);
  
  // Custom states for modals and landing directories
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [signupDetails, setSignupDetails] = useState(null);
  const [landingCategory, setLandingCategoryState] = useState('');
  const [infoModal, setInfoModal] = useState({ isOpen: false, title: '', text: '' });
  const [signupData, setSignupData] = useState(null);
  const [rewardNotification, setRewardNotification] = useState(null);

  // Info modal template data mapping
  const infoDetails = {
    faq: {
      title: "Frequently Asked Questions",
      text: `Welcome to the PrepSumit Help Center. Here are the answers to our most common questions:
      
      Q: How do PrepSumit online courses work?
      A: Our courses are self-paced, allowing you to study whenever it fits your schedule. Each course contains short, engaging video lessons, complete readable text transcripts, practice flashcards, and standard-aligned quizzes to track your comprehension.
      
      Q: Can I really earn college credits?
      A: Yes! Our courses carry official ACE and NCCRS recommendation status. Once you pass our online proctored exam, you request a transcript from your dashboard, which we send directly to your college registrar. More than 1,500 institutions accept these transfer credits.
      
      Q: How does the risk-free trial work?
      A: You get 5 days of unlimited access to our entire library of lessons, practice tests, and study guides. If you decide to cancel within the 5 days, you will not be charged a single penny. Cancelation is online with a single click.
      
      Q: What is the customer support phone number?
      A: You can reach our dedicated support desk by phone at (877) 266-4919, or email us at support@prepsumit.com.`
    },
    careers: {
      title: "Careers at PrepSumit",
      text: `Join the PrepSumit Team! We are on a mission to make education flexible, affordable, and accessible to everyone. We are looking for talented, passionate individuals in the following areas:
      
      - Subject Matter Experts & Lesson Writers: Help us expand our database of course guides.
      - Video Editors & Animators: Turn dry lessons into premium, engaging educational content.
      - Full-Stack Software Engineers: Develop our core web and mobile React applications.
      - Customer Success Specialists: Help students achieve their licensing and degree goals.
      
      To apply, send your resume and portfolio to careers@prepsumit.com. We offer fully remote work, competitive salaries, and unlimited learning benefits!`
    },
    teach: {
      title: "Teach for Us",
      text: `Are you a certified teacher, professor, or subject specialist? Earn money by writing lesson scripts or creating online video courses for PrepSumit!
      
      As a PrepSumit educator, you can work remotely on your own schedule. We pay competitive rates per completed lesson, and your work will be seen by millions of students striving to clear their exams or earn degrees.
      
      Learn more and submit your credentials at prepsumit.com/teach.`
    },
    terms: {
      title: "Terms of Use",
      text: `These Terms of Use govern your access to and use of PrepSumit.com. By using our website, you agree to comply with these terms:
      
      - Membership & Billing: Subscriptions are billed monthly. You can cancel at any time via your Account Settings.
      - Refund Policy: If you cancel during your trial period, you will not be charged. Standard monthly charges are non-refundable, but you retain access until the end of your billing cycle.
      - Intellectual Property: All course content, videos, animations, and quiz questions are the copyrighted property of PrepSumit.com and are licensed for personal, educational use only.
      - Honor Code: Students must complete quizzes and exams independently without external assistance. Academic integrity is vital.`
    },
    privacy: {
      title: "Privacy Policy",
      text: `At PrepSumit.com, your privacy is our top priority. Here is a summary of how we manage your information:
      
      - Data Collection: We collect account info (name, email) and study telemetry (XP, lessons completed, quiz scores) to improve your learning experience.
      - Data Protection: We use industry-standard 256-bit SSL encryption to protect all credit card and credential submissions.
      - Sharing: We do NOT sell or share your personal information with third-party advertisers. 
      - Integration: If you are sponsored by an employer or school under the Working Scholars® program, your progress reports may be shared with the sponsor.`
    },
    about: {
      title: "About PrepSumit.com",
      text: `PrepSumit.com is a leading online learning platform offering flexible and affordable study guides, certification courses, and college credit pathways.
      
      We believe that traditional educational barriers can be dismantled using modern technology. Our short, visually rich lessons help adult learners, future teachers, and students master concepts quickly and pass their exams on the first attempt.`
    }
  };

  // Synchronize Next.js URL paths to local React state (supports direct load & deep linking)
  useEffect(() => {
    if (!pathname) return;
    const path = pathname.toLowerCase();
    const q = searchParams.get('q') || '';

    if (path === '/' || path === '') {
      setActivePageState('home');
      setSearchQueryState(q);
    } else if (path === '/ftce') {
      setActivePageState('ftce');
      const ftceCourse = coursesData.find(c => c.id === 'ftce-professional-education-test');
      if (ftceCourse) setSelectedCourseState(ftceCourse);
    } else if (path === '/teas') {
      setActivePageState('teas');
      const teasCourse = coursesData.find(c => c.id === 'teas-prep');
      if (teasCourse) setSelectedCourseState(teasCourse);
    } else if (path === '/catalog' || path === '/courses') {
      setActivePageState('catalog');
    } else if (path === '/login') {
      setActivePageState('login');
    } else if (path === '/signup') {
      setActivePageState('signup');
      const examParam = searchParams.get('exam');
      if (examParam) {
        setSignupDetails(prev => ({
          ...prev,
          exam: examParam === 'others' ? 'Others' : examParam
        }));
      }
    } else if (path === '/checkout') {
      setActivePageState('checkout');
    } else if (path === '/dashboard') {
      setActivePageState('dashboard');
    } else if (path === '/plans' || path.includes('/academy/plans.html') || path === '/pricing' || path === '/plans-pricing') {
      setActivePageState('pricing');
    } else if (path === '/praxis') {
      setActivePageState('praxis');
      const praxisCourse = coursesData.find(c => c.id === 'praxis-core');
      if (praxisCourse) setSelectedCourseState(praxisCourse);
    } else if (path === '/about') {
      setActivePageState('about');
    } else if (path === '/contact') {
      setActivePageState('contact');
    } else if (path === '/privacy-policy') {
      setActivePageState('privacy');
    } else if (path === '/terms-of-use') {
      setActivePageState('terms');
    } else if (path === '/search') {
      setActivePageState('search');
      setSearchQueryState(q);
    } else if (path.startsWith('/courses/')) {
      const parts = pathname.split('/');
      const courseId = parts[2];
      const found = coursesData.find(c => c.id.toLowerCase() === courseId.toLowerCase());
      if (found) {
        setSelectedCourseState(found);
        if (parts[3] === 'lessons' && parts[4]) {
          const lessonId = parts[4];
          const foundLesson = found.lessons?.find(l => l.id.toLowerCase() === lessonId.toLowerCase());
          if (foundLesson) {
            setSelectedLessonState(foundLesson);
            setActivePageState('lesson');
            return;
          }
        }
        if (courseId === 'ftce-professional-education-test') {
          setActivePageState('ftce');
        } else if (courseId === 'teas-prep') {
          setActivePageState('teas');
        } else {
          setActivePageState('detail');
        }
      } else {
        setActivePageState('catalog');
      }
    } else if (path.startsWith('/category/')) {
      const parts = pathname.split('/');
      const cat = parts[2] || '';
      setLandingCategoryState(cat);
      setActivePageState('landing');
    }
  }, [pathname, searchParams]);

  // Synchronize React state modifications back to Next.js route actions
  const setActivePage = (page) => {
    setActivePageState(page);
    switch (page) {
      case 'home': router.push('/'); break;
      case 'ftce': router.push('/ftce'); break;
      case 'teas': router.push('/teas'); break;
      case 'catalog': router.push('/catalog'); break;
      case 'login': router.push('/login'); break;
      case 'signup': router.push('/signup'); break;
      case 'checkout': router.push('/checkout'); break;
      case 'dashboard': router.push('/dashboard'); break;
      case 'plans': router.push('/pricing'); break;
      case 'pricing': router.push('/pricing'); break;
      case 'praxis': router.push('/praxis'); break;
      case 'about': router.push('/about'); break;
      case 'contact': router.push('/contact'); break;
      case 'privacy': router.push('/privacy-policy'); break;
      case 'terms': router.push('/terms-of-use'); break;
      case 'search': router.push(`/search?q=${encodeURIComponent(searchQuery)}`); break;
      default: break;
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourseState(course);
    router.push(`/courses/${course.id}`);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLessonState(lesson);
    if (selectedCourse) {
      router.push(`/courses/${selectedCourse.id}/lessons/${lesson.id}`);
    }
  };

  const handleResumeLesson = (course, lesson) => {
    setSelectedCourseState(course);
    setSelectedLessonState(lesson);
    router.push(`/courses/${course.id}/lessons/${lesson.id}`);
  };

  const handleSignupComplete = (data) => {
    setSignupData(data);
    const ftceCourse = coursesData.find(c => c.id === 'ftce-professional-education-test');
    if (ftceCourse) {
      setSelectedCourseState(ftceCourse);
    }
    router.push('/checkout');
  };

  const handleCheckoutComplete = (planName) => {
    setUserStats(prev => ({
      ...prev,
      name: signupData ? `${signupData.firstName} ${signupData.lastName}` : prev.name,
      rank: `Premium Scholar (${signupData?.country || 'USA'})`,
      xp: prev.xp + 500, 
    }));

    alert(`Success! You have subscribed to ${planName}. Welcome to PrepSumit.com Premium!`);
    
    const ftceCourse = coursesData.find(c => c.id === 'ftce-professional-education-test');
    if (ftceCourse) {
      setSelectedCourseState(ftceCourse);
      router.push(`/courses/${ftceCourse.id}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleQuizComplete = (score, total) => {
    const xpGained = score * 20 + (score === total ? 50 : 0); 
    
    setUserStats(prev => {
      const isPerfect = score === total;
      const newAchievements = [...prev.achievements];
      
      if (isPerfect && !newAchievements.some(a => a.id === `perfect-${selectedLesson?.id}`)) {
        newAchievements.push({
          id: `perfect-${selectedLesson?.id}`,
          title: `${selectedLesson?.title} Master`,
          icon: "Award",
          description: `Scored 100% on the ${selectedLesson?.title} Quiz!`
        });
      }

      return {
        ...prev,
        xp: prev.xp + xpGained,
        completedLessons: prev.completedLessons + 1,
        achievements: newAchievements
      };
    });

    setRewardNotification({
      score,
      total,
      xpGained
    });

    setTimeout(() => {
      setRewardNotification(null);
    }, 5500);
  };

  const handleSelectCategoryLanding = (catName) => {
    setLandingCategoryState(catName);
    router.push(`/category/${catName}`);
  };

  const handleEmailContinue = (popupDetails) => {
    setSignupDetails(popupDetails);
    setShowEmailPopup(false);
    router.push('/signup');
  };

  const handleOpenInfo = (key) => {
    const data = infoDetails[key];
    if (data) {
      setInfoModal({ isOpen: true, title: data.title, text: data.text });
    } else {
      setInfoModal({
        isOpen: true,
        title: `${key.charAt(0).toUpperCase() + key.slice(1)} Information`,
        text: `Welcome to the PrepSumit program guide for ${key}. We are currently expanding this section. \n\nAll courses in this category are fully browseable in the Catalog. Try using the Card Dropdowns or Subjects navigation to explore specific courses, lessons, and practice exams!`
      });
    }
  };

  const setSearchQuery = (q) => {
    setSearchQueryState(q);
  };

  return (
    <AppContext.Provider value={{
      courses: coursesData,
      activePage,
      setActivePage,
      homeActiveTab,
      setHomeActiveTab,
      selectedCourse,
      setSelectedCourse: setSelectedCourseState,
      selectedLesson,
      setSelectedLesson: setSelectedLessonState,
      searchQuery,
      setSearchQuery,
      darkMode,
      setDarkMode,
      userStats,
      setUserStats,
      showEmailPopup,
      setShowEmailPopup,
      signupDetails,
      setSignupDetails,
      landingCategory,
      setLandingCategory: setLandingCategoryState,
      infoModal,
      setInfoModal,
      signupData,
      setSignupData,
      rewardNotification,
      setRewardNotification,
      handleSelectCourse,
      handleSelectLesson,
      handleResumeLesson,
      handleSignupComplete,
      handleCheckoutComplete,
      handleQuizComplete,
      handleSelectCategoryLanding,
      handleEmailContinue,
      handleOpenInfo
    }}>
      <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
        
        {/* Navigation Header */}
        {(activePage === 'signup' || activePage === 'checkout') ? (
          <header style={{
            backgroundColor: '#1f4e5a',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            borderBottom: '1px solid #134e5c',
            width: '100%'
          }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => { router.push('/'); }}
            >
              <Image 
                src="/images/prepsumit-logo.webp" 
                alt="PrepSumit logo" 
                width={26} 
                height={26} 
                style={{ objectFit: 'contain' }}
              />
              <span style={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.4rem', 
                fontWeight: '800', 
                color: '#ffffff',
                letterSpacing: '-0.03em'
              }}>
                PrepSumit<span style={{ color: '#ffb627' }}>.com</span>
              </span>
            </div>
          </header>
        ) : activePage === 'teas' ? null : (
          <Navbar 
            activePage={activePage}
            setActivePage={setActivePage}
            homeActiveTab={homeActiveTab}
            setHomeActiveTab={setHomeActiveTab}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            user={userStats}
            courses={coursesData}
            onSelectCourse={handleSelectCourse}
            onStartSignup={() => setShowEmailPopup(true)}
            onSelectCategoryLanding={handleSelectCategoryLanding}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {/* Dynamic Main View Area */}
        <main className={(activePage === 'home' || activePage === 'signup' || activePage === 'checkout' || activePage === 'teas') ? "main-content-full-width" : "main-content"} style={{ minHeight: 'calc(100vh - 400px)' }}>
          {children}
        </main>

        {/* Floating AI Tutor Chatbot on Study & Catalog Pages */}
        {(activePage === 'detail' || activePage === 'lesson' || activePage === 'ftce' || activePage === 'landing' || activePage === 'catalog' || activePage === 'search') && (
          <AITutor course={selectedCourse} lesson={selectedLesson} />
        )}

        {/* Global Informational Modal */}
        {infoModal.isOpen && (
          <div className="modal-backdrop" onClick={() => setInfoModal({ isOpen: false, title: '', text: '' })}>
            <div className="modal-container" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
              <div className="modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)' }}>
                  <Info size={20} />
                  <strong style={{ fontSize: '1.05rem', fontWeight: '800' }}>{infoModal.title}</strong>
                </div>
                <button 
                  onClick={() => setInfoModal({ isOpen: false, title: '', text: '' })} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  aria-label="Close Info"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body" style={{ whiteSpace: 'pre-line', color: 'var(--text-primary)' }}>
                {infoModal.text}
              </div>
              <div className="modal-footer">
                <button 
                  onClick={() => setInfoModal({ isOpen: false, title: '', text: '' })}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '700',
                    padding: '8px 20px',
                    cursor: 'pointer'
                  }}
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Branding Links */}
        {activePage !== 'login' && activePage !== 'signup' && activePage !== 'checkout' && (
          <Footer 
            setActivePage={setActivePage} 
            onSelectCategoryLanding={handleSelectCategoryLanding}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {/* Email Capture Popup Modal */}
        <EmailPopup 
          isOpen={showEmailPopup}
          onClose={() => setShowEmailPopup(false)}
          onContinue={handleEmailContinue}
        />
      </div>
    </AppContext.Provider>
  );
}

export default function AppProviders({ children }) {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>Loading PrepSumit...</div>}>
      <AppProvidersContent>{children}</AppProvidersContent>
    </Suspense>
  );
}
