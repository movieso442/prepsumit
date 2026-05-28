"use client";

import PraxisCourse from '@/src/views/PraxisCourse';
import { useAppContext } from '../providers';

export default function PraxisClientPage() {
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
    <PraxisCourse 
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
