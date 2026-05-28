import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FtceCourse from './pages/FtceCourse';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import CategoryLanding from './pages/CategoryLanding';
import AITutor from './components/AITutor';
import EmailPopup from './components/EmailPopup';
import SearchResults from './pages/SearchResults';
import TeasLanding from './pages/TeasLanding';
import Plans from './pages/Plans';

import { coursesData, userStatsData } from './data/courses';
import { Award, Sparkles, X, Info } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q')?.toLowerCase();

    if (path.includes('/ftce') || path.includes('ftce-courses') || hash.includes('ftce') || q === 'ftce') {
      return 'ftce';
    }
    if (path.includes('/teas') || hash.includes('teas') || q === 'teas') {
      return 'teas';
    }
    if (path.includes('/catalog')) {
      return 'catalog';
    }
    if (path.includes('/plans') || path.includes('/academy/plans.html') || path.includes('/pricing')) {
      return 'plans';
    }
    if (path.includes('/login')) {
      return 'login';
    }
    if (path.includes('/signup')) {
      return 'signup';
    }
    if (path.includes('/checkout')) {
      return 'checkout';
    }
    if (path.includes('/dashboard')) {
      return 'dashboard';
    }
    if (path.includes('/search')) {
      return 'search';
    }
    if (path.includes('/courses/')) {
      const parts = window.location.pathname.split('/');
      const courseId = parts[2];
      if (parts[3] === 'lessons' && parts[4]) {
        return 'lesson';
      }
      if (courseId === 'ftce-professional-education-test') {
        return 'ftce';
      }
      if (courseId === 'teas-prep') {
        return 'teas';
      }
      return 'detail';
    }
    if (path.includes('/category/')) {
      return 'landing';
    }
    if (q) {
      return 'search';
    }
    return 'home';
  }); 

  const [homeActiveTab, setHomeActiveTab] = useState('Overview'); 
  const [selectedCourse, setSelectedCourse] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/courses/')) {
      const parts = window.location.pathname.split('/');
      const courseId = parts[2];
      return coursesData.find(c => c.id.toLowerCase() === courseId.toLowerCase()) || null;
    }
    if (path.includes('/ftce') || window.location.hash.toLowerCase().includes('ftce')) {
      return coursesData.find(c => c.id === 'ftce-professional-education-test') || null;
    }
    if (path.includes('/teas') || window.location.hash.toLowerCase().includes('teas')) {
      return coursesData.find(c => c.id === 'teas-prep') || null;
    }
    return null;
  });

  const [selectedLesson, setSelectedLesson] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/courses/')) {
      const parts = window.location.pathname.split('/');
      const courseId = parts[2];
      if (parts[3] === 'lessons' && parts[4]) {
        const lessonId = parts[4];
        const course = coursesData.find(c => c.id.toLowerCase() === courseId.toLowerCase());
        if (course) {
          return course.lessons?.find(l => l.id.toLowerCase() === lessonId.toLowerCase()) || null;
        }
      }
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('q') || '';
  });
  const [darkMode, setDarkMode] = useState(false);
  const [userStats, setUserStats] = useState(userStatsData);
  
  // Custom states for modals and landing directories
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [signupDetails, setSignupDetails] = useState(null);
  const [landingCategory, setLandingCategory] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/category/')) {
      const parts = window.location.pathname.split('/');
      return parts[2] || '';
    }
    return '';
  });
  const [infoModal, setInfoModal] = useState({ isOpen: false, title: '', text: '' });
  const [signupData, setSignupData] = useState(null);
  const [rewardNotification, setRewardNotification] = useState(null);

  // Info modal content descriptions mapping footer links
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

  const handleOpenInfo = (key) => {
    const data = infoDetails[key];
    if (data) {
      setInfoModal({ isOpen: true, title: data.title, text: data.text });
    } else {
      // Default fallback for program links in progress
      setInfoModal({
        isOpen: true,
        title: `${key.charAt(0).toUpperCase() + key.slice(1)} Information`,
        text: `Welcome to the PrepSumit program guide for ${key}. We are currently expanding this section. \n\nAll courses in this category are fully browseable in the Catalog. Try using the Card Dropdowns or Subjects navigation to explore specific courses, lessons, and practice exams!`
      });
    }
  };

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedCourse, selectedLesson]);

  // Sync page state back to URL for SEO-friendly URLs and browser history support
  useEffect(() => {
    let newPath = '/';
    let search = '';
    
    switch (activePage) {
      case 'home':
        newPath = '/';
        break;
      case 'ftce':
        newPath = '/ftce';
        break;
      case 'teas':
        newPath = '/teas';
        break;
      case 'catalog':
        newPath = '/catalog';
        break;
      case 'plans':
        newPath = '/pricing';
        break;
      case 'search':
        newPath = '/search';
        if (searchQuery) {
          search = `?q=${encodeURIComponent(searchQuery)}`;
        }
        break;
      case 'login':
        newPath = '/login';
        break;
      case 'signup':
        newPath = '/signup';
        break;
      case 'checkout':
        newPath = '/checkout';
        break;
      case 'dashboard':
        newPath = '/dashboard';
        break;
      case 'landing':
        newPath = `/category/${landingCategory}`;
        break;
      case 'detail':
        if (selectedCourse) {
          newPath = `/courses/${selectedCourse.id}`;
        } else {
          newPath = '/catalog';
        }
        break;
      case 'lesson':
        if (selectedCourse && selectedLesson) {
          newPath = `/courses/${selectedCourse.id}/lessons/${selectedLesson.id}`;
        }
        break;
      default:
        break;
    }
    
    const finalUrl = `${newPath}${search}`;
    if (window.location.pathname + window.location.search !== finalUrl) {
      window.history.pushState({ activePage }, '', finalUrl);
    }
  }, [activePage, selectedCourse, selectedLesson, landingCategory, searchQuery]);

  // Listen to popstate event for back/forward navigation support
  useEffect(() => {
    const handlePopState = (event) => {
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const q = searchParams.get('q') || '';
      
      if (path === '/' || path === '') {
        setActivePage('home');
        setSearchQuery(q);
      } else if (path.includes('/ftce')) {
        setActivePage('ftce');
        const ftceCourse = coursesData.find(c => c.id === 'ftce-professional-education-test');
        if (ftceCourse) setSelectedCourse(ftceCourse);
      } else if (path.includes('/teas')) {
        setActivePage('teas');
        const teasCourse = coursesData.find(c => c.id === 'teas-prep');
        if (teasCourse) setSelectedCourse(teasCourse);
      } else if (path.includes('/catalog')) {
        setActivePage('catalog');
      } else if (path.includes('/plans') || path.includes('/academy/plans.html') || path.includes('/pricing')) {
        setActivePage('plans');
      } else if (path.includes('/login')) {
        setActivePage('login');
      } else if (path.includes('/signup')) {
        setActivePage('signup');
      } else if (path.includes('/checkout')) {
        setActivePage('checkout');
      } else if (path.includes('/dashboard')) {
        setActivePage('dashboard');
      } else if (path.includes('/search')) {
        setActivePage('search');
        setSearchQuery(q);
      } else if (path.includes('/courses/')) {
        const parts = window.location.pathname.split('/');
        const courseId = parts[2];
        const found = coursesData.find(c => c.id.toLowerCase() === courseId.toLowerCase());
        if (found) {
          setSelectedCourse(found);
          if (parts[3] === 'lessons' && parts[4]) {
            const lessonId = parts[4];
            const foundLesson = found.lessons?.find(l => l.id.toLowerCase() === lessonId.toLowerCase());
            if (foundLesson) {
              setSelectedLesson(foundLesson);
              setActivePage('lesson');
              return;
            }
          }
          if (courseId === 'ftce-professional-education-test') {
            setActivePage('ftce');
          } else if (courseId === 'teas-prep') {
            setActivePage('teas');
          } else {
            setActivePage('detail');
          }
        } else {
          setActivePage('catalog');
        }
      } else if (path.includes('/category/')) {
        const parts = window.location.pathname.split('/');
        const cat = parts[2] || '';
        setLandingCategory(cat);
        setActivePage('landing');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setActivePage('detail');
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setActivePage('lesson');
  };

  const handleResumeLesson = (course, lesson) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    setActivePage('lesson');
  };

  const handleSignupComplete = (data) => {
    setSignupData(data);
    // Find the FTCE course to pre-select, or default
    const ftceCourse = coursesData.find(c => c.id === 'ftce-professional-education-test');
    if (ftceCourse) {
      setSelectedCourse(ftceCourse);
    }
    setActivePage('checkout');
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
      setSelectedCourse(ftceCourse);
      setActivePage('detail');
    } else {
      setActivePage('dashboard');
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

  // Callback to handle categories landing redirection
  const handleSelectCategoryLanding = (catName) => {
    setLandingCategory(catName);
    setActivePage('landing');
  };

  const handleEmailContinue = (popupDetails) => {
    setSignupDetails(popupDetails);
    setShowEmailPopup(false);
    setActivePage('signup');
  };

  // Dynamic SEO Meta Update Hook
  useEffect(() => {
    let title = "PrepSumit | Online Courses for College Credit, Exam Prep & Test Preparation";
    let metaDesc = "PrepSumit is a leading online learning platform offering visual micro-lessons, practice quizzes, and custom study guides for exam prep, college credit, and teacher certification. Access 88,000+ courses and study on your schedule, risk-free.";
    
    switch (activePage) {
      case 'home':
        title = "PrepSumit | Online Courses for College Credit, Exam Prep & Test Preparation";
        metaDesc = "Boost your grades, study for exams, or earn transferable college credit with PrepSumit's standard-aligned visual guides, micro-lessons, and practice tests.";
        break;
      case 'ftce':
        title = "FTCE Professional Education Test (PEd) Study Guide & Test Prep | PrepSumit";
        metaDesc = "Prepare for the Florida Teacher Certification Examinations (FTCE) with PrepSumit's comprehensive preparation program. Access practice tests, study resources, and video tutorials.";
        break;
      case 'teas':
        title = "TEAS Test Prep & Study Guide | PrepSumit Nursing";
        metaDesc = "Prepare for your Test of Essential Academic Skills (TEAS) all in one place. Master TEAS Reading, Math, Science, and English with micro-lessons, flashcards, and practice quizzes.";
        break;
      case 'catalog':
        title = "Course Catalog & Study Guides | PrepSumit";
        metaDesc = "Browse hundreds of PrepSumit study guides, video lessons, and exam prep courses across Math, Science, Humanities, Business, and Teacher Certification.";
        break;
      case 'plans':
        title = "PrepSumit | Select a Plan & Pricing Guide";
        metaDesc = "Choose the PrepSumit plan that fits your study needs. Risk-free trial on all accounts. Choose between College Accelerator, Test Prep, Premium Edition, and Classroom Teacher Edition.";
        break;
      case 'search':
        title = searchQuery ? `Search Results for "${searchQuery}" | PrepSumit` : "Search Courses & Study Guides | PrepSumit";
        metaDesc = `Find PrepSumit study resources, practice tests, and video courses for ${searchQuery || 'your exams'}.`;
        break;
      case 'login':
        title = "Log In to Your Account | PrepSumit";
        metaDesc = "Log in to your PrepSumit account to resume your video lessons, check your quiz scores, and track your study progress.";
        break;
      case 'signup':
        title = "Create Your Account, Risk-Free | PrepSumit";
        metaDesc = "Sign up for PrepSumit today and join thousands of students boosting their exam scores and earning transferable college credits.";
        break;
      case 'checkout':
        title = "Complete Your Enrollment | PrepSumit";
        metaDesc = "Unlock full access to visual study guides, expert video lessons, and proctored certification exams on PrepSumit.";
        break;
      case 'dashboard':
        title = "Student Dashboard | PrepSumit";
        metaDesc = "Resume your courses, view your achievements, track weekly goals, and access your study materials from your custom PrepSumit dashboard.";
        break;
      case 'detail':
        if (selectedCourse) {
          title = `${selectedCourse.title} | PrepSumit`;
          metaDesc = selectedCourse.description || `Prepare for the ${selectedCourse.title} with PrepSumit's expert-guided study materials, videos, and practice exams.`;
        }
        break;
      case 'lesson':
        if (selectedCourse && selectedLesson) {
          title = `${selectedLesson.title} - ${selectedCourse.title} | PrepSumit`;
          metaDesc = selectedLesson.summary || `Learn about ${selectedLesson.title} in this study guide lesson from PrepSumit.`;
        }
        break;
      case 'landing':
        title = `Prep Courses for ${landingCategory ? landingCategory.charAt(0).toUpperCase() + landingCategory.slice(1).replace('-', ' ') : 'Students'} | PrepSumit`;
        metaDesc = `Browse PrepSumit online preparation courses, practice tests, and study guides for ${landingCategory}.`;
        break;
      default:
        break;
    }
    
    document.title = title;
    
    // Update the meta description tag dynamically
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', metaDesc);
    }

    // Update or create canonical link dynamically
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    let pathUrl = "/";
    switch (activePage) {
      case 'home': pathUrl = "/"; break;
      case 'ftce': pathUrl = "/ftce"; break;
      case 'teas': pathUrl = "/teas"; break;
      case 'catalog': pathUrl = "/catalog"; break;
      case 'plans': pathUrl = "/pricing"; break;
      case 'login': pathUrl = "/login"; break;
      case 'signup': pathUrl = "/signup"; break;
      case 'checkout': pathUrl = "/checkout"; break;
      case 'dashboard': pathUrl = "/dashboard"; break;
      case 'search': pathUrl = searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : "/search"; break;
      case 'landing': pathUrl = `/category/${landingCategory}`; break;
      case 'detail': if (selectedCourse) pathUrl = `/courses/${selectedCourse.id}`; break;
      case 'lesson': if (selectedCourse && selectedLesson) pathUrl = `/courses/${selectedCourse.id}/lessons/${selectedLesson.id}`; break;
      default: break;
    }
    canonical.setAttribute('href', `https://prepsumit.com${pathUrl}`);

    // Dynamic Schema Injection for Courses
    let schemaScript = document.getElementById('dynamic-course-schema');
    if (schemaScript) {
      schemaScript.remove();
    }
    
    const targetCourse = selectedCourse || (activePage === 'ftce' ? coursesData.find(c => c.id === 'ftce-professional-education-test') : (activePage === 'teas' ? coursesData.find(c => c.id === 'teas-prep') : null));
    
    if ((activePage === 'detail' || activePage === 'ftce' || activePage === 'teas' || activePage === 'lesson') && targetCourse) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-course-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": targetCourse.title,
        "description": targetCourse.description,
        "provider": {
          "@type": "Organization",
          "name": "PrepSumit",
          "sameAs": "https://prepsumit.com"
        }
      });
      document.head.appendChild(schemaScript);
    }
  }, [activePage, searchQuery, selectedCourse, selectedLesson, landingCategory]);

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Navigation Header */}
      {/* Conditionally Render Minimal Header for Signup/Checkout, or Full Navbar */}
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
            onClick={() => { setActivePage('home'); setSearchQuery(''); }}
          >
            <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15 L85 50 L15 85 Z" fill="#ffffff" />
              <path d="M15 15 L50 50 L15 85 Z" fill="#ffffff" opacity="0.3" />
              <path d="M50 50 L85 50 L15 85 Z" fill="#ffb627" />
            </svg>
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

      {/* Main Core View Area */}
      <main className={(activePage === 'home' || activePage === 'signup' || activePage === 'checkout' || activePage === 'teas') ? "main-content-full-width" : "main-content"} style={{ minHeight: 'calc(100vh - 400px)' }}>
        {activePage === 'home' && (
          <Home 
            courses={coursesData}
            activeTab={homeActiveTab}
            setActiveTab={setHomeActiveTab}
            setActivePage={setActivePage}
            setSearchQuery={setSearchQuery}
            onSelectCourse={handleSelectCourse}
            onSelectLesson={handleSelectLesson}
            onStartSignup={() => setShowEmailPopup(true)}
            onSelectCategoryLanding={handleSelectCategoryLanding}
          />
        )}

        {activePage === 'teas' && (
          <TeasLanding 
            onBackToHome={() => setActivePage('home')}
            onStartSignup={() => setShowEmailPopup(true)}
            setActivePage={setActivePage}
            setSearchQuery={setSearchQuery}
            onSelectCourse={handleSelectCourse}
            courses={coursesData}
          />
        )}

        {activePage === 'ftce' && (
          <FtceCourse 
            courses={coursesData}
            activeTab={homeActiveTab}
            setActiveTab={setHomeActiveTab}
            setActivePage={setActivePage}
            setSearchQuery={setSearchQuery}
            onSelectCourse={handleSelectCourse}
            onSelectLesson={handleSelectLesson}
            onStartSignup={() => setShowEmailPopup(true)}
          />
        )}

        {activePage === 'catalog' && (
          <CourseCatalog 
            courses={coursesData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectCourse={handleSelectCourse}
          />
        )}

        {activePage === 'plans' && (
          <Plans 
            onStartSignup={(details) => {
              if (details) {
                setSignupDetails(details);
                setActivePage('signup');
              } else {
                setShowEmailPopup(true);
              }
            }}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'search' && (
          <SearchResults 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectCourse={handleSelectCourse}
            onStartSignup={() => setShowEmailPopup(true)}
            courses={coursesData}
          />
        )}

        {activePage === 'landing' && (
          <CategoryLanding 
            category={landingCategory}
            courses={coursesData}
            onSelectCourse={handleSelectCourse}
            onStartSignup={() => setShowEmailPopup(true)}
            onBackToHome={() => setActivePage('home')}
          />
        )}

        {activePage === 'detail' && (
          <CourseDetail 
            course={selectedCourse}
            onBack={() => setActivePage('catalog')}
            onSelectLesson={handleSelectLesson}
            onStartSignup={() => setShowEmailPopup(true)}
          />
        )}

        {activePage === 'lesson' && (
          <LessonView 
            course={selectedCourse}
            lesson={selectedLesson}
            onBackToCourse={() => setActivePage('detail')}
            onSelectLesson={handleSelectLesson}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activePage === 'dashboard' && (
          <Dashboard 
            userStats={userStats}
            courses={coursesData}
            onResumeLesson={handleResumeLesson}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'login' && (
          <Login 
            setActivePage={setActivePage}
            onStartSignup={() => setShowEmailPopup(true)}
            onSelectCategoryLanding={handleSelectCategoryLanding}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {activePage === 'signup' && (
          <Signup 
            initialData={signupDetails}
            onComplete={handleSignupComplete}
            onBack={() => setActivePage('home')}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout 
            signupData={signupData}
            onCheckoutComplete={handleCheckoutComplete}
            selectedCourse={selectedCourse}
            onBack={() => setActivePage('signup')}
            setActivePage={setActivePage}
          />
        )}
      </main>

      {/* Floating AI Tutor Chatbot on Study & Catalog Pages */}
      {(activePage === 'detail' || activePage === 'lesson' || activePage === 'ftce' || activePage === 'landing' || activePage === 'catalog' || activePage === 'search') && (
        <AITutor course={selectedCourse} lesson={selectedLesson} />
      )}

      {/* Global Informational Modal (FAQ, Terms, Careers, privacy) */}
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

      {/* Initial Email Capture Popup Modal */}
      <EmailPopup 
        isOpen={showEmailPopup}
        onClose={() => setShowEmailPopup(false)}
        onContinue={handleEmailContinue}
      />
    </div>
  );
}
