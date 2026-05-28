"use client";

import Home from '@/src/views/Home';
import { useAppContext } from './providers';

export default function HomeClientPage() {
  const { 
    courses, 
    homeActiveTab, 
    setHomeActiveTab, 
    setActivePage, 
    setSearchQuery, 
    handleSelectCourse, 
    handleSelectLesson, 
    setShowEmailPopup, 
    handleSelectCategoryLanding 
  } = useAppContext();

  return (
    <Home 
      courses={courses}
      activeTab={homeActiveTab}
      setActiveTab={setHomeActiveTab}
      setActivePage={setActivePage}
      setSearchQuery={setSearchQuery}
      onSelectCourse={handleSelectCourse}
      onSelectLesson={handleSelectLesson}
      onStartSignup={() => setShowEmailPopup(true)}
      onSelectCategoryLanding={handleSelectCategoryLanding}
    />
  );
}
