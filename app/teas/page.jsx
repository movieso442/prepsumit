"use client";

import TeasLanding from '@/src/views/TeasLanding';
import { useAppContext } from '../providers';

export default function TeasLandingPage() {
  const { 
    courses, 
    setActivePage, 
    setSearchQuery, 
    handleSelectCourse, 
    setShowEmailPopup 
  } = useAppContext();

  return (
    <TeasLanding 
      onBackToHome={() => setActivePage('home')}
      onStartSignup={() => setShowEmailPopup(true)}
      setActivePage={setActivePage}
      setSearchQuery={setSearchQuery}
      onSelectCourse={handleSelectCourse}
      courses={courses}
    />
  );
}
