"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, BookOpen, Filter, ArrowRight, HelpCircle } from 'lucide-react';
import { useAppContext } from '../providers';

export default function CoursesClientPage() {
  const router = useRouter();
  const { 
    courses, 
    searchQuery, 
    setSearchQuery, 
    handleSelectCourse 
  } = useAppContext();

  // Levels selected in checkboxes
  const levelsList = [
    'Elementary School',
    'Middle School',
    'High School',
    'Advanced Placement',
    'College Prep',
    'Teacher Certification',
    'Introductory'
  ];

  const [selectedLevels, setSelectedLevels] = useState(levelsList);

  const handleLevelToggle = (level) => {
    setSelectedLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(item => item !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  // Filter logic
  const filteredCourses = courses.filter(course => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      course.title.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      (course.lessons && course.lessons.some(lesson => 
        lesson.title.toLowerCase().includes(query) || 
        lesson.summary.toLowerCase().includes(query)
      ));

    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);

    return matchesQuery && matchesLevel;
  });

  const handleOthersClick = (e) => {
    e.preventDefault();
    router.push('/signup?exam=others');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      
      {/* 1. Header Banner */}
      <div style={{
        backgroundColor: '#1f4e5a',
        borderRadius: '8px',
        padding: '40px 32px',
        color: '#ffffff',
        boxShadow: '0 4px 20px rgba(31,78,90,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', margin: '0 0 12px 0', fontFamily: "'Outfit', sans-serif" }}>
          PrepSumit Study Guides & Course Catalog
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '680px', margin: '0 auto', lineHeight: '1.5' }}>
          Explore our expert-developed test prep libraries. Pass your exam on the first attempt with micro-lessons, flashcards, and practice tests.
        </p>
      </div>

      {/* 2. Large Search Block */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #d2dbe5',
        borderRadius: '8px',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 4px 15px rgba(31,78,90,0.03)'
      }}>
        <h2 style={{ fontSize: '1.4rem', color: '#1f4e5a', fontWeight: '800', margin: 0 }}>Search All Exam Prep Guides</h2>
        
        <div style={{ display: 'flex', gap: '12px', width: '100%', position: 'relative' }}>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <input 
              type="text"
              placeholder="Search by exam, subject, or lesson topic, e.g. RICA, TEAS, TExES, Limits..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 44px',
                border: '1.5px solid #13809c',
                borderRadius: '4px',
                outline: 'none',
                fontSize: '1rem',
                color: '#222222'
              }}
            />
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#13809c' }} />
          </div>
          {searchQuery && (
            <button 
              className="btn btn-secondary" 
              onClick={() => setSearchQuery('')}
              style={{ padding: '0 20px', borderRadius: '4px' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Catalog Grid Layout */}
      <div className="catalog-layout-grid">
        
        {/* Left Sidebar Filter Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #d2dbe5',
          borderRadius: '8px',
          padding: '24px',
          height: 'fit-content',
          boxShadow: '0 4px 15px rgba(31,78,90,0.02)'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#1f4e5a', fontWeight: '800', borderBottom: '2px solid #f2f6f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Filter size={18} /> Education Level
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {levelsList.map((level, idx) => (
              <label 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  fontSize: '0.9rem', 
                  color: '#4a5568', 
                  cursor: 'pointer',
                  fontWeight: selectedLevels.includes(level) ? 'bold' : 'normal'
                }}
              >
                <input 
                  type="checkbox"
                  checked={selectedLevels.includes(level)}
                  onChange={() => handleLevelToggle(level)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#13809c' }}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #d2dbe5', margin: 0 }} />

          <div style={{ fontSize: '0.8rem', color: '#718096', lineHeight: '1.4' }}>
            Filter study guides by school level, advanced placement, or professional certification programs.
          </div>
        </div>

        {/* Right Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.92rem', color: '#718096', fontWeight: '700' }}>
              Showing {filteredCourses.length} test-aligned courses
            </span>
          </div>

          {/* Cards Grid list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredCourses.map((course) => {
              const courseHref = course.id === 'ftce-professional-education-test' ? '/ftce' : (course.id === 'teas-prep' ? '/teas' : `/courses/${course.id}`);
              return (
                <a 
                  key={course.id}
                  href={courseHref}
                  className="card catalog-course-card-grid"
                  style={{
                    padding: '24px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d2dbe5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(31,78,90,0.02)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'grid'
                  }}
                  onClick={(e) => { e.preventDefault(); handleSelectCourse(course); }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                >
                  
                  {/* Left block: Course image */}
                  <div style={{
                    width: '100%',
                    height: '140px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#f2f6f9',
                    position: 'relative'
                  }}>
                    <img 
                      src={course.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80"}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{ 
                      position: 'absolute', 
                      bottom: '8px', 
                      left: '8px', 
                      backgroundColor: 'rgba(31,78,90,0.9)', 
                      color: 'white', 
                      fontSize: '0.72rem', 
                      fontWeight: '800', 
                      padding: '3px 8px', 
                      borderRadius: '20px' 
                    }}>
                      {course.subject}
                    </span>
                  </div>

                  {/* Right block: Course summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '1.25rem', color: '#1f4e5a', margin: 0, fontWeight: '800', lineHeight: '1.3' }}>
                        {course.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb627', flexShrink: 0 }}>
                        <Star size={16} fill="#ffb627" stroke="#ffb627" />
                        <span style={{ color: '#222222', fontSize: '0.85rem', fontWeight: '800' }}>{course.rating}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#4a5568', lineHeight: '1.5', margin: 0 }}>
                      {course.description}
                    </p>

                    <div style={{ 
                      marginTop: 'auto', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      paddingTop: '12px',
                      borderTop: '1px solid #f2f6f9'
                    }}>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#718096', fontWeight: '700' }}>
                        <span>{course.lessons ? course.lessons.length : course.lessonsCount} lessons</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                      </div>
                      <span 
                        style={{
                          backgroundColor: '#13809c',
                          color: '#ffffff',
                          borderRadius: '4px',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          padding: '10px 18px',
                          display: 'inline-block'
                        }}
                      >
                        View Lessons ({course.lessons ? course.lessons.length : course.lessonsCount})
                      </span>
                    </div>

                  </div>
                </a>
              );
            })}

            {/* Always display the "Others" option card at the end of the course list */}
            <div 
              className="card catalog-course-card-grid"
              style={{
                padding: '24px',
                backgroundColor: '#f8fafc',
                border: '2px dashed #cbd5e1',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.01)',
                transition: 'all 0.2s',
                display: 'grid'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = '#13809c';
                e.currentTarget.style.backgroundColor = '#f0f9fb';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              {/* Left block: Icon/Graphic placeholder */}
              <div style={{
                width: '100%',
                height: '140px',
                borderRadius: '4px',
                backgroundColor: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569'
              }}>
                <HelpCircle size={48} strokeWidth={1.5} />
              </div>

              {/* Right block: Information and Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#1f4e5a', margin: 0, fontWeight: '800', lineHeight: '1.3' }}>
                  Can't find your exam or course?
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  PrepSumit is constantly expanding its library of professional certifications and exam study guides. Select <strong>Others</strong> to create an account and let us know what course you need.
                </p>

                <div style={{ 
                  marginTop: 'auto', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: '700' }}>
                    Custom Exam Prep
                  </span>
                  <a 
                    href="/signup?exam=others"
                    onClick={handleOthersClick}
                    style={{
                      backgroundColor: '#ffb627',
                      color: '#222222',
                      borderRadius: '4px',
                      fontWeight: '800',
                      fontSize: '0.88rem',
                      padding: '10px 18px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 5px rgba(255,182,39,0.15)',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e09f1b'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#ffb627'}
                  >
                    Select Others & Sign Up <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
