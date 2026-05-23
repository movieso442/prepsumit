import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Login from './pages/Login';

import { coursesData, userStatsData } from './data/courses';
import { Award, Sparkles } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home', 'catalog', 'detail', 'lesson', 'dashboard', 'signup', 'checkout'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [userStats, setUserStats] = useState(userStatsData);
  
  // Custom states for the PrepSummit.com onboarding screens
  const [signupData, setSignupData] = useState(null);
  
  // Completed rewards notification state
  const [rewardNotification, setRewardNotification] = useState(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedCourse, selectedLesson]);

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
    // Update user stats with premium branding
    setUserStats(prev => ({
      ...prev,
      name: signupData ? `${signupData.firstName} ${signupData.lastName}` : prev.name,
      rank: `Premium Scholar (${signupData?.country || 'USA'})`,
      xp: prev.xp + 500, // Onboarding bonus!
    }));

    alert(`Success! You have subscribed to ${planName}. Welcome to PrepSummit.com Premium!`);
    
    // Direct back to Course Detail for FTCE
    const ftceCourse = coursesData.find(c => c.id === 'ftce-professional-education-test');
    if (ftceCourse) {
      setSelectedCourse(ftceCourse);
      setActivePage('detail');
    } else {
      setActivePage('dashboard');
    }
  };

  const handleQuizComplete = (score, total) => {
    // Add XP and increment completed count
    const xpGained = score * 20 + (score === total ? 50 : 0); // 20 XP per answer + 50 XP bonus for perfect score
    
    setUserStats(prev => {
      // Avoid duplicate milestones by adding to totals
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

    // Trigger congratulations overlay banner
    setRewardNotification({
      score,
      total,
      xpGained
    });

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setRewardNotification(null);
    }, 5500);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Navigation Header */}
      <Navbar 
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={userStats}
        courses={coursesData}
        onSelectCourse={handleSelectCourse}
      />

      {/* Main Core View Area */}
      <main className="main-content" style={{ minHeight: 'calc(100vh - 400px)' }}>
        {activePage === 'home' && (
          <Home 
            courses={coursesData}
            setActivePage={setActivePage}
            setSearchQuery={setSearchQuery}
            onSelectCourse={handleSelectCourse}
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

        {activePage === 'detail' && (
          <CourseDetail 
            course={selectedCourse}
            onBack={() => setActivePage('catalog')}
            onSelectLesson={handleSelectLesson}
            onStartSignup={() => setActivePage('signup')}
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

        {activePage === 'signup' && (
          <Signup 
            onComplete={handleSignupComplete}
            onBackToHome={() => setActivePage('home')}
          />
        )}

        {activePage === 'login' && (
          <Login 
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout 
            signupData={signupData}
            onCheckoutComplete={handleCheckoutComplete}
          />
        )}
      </main>

      {/* Notification Toast Alert for Completing Quizzes */}
      {rewardNotification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          maxWidth: '380px',
          animation: 'fadeIn 0.3s ease-out forwards',
          borderLeft: '6px solid var(--success)',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }} className="card">
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px', fontWeight: '700' }}>
              Lesson Mastered!
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              You passed the quiz with a score of <strong>{rewardNotification.score}/{rewardNotification.total}</strong>.
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--success)', 
              fontWeight: '700', 
              fontSize: '0.8rem',
              marginTop: '8px'
            }}>
              <Award size={14} /> +{rewardNotification.xpGained} XP awarded to Profile
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding Links - Hidden on login screen to use auth-specific footer */}
      {activePage !== 'login' && <Footer setActivePage={setActivePage} />}
    </div>
  );
}
