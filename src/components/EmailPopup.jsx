import { useState } from 'react';
import { X } from 'lucide-react';

export default function EmailPopup({ isOpen, onClose, onContinue }) {
  const [popupStep, setPopupStep] = useState(1);
  const [popupData, setPopupData] = useState({
    role: 'Student',
    goal: 'Prepare for an exam',
    exam: 'FTCE Professional Education Test',
    email: ''
  });

  if (!isOpen) return null;

  const roles = ['Student', 'Teacher', 'Parent', 'Other'];
  const goals = [
    'Choose a goal',
    'Study for class',
    'Earn college credit',
    'Research colleges',
    'Prepare for an exam',
    'Improve my grades',
    'Homeschool',
    'Other'
  ];
  const exams = [
    'FTCE Professional Education Test',
    'AP Calculus BC',
    'Cell Biology',
    'Introduction to Psychology',
    'ATI TEAS Test Prep',
    'RICA Test Prep',
    'TExES Test Prep',
    'Other Exam'
  ];

  const handleNext = (e) => {
    if (e) e.preventDefault();

    if (popupStep === 1) {
      setPopupStep(2);
    } else if (popupStep === 2) {
      if (popupData.goal === 'Prepare for an exam') {
        setPopupStep(3);
      } else {
        setPopupStep(4);
      }
    } else if (popupStep === 3) {
      setPopupStep(4);
    } else if (popupStep === 4) {
      if (!popupData.email.trim()) {
        alert("Please enter a valid email address.");
        return;
      }
      onContinue(popupData);
    }
  };

  const handleBack = () => {
    if (popupStep === 1) {
      onClose();
    } else if (popupStep === 3) {
      setPopupStep(2);
    } else if (popupStep === 4) {
      if (popupData.goal === 'Prepare for an exam') {
        setPopupStep(3);
      } else {
        setPopupStep(2);
      }
    } else {
      setPopupStep(popupStep - 1);
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '16px'
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .popup-grid {
            flex-direction: column !important;
            gap: 24px !important;
          }
          .popup-left {
            max-width: 100% !important;
            width: 100% !important;
          }
          .popup-right {
            display: none !important; /* Hide badge inside modal on mobile for spacing */
          }
          .popup-container-box {
            padding: 24px !important;
            max-width: 95% !important;
          }
          .popup-main-title {
            font-size: 1.35rem !important;
            margin-bottom: 16px !important;
          }
        }
      `}</style>

      <div 
        className="popup-container-box"
        onClick={e => e.stopPropagation()} 
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          maxWidth: '820px',
          width: '100%',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          padding: '36px 40px',
          position: 'relative'
        }}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#718096',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
          aria-label="Close Email Popup"
        >
          <X size={22} />
        </button>

        {/* Modal Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 className="popup-main-title" style={{
            fontSize: '1.75rem',
            fontWeight: '400',
            color: '#005f73',
            margin: '0',
            fontFamily: 'var(--font-heading)'
          }}>
            Create your account, risk-free
          </h2>
        </div>

        {/* Dual Pane Layout */}
        <div className="popup-grid" style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'space-between',
          alignItems: 'stretch'
        }}>
          
          {/* Left Panel: Grey Card containing Form */}
          <div className="popup-left" style={{
            flex: '1 1 420px',
            maxWidth: '460px',
            backgroundColor: '#edf2f7',
            padding: '32px 28px',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '260px'
          }}>
            
            <form onSubmit={handleNext} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              
              {/* Slide 1: Role */}
              {popupStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1f4e5a' }}>
                    What best describes you?
                  </label>
                  <select 
                    value={popupData.role}
                    onChange={e => setPopupData({ ...popupData, role: e.target.value })}
                    style={{
                      padding: '12px 14px',
                      border: '1.5px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '0.98rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#222222',
                      cursor: 'pointer'
                    }}
                  >
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              )}

              {/* Slide 2: Main Goal */}
              {popupStep === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1f4e5a' }}>
                    What's your main goal?
                  </label>
                  <select 
                    value={popupData.goal}
                    onChange={e => setPopupData({ ...popupData, goal: e.target.value })}
                    style={{
                      padding: '12px 14px',
                      border: '1.5px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '0.98rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#222222',
                      cursor: 'pointer'
                    }}
                  >
                    {goals.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              )}

              {/* Slide 3: Exam Select */}
              {popupStep === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1f4e5a' }}>
                    What exam are you preparing for?
                  </label>
                  <select 
                    value={popupData.exam}
                    onChange={e => setPopupData({ ...popupData, exam: e.target.value })}
                    style={{
                      padding: '12px 14px',
                      border: '1.5px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '0.98rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#222222',
                      cursor: 'pointer'
                    }}
                  >
                    {exams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                  </select>
                </div>
              )}

              {/* Slide 4: Email */}
              {popupStep === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1f4e5a' }}>Email</label>
                    <svg 
                      onClick={() => alert("We use your email address to log you in securely and send study progress notices.")}
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#4a5568" 
                      strokeWidth="2.5" 
                      style={{ cursor: 'pointer', opacity: 0.8 }}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={popupData.email}
                    onChange={e => setPopupData({ ...popupData, email: e.target.value })}
                    required
                    style={{
                      padding: '12px 14px',
                      border: '1.5px solid #ccd6e0',
                      borderRadius: '4px',
                      fontSize: '0.98rem',
                      outline: 'none',
                      backgroundColor: '#ffffff',
                      color: '#222222'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#718096', marginTop: '2px' }}>
                    You'll use this email to log in.
                  </span>
                </div>
              )}

              {/* Action Button */}
              <div>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(to bottom, #00b8db, #00a2c2)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    padding: '10px 28px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0, 162, 194, 0.15)',
                    transition: 'opacity 0.2s',
                    width: 'auto'
                  }}
                  onMouseOver={e => e.target.style.opacity = '0.92'}
                  onMouseOut={e => e.target.style.opacity = '1'}
                >
                  Continue
                </button>
              </div>

            </form>

            {/* Back link */}
            <div style={{ marginTop: '16px' }}>
              <span
                onClick={handleBack}
                style={{
                  color: '#00829a',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                back
              </span>
            </div>

          </div>

          {/* Right Panel: Mapped 92% pass badge */}
          <div className="popup-right" style={{
            flex: '0 0 250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              {/* Sketch outlines */}
              <svg style={{ position: 'absolute', width: '150%', height: '150%', zIndex: 0 }} viewBox="0 0 200 200">
                <path d="M 30,130 L 50,110 L 75,135 L 55,155 Z" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="3 3"/>
                <path d="M 30,130 L 20,140 L 35,145 L 30,130" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 130,50 C 140,40 160,40 170,50 L 170,110 C 160,100 140,100 130,110 Z" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6"/>
                <path d="M 130,110 C 120,100 100,100 90,110 L 90,50 C 100,40 120,40 130,50" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6"/>
              </svg>

              {/* Main Badge */}
              <div style={{
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                backgroundColor: '#00829a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: '800',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(0,130,154,0.25)',
                zIndex: 1
              }}>
                92%
              </div>
            </div>

            <p style={{
              fontSize: '0.92rem',
              lineHeight: '1.4',
              color: '#4a5568',
              margin: 0,
              zIndex: 1
            }}>
              of students <strong style={{ color: '#e15b3e', fontWeight: '700' }}>passed their exam</strong> after using PrepSumit.com*
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
