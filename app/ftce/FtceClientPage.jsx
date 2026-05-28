"use client";

import FtceCourse from '@/src/views/FtceCourse';
import { useAppContext } from '../providers';

export default function FtceClientPage() {
  const { 
    courses, 
    homeActiveTab, 
    setHomeActiveTab, 
    setActivePage, 
    setSearchQuery, 
    handleSelectCourse, 
    handleSelectLesson, 
    setShowEmailPopup 
  } = useAppContext();

  return (
    <FtceCourse 
      courses={courses}
      activeTab={homeActiveTab}
      setActiveTab={setHomeActiveTab}
      setActivePage={setActivePage}
      setSearchQuery={setSearchQuery}
      onSelectCourse={handleSelectCourse}
      onSelectLesson={handleSelectLesson}
      onStartSignup={() => setShowEmailPopup(true)}
    />
  );
}
