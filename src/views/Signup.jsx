import { useState, useEffect } from 'react';

export default function Signup({ initialData, onComplete, onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    exam: (initialData?.exam === 'others' || initialData?.exam === 'Others') ? 'Others' : (initialData?.exam || 'FTCE Professional Education Test'),
    isFirstTime: 'yes', // 'yes' | 'no'
    attempts: '', // '1' | '2' | '3+'
    country: 'United States',
    city: '',
    state: '',
    zipCode: '',
    referral: [],
    email: initialData?.email || '',
    password: '',
    passwordConfirm: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        email: initialData.email || prev.email,
        exam: (initialData.exam === 'others' || initialData.exam === 'Others') ? 'Others' : (initialData.exam || prev.exam)
      }));
    }
  }, [initialData]);

  const countries = [
    'United States',
    'Cameroon',
    'Nigeria',
    'Canada',
    'United Kingdom',
    'Australia',
    'South Africa',
    'Kenya',
    'Ghana',
    'India',
    'Germany'
  ];

  const surveyOptions = [
    'Online forums (Reddit, Quora, etc.)',
    'Google Search',
    'AI Chatbot (ChatGPT, Claude, Gemini, etc.)',
    'Friend or family member',
    'My School',
    'Facebook/Instagram',
    'TikTok',
    'YouTube',
    'Other'
  ];

  const handleCheckboxChange = (option) => {
    setFormData(prev => {
      const idx = prev.referral.indexOf(option);
      if (idx > -1) {
        return {
          ...prev,
          referral: prev.referral.filter(item => item !== option)
        };
      } else {
        return {
          ...prev,
          referral: [...prev.referral, option]
        };
      }
    });
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();

    if (step === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        alert("Please enter both your first name and last name.");
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        alert("Please enter a valid email address.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (formData.isFirstTime === 'no' && !formData.attempts) {
        alert("Please select the number of times you have taken the exam.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.city.trim()) {
        alert("Please enter your city.");
        return;
      }
      if (!formData.state.trim()) {
        alert(formData.country === 'United States' ? "Please enter your state." : "Please enter your state / region.");
        return;
      }
      if (!formData.zipCode.trim()) {
        alert(formData.country === 'United States' ? "Please enter your ZIP code." : "Please enter your ZIP / postal code.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      if (!formData.password.trim() || !formData.passwordConfirm.trim()) {
        alert("Please fill out both password and password confirmation fields.");
        return;
      }
      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
      }
      if (formData.password !== formData.passwordConfirm) {
        alert("Passwords do not match. Please verify your entry.");
        return;
      }
      onComplete({
        ...initialData,
        ...formData,
        role: initialData?.role || 'Student',
        goal: initialData?.goal || 'Prepare for an exam',
        examName: formData.exam
      });
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)'
    }}>
      
      {/* Inline style component for mobile media query compliance */}
      <style>{`
        @media (max-width: 768px) {
          .signup-grid-layout {
            flex-direction: column !important;
            align-items: center !important;
            gap: 32px !important;
          }
          .signup-left-col {
            max-width: 100% !important;
            width: 100% !important;
          }
          .signup-right-col {
            max-width: 100% !important;
            width: 100% !important;
            order: -1; /* Put telemetry badge on top for mobile viewports */
            padding-bottom: 24px;
            border-bottom: 1.5px dashed #cbd5e1;
            margin-bottom: 12px;
          }
          .signup-title {
            font-size: 1.6rem !important;
          }
          .signup-subtitle {
            font-size: 0.92rem !important;
          }
          .grid-2-mobile-stack {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
      
      {/* Title Banner (White Header Section) */}
      <div style={{
        padding: '32px 16px',
        textAlign: 'center',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#ffffff'
      }}>
        <h1 className="signup-title" style={{
          fontSize: '2.1rem',
          fontWeight: '700',
          color: '#00829a',
          margin: '0 0 8px 0',
          fontFamily: 'var(--font-heading)'
        }}>
          Create your account
        </h1>
        <p className="signup-subtitle" style={{
          fontSize: '1.05rem',
          fontStyle: 'italic',
          color: '#4a5568',
          margin: 0
        }}>
          Try it risk-FREE. No obligation; cancel anytime.
        </p>
      </div>

      {/* Main Content Area (Soft Grey Background) */}
      <div style={{
        flex: '1 0 auto',
        backgroundColor: '#f4f6f8',
        padding: '48px 16px 80px 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div className="signup-grid-layout" style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          gap: '64px',
          justifyContent: 'center'
        }}>
          
          {/* Left Column: Form Controls */}
          <div className="signup-left-col" style={{
            flex: '1 1 550px',
            maxWidth: '550px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            
            <form onSubmit={handleNext} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              
              {/* STEP 1: First Name, Last Name & Email */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="grid-2-mobile-stack" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>First Name</label>
                      <input 
                        type="text" 
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        style={{
                          padding: '12px 16px',
                          border: '1.5px solid #ccd6e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                          color: '#222222',
                          transition: 'border-color 0.2s'
                        }}
                        className="input-focus-effect"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        style={{
                          padding: '12px 16px',
                          border: '1.5px solid #ccd6e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                          color: '#222222',
                          transition: 'border-color 0.2s'
                        }}
                        className="input-focus-effect"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        transition: 'border-color 0.2s'
                      }}
                      className="input-focus-effect"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Exam / Course to Prepare For</label>
                    <select
                      value={formData.exam}
                      onChange={e => setFormData({ ...formData, exam: e.target.value })}
                      style={{
                        padding: '12px 16px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }}
                      className="input-focus-effect"
                    >
                      <option value="FTCE Professional Education Test">FTCE Professional Education Test</option>
                      <option value="AP Calculus BC">AP Calculus BC</option>
                      <option value="Cell Biology">Cell Biology</option>
                      <option value="Introduction to Psychology">Introduction to Psychology</option>
                      <option value="ATI TEAS Test Prep">ATI TEAS Test Prep</option>
                      <option value="RICA Test Prep">RICA Test Prep</option>
                      <option value="TExES Test Prep">TExES Test Prep</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: History / First-Time Diagnostic */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  
                  {/* First Time Check */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1f4e5a' }}>
                      Is this your first time taking the exam?
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }} className="grid-2-mobile-stack">
                      
                      {/* Yes radio box */}
                      <label style={{
                        flex: 1,
                        padding: '14px 20px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: formData.isFirstTime === 'yes' ? '#eef6f8' : '#ffffff',
                        borderColor: formData.isFirstTime === 'yes' ? '#00829a' : '#ccd6e0',
                        transition: 'all 0.15s'
                      }}>
                        <input 
                          type="radio" 
                          name="isFirstTime"
                          checked={formData.isFirstTime === 'yes'}
                          onChange={() => setFormData({ ...formData, isFirstTime: 'yes', attempts: '' })}
                          style={{ width: '16px', height: '16px', accentColor: '#00829a' }}
                        />
                        <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: '700' }}>Yes</span>
                      </label>

                      {/* No radio box */}
                      <label style={{
                        flex: 1,
                        padding: '14px 20px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: formData.isFirstTime === 'no' ? '#eef6f8' : '#ffffff',
                        borderColor: formData.isFirstTime === 'no' ? '#00829a' : '#ccd6e0',
                        transition: 'all 0.15s'
                      }}>
                        <input 
                          type="radio" 
                          name="isFirstTime"
                          checked={formData.isFirstTime === 'no'}
                          onChange={() => setFormData({ ...formData, isFirstTime: 'no' })}
                          style={{ width: '16px', height: '16px', accentColor: '#00829a' }}
                        />
                        <span style={{ fontSize: '0.95rem', color: '#2d3748', fontWeight: '700' }}>No</span>
                      </label>

                    </div>
                  </div>

                  {/* Secondary question: If "No" */}
                  {formData.isFirstTime === 'no' && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      backgroundColor: '#ffffff',
                      padding: '20px',
                      borderRadius: '6px',
                      border: '1.5px solid #ccd6e0',
                      animation: 'fade-in 0.2s'
                    }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#4a5568' }}>
                        How many times have you taken the exam before?
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {['1 time', '2 times', '3 or more times'].map((att, index) => {
                          const isSel = formData.attempts === att;
                          return (
                            <label 
                              key={index}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#2d3748',
                                padding: '6px 0'
                              }}
                            >
                              <input 
                                type="radio" 
                                name="examAttempts"
                                checked={formData.attempts === att}
                                onChange={() => setFormData({ ...formData, attempts: att })}
                                style={{ width: '16px', height: '16px', accentColor: '#00829a' }}
                              />
                              <span>{att}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* STEP 3: Country, City, State, ZIP Code selection */}
              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Country</label>
                    <select 
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      style={{
                        padding: '12px 16px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                      }}
                      className="input-focus-effect"
                    >
                      {countries.map((c, idx) => (
                        <option key={idx} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* City Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>City</label>
                    <input 
                      type="text" 
                      placeholder="City"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        transition: 'border-color 0.2s'
                      }}
                      className="input-focus-effect"
                    />
                  </div>

                  {/* State and ZIP Code Row */}
                  <div className="grid-2-mobile-stack" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>
                        {formData.country === 'United States' ? 'State' : 'State / Region'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={formData.country === 'United States' ? 'State' : 'State / Region'}
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        required
                        style={{
                          padding: '12px 16px',
                          border: '1.5px solid #ccd6e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                          color: '#222222',
                          transition: 'border-color 0.2s'
                        }}
                        className="input-focus-effect"
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>
                        {formData.country === 'United States' ? 'ZIP Code' : 'ZIP / Postal Code'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={formData.country === 'United States' ? 'ZIP Code' : 'ZIP / Postal Code'}
                        value={formData.zipCode}
                        onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                        style={{
                          padding: '12px 16px',
                          border: '1.5px solid #ccd6e0',
                          borderRadius: '4px',
                          fontSize: '0.95rem',
                          outline: 'none',
                          backgroundColor: '#ffffff',
                          color: '#222222',
                          transition: 'border-color 0.2s'
                        }}
                        className="input-focus-effect"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Survey Option */}
              {step === 4 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1f4e5a', lineHeight: '1.4' }}>
                    How did you hear about us? Please select all that apply.
                  </label>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '6px',
                    border: '1.5px solid #ccd6e0'
                  }}>
                    {surveyOptions.map((opt, idx) => {
                      const isChecked = formData.referral.includes(opt);
                      return (
                        <label 
                          key={idx} 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            color: '#4a5568'
                          }}
                        >
                          <input 
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(opt)}
                            style={{
                              width: '18px',
                              height: '18px',
                              accentColor: '#13809c',
                              cursor: 'pointer'
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Password setup (with Password Confirm) */}
              {step === 5 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Password field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Password</label>
                      <svg 
                        onClick={() => alert("Your password must be at least 8 characters long.")}
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
                      type="password" 
                      placeholder="Password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                      style={{
                        padding: '12px 16px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        transition: 'border-color 0.2s'
                      }}
                      className="input-focus-effect"
                    />
                    <span style={{ fontSize: '0.78rem', color: '#718096' }}>
                      Minimum length: 8 characters
                    </span>
                  </div>

                  {/* Password Confirm field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Password Confirm</label>
                    <input 
                      type="password" 
                      placeholder="Password"
                      value={formData.passwordConfirm}
                      onChange={e => setFormData({ ...formData, passwordConfirm: e.target.value })}
                      required
                      style={{
                        padding: '12px 16px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        transition: 'border-color 0.2s'
                      }}
                      className="input-focus-effect"
                    />
                  </div>

                </div>
              )}

              {/* Submit Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '8px'
              }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(to bottom, #00b8db, #00a2c2)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    padding: '12px 32px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0, 162, 194, 0.2)',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={e => e.target.style.opacity = '0.9'}
                  onMouseOut={e => e.target.style.opacity = '1'}
                >
                  Continue
                </button>
                {step === 4 && (
                  <span 
                    onClick={() => setStep(5)}
                    style={{
                      color: '#00829a',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Skip
                  </span>
                )}
              </div>

            </form>

            {/* Back link */}
            <div>
              <span
                onClick={handleStepBack}
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

          {/* Right Column: 92% pass badge */}
          <div className="signup-right-col" style={{
            flex: '0 0 320px',
            maxWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              width: '100%'
            }}>
              {/* Starburst/Circle Graphic */}
              <div style={{
                position: 'relative',
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {/* SVG outlines representing books/pencils sketch */}
                <svg style={{ position: 'absolute', width: '150%', height: '150%', zIndex: 0 }} viewBox="0 0 200 200">
                  {/* Pencil sketch */}
                  <path d="M 30,130 L 50,110 L 75,135 L 55,155 Z" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="3 3"/>
                  <path d="M 30,130 L 20,140 L 35,145 L 30,130" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6"/>
                  {/* Book outline */}
                  <path d="M 130,50 C 140,40 160,40 170,50 L 170,110 C 160,100 140,100 130,110 Z" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6"/>
                  <path d="M 130,110 C 120,100 100,100 90,110 L 90,50 C 100,40 120,40 130,50" stroke="#cbd5e1" strokeWidth="1.5" fill="none" opacity="0.6"/>
                </svg>

                {/* Main Circle */}
                <div style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '50%',
                  backgroundColor: '#00829a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.9rem',
                  fontWeight: '800',
                  color: '#ffffff',
                  boxShadow: '0 4px 10px rgba(0,130,154,0.3)',
                  zIndex: 1
                }}>
                  92%
                </div>
              </div>

              {/* Text Descriptor */}
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.5',
                color: '#4a5568',
                margin: 0,
                zIndex: 1
              }}>
                of students <strong style={{ color: '#e15b3e', fontWeight: '800' }}>passed their exam</strong> after using PrepSumit.com*
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Lock Security Area */}
      <div style={{
        padding: '24px 16px',
        backgroundColor: '#f4f6f8',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        color: '#718096'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f1a80a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span style={{ fontWeight: '700', color: '#4a5568' }}>Secure Server</span>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <a href="#" onClick={(e) => { e.preventDefault(); alert("We protect your details with standard 256-Bit SSL encryption."); }} style={{ color: '#00829a', textDecoration: 'underline' }}>tell me more</a>
      </div>

    </div>
  );
}
