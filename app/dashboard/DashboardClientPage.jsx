"use client";

import Dashboard from '@/src/views/Dashboard';
import { useAppContext } from '../providers';

export default function DashboardClientPage() {
  const { 
    userStats, 
    courses, 
    handleResumeLesson, 
    setActivePage 
  } = useAppContext();

  return (
    <Dashboard 
      userStats={userStats}
      courses={courses}
      onResumeLesson={handleResumeLesson}
      setActivePage={setActivePage}
    />
  );
}
