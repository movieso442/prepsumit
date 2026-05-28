import { ArrowLeft, Clock, BookOpen, HelpCircle } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

export default function LessonView({ course, lesson, onBackToCourse, onSelectLesson, onQuizComplete }) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <button 
          className="btn btn-secondary" 
          onClick={onBackToCourse}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px' }}
        >
          <ArrowLeft size={16} /> Course Overview
        </button>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: course.color, fontWeight: '700', textTransform: 'uppercase' }}>
            {course.title}
          </span>
        </div>
      </div>

      {/* Main Grid: Player on left, Sidebar on right */}
      <div className="lesson-layout-grid">
        
        {/* Active Classroom Player */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{lesson.title}</h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> Duration: {lesson.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><HelpCircle size={14} /> Quiz: {lesson.quiz.length} Questions</span>
            </div>
          </div>

          <VideoPlayer 
            lesson={lesson} 
            courseColor={course.color} 
            onQuizComplete={onQuizComplete}
          />
        </div>

        {/* Syllabus Navigation Sidebar */}
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} style={{ color: course.color }} />
            <span>Course Lessons</span>
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {course.lessons.map((item, idx) => {
              const isActive = item.id === lesson.id;
              
              return (
                <div
                  key={item.id}
                  className="card card-hover"
                  onClick={() => onSelectLesson(item)}
                  style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    borderColor: isActive ? course.color : 'var(--border-light)',
                    borderLeft: isActive ? `4px solid ${course.color}` : '1px solid var(--border-light)',
                    backgroundColor: isActive ? 'var(--bg-secondary)' : 'var(--bg-secondary)',
                    opacity: isActive ? 1 : 0.8,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: isActive ? course.color : 'var(--text-tertiary)' }}>
                      {idx + 1}.
                    </span>
                    <h4 style={{ 
                      fontSize: '0.95rem', 
                      margin: 0, 
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? '700' : '600'
                    }}>
                      {item.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'var(--text-tertiary)', paddingLeft: '18px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={10} /> {item.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
