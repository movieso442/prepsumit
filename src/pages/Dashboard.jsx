
import DashboardStats from '../components/DashboardStats';

export default function Dashboard({ userStats, courses, onResumeLesson, setActivePage }) {
  
  // Format date nicely
  const getGreetingTime = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good Morning';
    if (hrs < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Hello User Greeting Header */}
      <div className="card" style={{ 
        padding: '32px', 
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)', 
        color: '#ffffff',
        border: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background shapes */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          bottom: '-20px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', color: 'rgba(255, 255, 255, 0.8)' }}>
              Welcome back
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginTop: '4px', fontFamily: 'var(--font-heading)', fontWeight: '800' }}>
              {getGreetingTime()}, {userStats.name}!
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginTop: '6px', fontSize: '0.95rem', maxWidth: '500px' }}>
              Ready to hit today's study goals? You're doing amazing—keep up your {userStats.streak}-day streak!
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn" 
              onClick={() => setActivePage('catalog')}
              style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Browse Library
            </button>
          </div>
        </div>
      </div>

      {/* Stats Sub-components */}
      <div>
        <DashboardStats 
          userStats={userStats}
          courses={courses}
          onResumeLesson={onResumeLesson}
        />
      </div>

    </div>
  );
}
