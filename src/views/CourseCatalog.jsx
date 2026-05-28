import { useState } from 'react';
import { Search, Star, BookOpen, Filter } from 'lucide-react';

export default function CourseCatalog({ courses, searchQuery, setSearchQuery, onSelectCourse }) {
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
        // Don't empty completely so it filters nicely, or let it empty to show nothing
        return prev.filter(item => item !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  // Filter logic
  const filteredCourses = courses.filter(course => {
    // Search query matches title, subject, description, or lessons
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      course.title.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.lessons.some(lesson => 
        lesson.title.toLowerCase().includes(query) || 
        lesson.summary.toLowerCase().includes(query)
      );

    // Sidebar level filter matches
    // Since some courses are listed as e.g. "Teacher Certification" or "Advanced Placement"
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);

    return matchesQuery && matchesLevel;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Large search block matching the screenshot */}
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
        <h2 style={{ fontSize: '1.5rem', color: '#1f4e5a', fontWeight: '800' }}>Course Catalog Search</h2>
        
        <div style={{ display: 'flex', gap: '12px', width: '100%', position: 'relative' }}>
          <div style={{ flexGrow: 1, position: 'relative' }}>
            <input 
              type="text"
              placeholder="Search by exam, subject, or lesson topic, e.g. FTCE, Limits, GDP..."
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

      {/* 2. Main Sidebar + Catalog Grid Grid Layout */}
      <div className="catalog-layout-grid">
        
        {/* Left Sidebar Filter Column (Screenshot 480) */}
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
            <h3 style={{ fontSize: '1.1rem', color: '#1f4e5a', fontWeight: '800', borderBottom: '2px solid #f2f6f9', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                  checked={selectedLevels.includes(level) || (level === 'Advanced Placement' && selectedLevels.includes('Advanced Placement')) || (level === 'College Prep' && selectedLevels.includes('College Prep')) || (level === 'Teacher Certification' && selectedLevels.includes('Teacher Certification'))}
                  onChange={() => {
                    const normLevel = level === 'Advanced Placement' ? 'Advanced Placement' : level === 'College Prep' ? 'College Prep' : level === 'Teacher Certification' ? 'Teacher Certification' : level;
                    handleLevelToggle(normLevel);
                  }}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#13809c' }}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #d2dbe5' }} />

          <div style={{ fontSize: '0.8rem', color: '#718096', lineHeight: '1.4' }}>
            Select your target academic or career level to filter custom study guides.
          </div>
        </div>

        {/* Right Content Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.92rem', color: '#718096', fontWeight: '700' }}>
              Showing {filteredCourses.length} test-aligned courses
            </span>
          </div>

          {/* Cards Grid list (Screenshot 480 style) */}
          {filteredCourses.length > 0 ? (
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
                    onClick={(e) => { e.preventDefault(); onSelectCourse(course); }}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    
                    {/* Left block: Course visual top image */}
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

                    {/* Right block: Course summary and View Lessons Button */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ fontSize: '1.28rem', color: '#1f4e5a', margin: 0, fontWeight: '800', lineHeight: '1.3' }}>
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

                      {/* Meta stats bar and View Lessons teal button */}
                      <div style={{ 
                        marginTop: 'auto', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        paddingTop: '12px',
                        borderTop: '1px solid #f2f6f9'
                      }}>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: '#718096', fontWeight: '700' }}>
                          <span>{course.lessonsCount} lessons</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>
                        <a 
                          href={courseHref}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onSelectCourse(course);
                          }}
                          style={{
                            backgroundColor: '#13809c',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: '800',
                            fontSize: '0.88rem',
                            padding: '10px 18px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            textDecoration: 'none',
                            display: 'inline-block'
                          }}
                          onMouseOver={e => e.target.style.backgroundColor = '#0f6880'}
                          onMouseOut={e => e.target.style.backgroundColor = '#13809c'}
                        >
                          View Lessons ({course.lessonsCount})
                        </a>
                      </div>

                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-tertiary)' }}>
              <BookOpen size={48} style={{ margin: '0 auto 16px', color: '#718096' }} />
              <h3 style={{ fontSize: '1.2rem', color: '#1f4e5a', marginBottom: '4px' }}>No Exam Study Guides Found</h3>
              <p style={{ fontSize: '0.9rem' }}>We couldn't find any courses matching your search or filters. Try checking different levels.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
