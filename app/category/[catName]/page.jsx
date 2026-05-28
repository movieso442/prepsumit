"use client";

import { useParams } from 'next/navigation';
import CategoryLanding from '@/src/views/CategoryLanding';
import { useAppContext } from '../../providers';

export default function CategoryPage() {
  const params = useParams();
  const catName = params?.catName || '';
  const { 
    courses, 
    handleSelectCourse, 
    setShowEmailPopup, 
    setActivePage 
  } = useAppContext();

  return (
    <CategoryLanding 
      category={catName}
      courses={courses}
      onSelectCourse={handleSelectCourse}
      onStartSignup={() => setShowEmailPopup(true)}
      onBackToHome={() => setActivePage('home')}
    />
  );
}
