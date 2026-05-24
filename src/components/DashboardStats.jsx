import { Flame, Trophy, CheckSquare, Award, Play } from 'lucide-react';

export default function DashboardStats({ userStats, courses, onResumeLesson }) {
  const { streak, weeklyGoal, studiedHours, completedLessons, xp, achievements, recentlyViewed } = userStats;
  const weeklyPercentage = Math.min(Math.round((studiedHours / weeklyGoal) * 100), 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Analytics Summary Cards */}
      <div className="stats-grid">
        {/* Streak card */}
        <div className="card stat-card card-hover">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}>
            <Flame size={28} fill="var(--accent)" />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Streak</span>
            <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{streak} Days</h3>
          </div>
        </div>

        {/* Goal radial card */}
        <div className="card stat-card card-hover">
          <div style={{ position: 'relative', width: '56px', height: '56px' }}>
            <svg className="radial-progress-svg" width="56" height="56" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" className="radial-progress-bg" />
              <circle 
                cx="28" 
                cy="28" 
                r="24" 
                className="radial-progress-bar" 
                style={{
                  strokeDasharray: 2 * Math.PI * 24,
                  strokeDashoffset: (2 * Math.PI * 24) * (1 - weeklyPercentage / 100)
                }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--text-primary)'
            }}>
              {weeklyPercentage}%
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Weekly Goal</span>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{studiedHours} / {weeklyGoal} hrs</h3>
          </div>
        </div>

        {/* Experience Points Card */}
        <div className="card stat-card card-hover">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <Trophy size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Experience</span>
            <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{xp} XP</h3>
          </div>
        </div>

        {/* Completed Lesson Card */}
        <div className="card stat-card card-hover">
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
            <CheckSquare size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Completed</span>
            <h3 style={{ fontSize: '1.6rem', margin: 0 }}>{completedLessons} Lessons</h3>
          </div>
        </div>
      </div>

      {/* Main Grid: Recently Studied and Achievements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '32px' }} className="dashboard-grid">
        
        {/* Recently Studied Courses List */}
        <div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Continue Learning</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentlyViewed.map((recent, idx) => {
              const course = courses.find(c => c.id === recent.courseId);
              if (!course) return null;
              
              const lesson = course.lessons.find(l => l.id === recent.lessonId) || course.lessons[0];
              
              return (
                <div key={idx} className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <span className="badge" style={{ backgroundColor: course.lightBg, color: course.color, marginBottom: '8px' }}>
                      {course.subject}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{course.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      Next Up: <strong>{lesson.title}</strong>
                    </p>

                    {/* Progress Slider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flexGrow: 1, backgroundColor: 'var(--bg-tertiary)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${recent.progress}%`, backgroundColor: course.color, height: '100%' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>{recent.progress}%</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary" 
                    onClick={() => onResumeLesson(course, lesson)}
                    style={{ backgroundColor: course.color }}
                  >
                    <Play size={14} fill="white" /> Resume
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements Gallery */}
        <div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>My Badges</h3>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {achievements.map((ach, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0
                }}>
                  <Award size={20} />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.9rem', margin: 0 }}>{ach.title}</h5>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{ach.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
