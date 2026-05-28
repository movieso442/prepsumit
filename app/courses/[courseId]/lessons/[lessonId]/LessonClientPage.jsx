"use client";

import { useParams } from 'next/navigation';
import LessonView from '@/src/views/LessonView';
import { useAppContext } from '../../../../providers';

export default function LessonClientPage() {
  const params = useParams();
  const courseId = params?.courseId || '';
  const lessonId = params?.lessonId || '';
  const { 
    courses, 
    selectedCourse, 
    selectedLesson, 
    setActivePage, 
    handleSelectLesson, 
    handleQuizComplete 
  } = useAppContext();

  // Find course and lesson based on URL parameters
  const course = courses.find(c => c.id.toLowerCase() === courseId.toLowerCase()) || selectedCourse;
  const lesson = course?.lessons?.find(l => l.id.toLowerCase() === lessonId.toLowerCase()) || selectedLesson;

  if (!course || !lesson) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center', fontFamily: "'Outfit', sans-serif" }}>
        <h2 style={{ color: '#1f4e5a', marginBottom: '16px' }}>Lesson Not Found</h2>
        <p style={{ color: '#4a5568', marginBottom: '24px' }}>We couldn't locate the requested lesson page.</p>
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

  return (
    <LessonView 
      course={course}
      lesson={lesson}
      onBackToCourse={() => setActivePage('detail')}
      onSelectLesson={handleSelectLesson}
      onQuizComplete={handleQuizComplete}
    />
  );
}
