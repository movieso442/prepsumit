"use client";

import { useParams } from 'next/navigation';
import CourseDetail from '@/src/views/CourseDetail';
import FtceCourse from '@/src/views/FtceCourse';
import TeasLanding from '@/src/views/TeasLanding';
import { useAppContext } from '../../providers';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.courseId || '';
  const { 
    courses, 
    selectedCourse, 
    handleSelectLesson, 
    setShowEmailPopup, 
    setActivePage,
    homeActiveTab,
    setHomeActiveTab,
    setSearchQuery,
    handleSelectCourse
  } = useAppContext();

  // Find the course based on URL parameter
  const course = courses.find(c => c.id.toLowerCase() === courseId.toLowerCase()) || selectedCourse;

  if (!course) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center', fontFamily: "'Outfit', sans-serif" }}>
        <h2 style={{ color: '#1f4e5a', marginBottom: '16px' }}>Course Not Found</h2>
        <p style={{ color: '#4a5568', marginBottom: '24px' }}>We couldn't locate the requested course page.</p>
        <button 
          onClick={() => setActivePage('catalog')} 
          style={{
            backgroundColor: '#13809c',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '12px 24px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Go to Catalog
        </button>
      </div>
    );
  }

  if (course.id === 'ftce-professional-education-test') {
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

  if (course.id === 'teas-prep') {
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

  return (
    <CourseDetail 
      course={course}
      onBack={() => setActivePage('catalog')}
      onSelectLesson={handleSelectLesson}
      onStartSignup={() => setShowEmailPopup(true)}
    />
  );
}
