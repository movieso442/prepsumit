import { useState, useEffect } from 'react';

export default function Checkout({ signupData, onCheckoutComplete, selectedCourse, onBack, setActivePage }) {
  const plansInfo = {
    accelerator: { name: "College Accelerator", price: "$235.00/mo", desc: "Earn real college credit accepted by 1,500+ colleges" },
    testprep: { name: "Test Prep Plan", price: "$59.99/mo", desc: signupData?.selectedTest ? `Full test coverage for ${signupData.selectedTest}` : "Full test coverage & 88,000+ video lessons" },
    premium: { name: "Premium Edition Plan", price: "$59.99/mo", desc: "Videos, study tools, and 24/7 expert homework help" },
    teacher: { name: "Classroom Teacher Edition", price: "$29.99/mo", desc: "Lesson plans, classroom tools, and automatic grading" },
    monthly: { name: "Monthly access", price: "$59.99/mo", desc: "Just $2.00/day (+ tax if applicable)" },
    twoweek: { name: "Two week access", price: "$39.99", desc: "One-time payment, no recurring charge" }
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [selectedPlan, setSelectedPlan] = useState(() => {
    if (signupData?.planName) {
      const name = signupData.planName.toLowerCase();
      if (name.includes('accelerator')) return 'accelerator';
      if (name.includes('test prep')) return 'testprep';
      if (name.includes('premium')) return 'premium';
      if (name.includes('teacher')) return 'teacher';
    }
    
    // Auto-map selected onboarding role to the appropriate plan
    if (signupData?.role) {
      const role = signupData.role.toLowerCase();
      if (role === 'student') return 'premium'; // Premium Edition for students
      if (role === 'teacher') return 'teacher'; // Classroom Teacher Edition for teachers
      if (role === 'parent') return 'premium';
    }
    
    return 'monthly';
  });

  useEffect(() => {
    if (signupData?.planName) {
      const name = signupData.planName.toLowerCase();
      if (name.includes('accelerator')) setSelectedPlan('accelerator');
      else if (name.includes('test prep') || name.includes('testprep')) setSelectedPlan('testprep');
      else if (name.includes('premium')) setSelectedPlan('premium');
      else if (name.includes('teacher')) setSelectedPlan('teacher');
      else if (name.includes('monthly')) setSelectedPlan('monthly');
      else if (name.includes('twoweek') || name.includes('two week')) setSelectedPlan('twoweek');
    }
  }, [signupData?.planName]);

  const countryCodes = [
    { country: 'United States', code: '+1' },
    { country: 'Canada', code: '+1' },
    { country: 'Cameroon', code: '+237' },
    { country: 'Nigeria', code: '+234' },
    { country: 'United Kingdom', code: '+44' },
    { country: 'Australia', code: '+61' },
    { country: 'South Africa', code: '+27' },
    { country: 'Kenya', code: '+254' },
    { country: 'Ghana', code: '+233' },
    { country: 'India', code: '+91' },
    { country: 'Germany', code: '+49' },
    { country: 'France', code: '+33' }
  ];

  const [phoneCountryCode, setPhoneCountryCode] = useState(() => {
    const signupCountry = signupData?.country || 'United States';
    const match = countryCodes.find(c => c.country.toLowerCase() === signupCountry.toLowerCase());
    return match ? match.code : '+1';
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [prevCountry, setPrevCountry] = useState(signupData?.country || 'United States');

  useEffect(() => {
    const signupCountry = signupData?.country || 'United States';
    if (signupCountry !== prevCountry) {
      const match = countryCodes.find(c => c.country.toLowerCase() === signupCountry.toLowerCase());
      if (match) {
        setPhoneCountryCode(match.code);
      }
      setPrevCountry(signupCountry);
    }
  }, [signupData?.country, prevCountry]);

  const handlePhoneNumberChange = (value) => {
    // Restrict input characters: remove any alphabetic letters
    const sanitized = value.replace(/[a-zA-Z]/g, '');
    setPhoneNumber(sanitized);
  };

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' vs 'paypal'
  const [couponCode, setCouponCode] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiryMonth: 'Month',
    expiryYear: 'Year',
    cvc: ''
  });

  const getRenewalDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const handleJoin = async (e) => {
    if (e) e.preventDefault();
    if (loading) return;

    const digitOnlyPhone = phoneNumber.replace(/\D/g, '');
    if (!phoneNumber || phoneNumber.trim() === '' || digitOnlyPhone.length < 5) {
      alert("Please enter a valid Phone Number containing at least 5 digits.");
      return;
    }

    if (/[a-zA-Z]/.test(phoneNumber)) {
      alert("Phone number cannot contain letters.");
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const activePlanInfo = plansInfo[selectedPlan] || plansInfo['monthly'];
      const planText = `${activePlanInfo.price} ${activePlanInfo.name}`;

      // Construct survey answers matching the API spec
      const answers = [];
      if (signupData?.role) {
        answers.push({
          question: "Onboarding Role",
          answer: signupData.role
        });
      }
      if (signupData?.goal) {
        answers.push({
          question: "Main Goal",
          answer: signupData.goal
        });
      }
      if (signupData?.exam || signupData?.examName) {
        answers.push({
          question: "Exam preparing for",
          answer: signupData.exam || signupData.examName
        });
      }
      if (signupData?.isFirstTime) {
        answers.push({
          question: "Is this your first time taking the exam?",
          answer: signupData.isFirstTime
        });
      }
      if (signupData?.attempts) {
        answers.push({
          question: "How many times have you taken the exam before?",
          answer: signupData.attempts
        });
      }
      if (signupData?.country) {
        answers.push({
          question: "Country",
          answer: signupData.country
        });
      }
      if (signupData?.city) {
        answers.push({
          question: "City",
          answer: signupData.city
        });
      }
      if (signupData?.state) {
        answers.push({
          question: "State / Region",
          answer: signupData.state
        });
      }
      if (signupData?.zipCode) {
        answers.push({
          question: "ZIP / Postal Code",
          answer: signupData.zipCode
        });
      }
      if (signupData?.referral && signupData.referral.length > 0) {
        answers.push({
          question: "How did you hear about us?",
          answer: signupData.referral.join(', ')
        });
      }

      // API request payload
      const payload = {
        fullName: signupData ? `${signupData.firstName} ${signupData.lastName}` : "PrepSumit User",
        email: signupData?.email || "support@prepsumit.com",
        phone: `${phoneCountryCode} ${phoneNumber}`.trim(),
        countryCode: phoneCountryCode,
        phoneCountryCode,
        phoneNumber,
        fullPhoneNumber: `${phoneCountryCode}${digitOnlyPhone}`,
        selectedPlan: activePlanInfo.name,
        billingCycle: selectedPlan === 'twoweek' ? 'Two Weeks' : 'Monthly',
        accountType: signupData?.role || 'Student',
        country: signupData?.country || 'United States',
        city: signupData?.city || '',
        state: signupData?.state || '',
        zipCode: signupData?.zipCode || '',
        answers,
        additionalInfo: `Exam Selected: ${signupData?.exam || signupData?.examName || 'None'}`
      };

      const response = await fetch('/api/account-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
      } else {
        setErrorMsg(result.error || "An error occurred while submitting your registration request.");
      }
    } catch (err) {
      console.error("Checkout submit error:", err);
      setErrorMsg("Failed to connect to the registration server. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const years = Array.from({ length: 11 }, (_, i) => String(2026 + i));

  // Determine course name to display
  const courseTitle = selectedCourse?.title || "FTCE Test Prep";

  return (
    <div style={{
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)',
      padding: '40px 16px 80px 16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      
      {/* Inline styles for custom mobile compliance */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-grid-layout {
            flex-direction: column !important;
            align-items: center !important;
            gap: 32px !important;
          }
          .checkout-left-col {
            max-width: 100% !important;
            width: 100% !important;
          }
          .checkout-right-col {
            max-width: 100% !important;
            width: 100% !important;
            order: -1; /* Display plan summary card on top of forms on mobile */
            padding-bottom: 24px;
            border-bottom: 1.5px dashed #cbd5e1;
            margin-bottom: 12px;
          }
          .grid-2-mobile-stack {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .payment-toggle-container {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .zip-input-mobile-full {
            width: 100% !important;
          }
        }
      `}</style>

      <div className="checkout-grid-layout" style={{
        maxWidth: '1080px',
        width: '100%',
        display: 'flex',
        gap: '40px',
        justifyContent: 'center'
      }}>
        
        {/* Left Column: Payment Details */}
        <div className="checkout-left-col" style={{
          flex: '1 1 600px',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          
          {success ? (
            <div className="card" style={{
              padding: '40px 24px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#1f4e5a', fontWeight: '800', margin: 0 }}>
                Request Received!
              </h3>
              <div style={{
                fontSize: '1.02rem',
                lineHeight: '1.6',
                color: '#4a5568',
                margin: 0,
                maxWidth: '520px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <p style={{ margin: 0, textAlign: 'center', fontWeight: '600', color: '#1f4e5a' }}>
                  Thank you! Your account activation request has been received. We will get back to you as soon as possible.
                </p>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  fontSize: '0.92rem'
                }}>
                  <div>
                    <strong style={{ color: '#1f4e5a' }}>Account Activation & Payments:</strong><br />
                    Contact <a href="mailto:billing@prepsumit.com" style={{ color: '#00829a', fontWeight: '700', textDecoration: 'none' }}>billing@prepsumit.com</a> for final payment details and account validation after your payment is successfully completed.
                  </div>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    <strong style={{ color: '#1f4e5a' }}>General Help & Student Support:</strong><br />
                    Contact <a href="mailto:support@prepsumit.com" style={{ color: '#00829a', fontWeight: '700', textDecoration: 'none' }}>support@prepsumit.com</a> if you need study materials, guide access, or general support.
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#718096', textAlign: 'center' }}>
                  Please also check your inbox for a registration confirmation email.
                </p>
              </div>
              <button
                onClick={() => setActivePage('home')}
                style={{
                  backgroundColor: '#00829a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '700',
                  fontSize: '1rem',
                  padding: '12px 32px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.target.style.backgroundColor = '#13809c'}
                onMouseOut={e => e.target.style.backgroundColor = '#00829a'}
              >
                Return to Home
              </button>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#fef2f2',
                  borderLeft: '4px solid #ef4444',
                  borderRadius: '4px',
                  color: '#991b1b',
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  lineHeight: '1.5',
                  marginBottom: '16px'
                }}>
                  {errorMsg}
                </div>
              )}

              <div>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#333333',
                  margin: '0 0 10px 0',
                  lineHeight: '1.25'
                }}>
                  Last step! Confirm details & request account activation.
                </h2>
                <p style={{
                  fontSize: '0.98rem',
                  color: '#4a5568',
                  lineHeight: '1.45',
                  margin: 0
                }}>
                  Review your profile and add your contact phone number below. We do not collect credit card or bank details on our site.
                </p>
              </div>

              {/* Profile Overview */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #ccd6e0',
                borderRadius: '6px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', fontSize: '0.92rem' }}>
                  <span style={{ fontWeight: '700', color: '#1f4e5a' }}>Full Name:</span>
                  <span style={{ color: '#2d3748' }}>{signupData ? `${signupData.firstName} ${signupData.lastName}` : "PrepSumit Scholar"}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', fontSize: '0.92rem' }}>
                  <span style={{ fontWeight: '700', color: '#1f4e5a' }}>Email Address:</span>
                  <span style={{ color: '#2d3748' }}>{signupData?.email || "Not specified"}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', fontSize: '0.92rem' }}>
                  <span style={{ fontWeight: '700', color: '#1f4e5a' }}>Selected Plan:</span>
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>{plansInfo[selectedPlan]?.name || "Monthly access"} ({plansInfo[selectedPlan]?.price || "$59.99/mo"})</span>
                </div>
              </div>

              {/* Form Input for Phone */}
              <form onSubmit={handleJoin} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f4e5a' }}>Phone Number</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={phoneCountryCode}
                      onChange={e => setPhoneCountryCode(e.target.value)}
                      style={{
                        padding: '12px 8px',
                        border: '1.5px solid #ccd6e0',
                        borderRadius: '4px',
                        fontSize: '0.95rem',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        color: '#222222',
                        cursor: 'pointer',
                        width: '100px'
                      }}
                    >
                      {countryCodes.map((c, idx) => (
                        <option key={idx} value={c.code}>
                          {c.code} ({c.country})
                        </option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      placeholder="(555) 000-0000"
                      value={phoneNumber}
                      onChange={e => handlePhoneNumberChange(e.target.value)}
                      required
                      style={{
                        flex: 1,
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
                  <span style={{ fontSize: '0.78rem', color: '#718096' }}>
                    Used solely for account verification and billing validation.
                  </span>
                </div>

                {/* Info Verification Notice Card */}
                <div style={{
                  padding: '20px',
                  backgroundColor: '#edf7fa',
                  borderLeft: '4px solid #00829a',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <strong style={{ color: '#1f4e5a', fontSize: '0.95rem' }}>Official Customer Verification & Activation:</strong>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: '#2d3748', fontSize: '0.88rem', lineHeight: '1.5', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>
                      <strong>Billing Team (<a href="mailto:billing@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none', fontWeight: '700' }}>billing@prepsumit.com</a>)</strong>: Will contact you shortly with final payment details and activate/validate your account upon successful payment receipt.
                    </li>
                    <li>
                      <strong>Student Support (<a href="mailto:support@prepsumit.com" style={{ color: '#00829a', textDecoration: 'none', fontWeight: '700' }}>support@prepsumit.com</a>)</strong>: Available for study guidelines, lesson access, and general help.
                    </li>
                  </ul>
                </div>

                <p style={{
                  fontSize: '0.82rem',
                  color: '#718096',
                  lineHeight: '1.5',
                  margin: '4px 0 0 0'
                }}>
                  By creating an account, you agree to PrepSumit.com's{' '}
                  <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" style={{ color: '#00829a', textDecoration: 'underline' }}>
                    Terms of Use
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#00829a', textDecoration: 'underline' }}>
                    Privacy Policy
                  </a>.
                </p>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: 'linear-gradient(to bottom, #22c55e, #16a34a)',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontWeight: '700',
                      fontSize: '1.15rem',
                      padding: '12px 48px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 2px 5px rgba(22, 163, 74, 0.2)',
                      transition: 'opacity 0.2s',
                      opacity: loading ? 0.7 : 1
                    }}
                    onMouseOver={e => { if (!loading) e.target.style.opacity = '0.9'; }}
                    onMouseOut={e => { if (!loading) e.target.style.opacity = '1'; }}
                  >
                    {loading ? "Submitting..." : "Submit Activation Request"}
                  </button>
                </div>
              </form>

              {/* Back link */}
              <div>
                <span
                  onClick={onBack}
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
            </>
          )}

        </div>

        {/* Right Column: Selected Plan Card & 92% pass badge */}
        <div className="checkout-right-col" style={{
          flex: '0 0 350px',
          maxWidth: '350px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          
          {/* Plan selection card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            
            <div>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#718096',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Your Selected Plan
              </span>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: '700',
                color: '#1f4e5a',
                margin: '4px 0 0 0'
              }}>
                {courseTitle}
              </h3>
            </div>

            {/* Money back guarantee */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#16a34a',
              fontSize: '0.88rem',
              fontWeight: '700'
            }}>
              <span>30-day money back guarantee</span>
              <svg 
                onClick={() => alert("Try our service for 30 days risk-free. If it isn't for you, get a full refund. No hassles.")}
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#16a34a" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ cursor: 'pointer', opacity: 0.9 }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            {/* Radio inputs for pricing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Render chosen plan if it is a custom plan */}
              {['accelerator', 'testprep', 'premium', 'teacher'].includes(selectedPlan) ? (
                <>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '12px',
                    border: '1.5px solid #00829a',
                    borderRadius: '4px',
                    backgroundColor: '#eef6f8',
                    transition: 'all 0.15s'
                  }}>
                    <input 
                      type="radio"
                      name="studyPlan"
                      checked={true}
                      readOnly
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#00829a',
                        marginTop: '3px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2d3748' }}>{plansInfo[selectedPlan].name}</span>
                        <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2d3748' }}>{plansInfo[selectedPlan].price}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#718096', fontStyle: 'italic', marginTop: '2px' }}>
                        {plansInfo[selectedPlan].desc}
                      </div>
                    </div>
                  </label>

                  <div style={{ textAlign: 'right', marginTop: '2px' }}>
                    <a 
                      href="/academy/plans.html" 
                      onClick={(e) => { e.preventDefault(); setActivePage('plans'); }}
                      style={{ fontSize: '0.82rem', color: '#00829a', fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Change plan
                    </a>
                  </div>
                </>
              ) : (
                <>
                  {/* Option 1: Monthly */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '12px',
                    border: '1.5px solid #ccd6e0',
                    borderRadius: '4px',
                    backgroundColor: selectedPlan === 'monthly' ? '#eef6f8' : 'transparent',
                    borderColor: selectedPlan === 'monthly' ? '#00829a' : '#ccd6e0',
                    transition: 'all 0.15s'
                  }}>
                    <input 
                      type="radio"
                      name="studyPlan"
                      checked={selectedPlan === 'monthly'}
                      onChange={() => setSelectedPlan('monthly')}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#00829a',
                        marginTop: '3px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2d3748' }}>Monthly access</span>
                        <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2d3748' }}>$59.99<span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#718096' }}>/mo</span></span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#718096', fontStyle: 'italic', marginTop: '2px' }}>
                        Just $2.00/day (+ tax if applicable)
                      </div>
                    </div>
                  </label>

                  {/* Option 2: 2-Week access */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    padding: '12px',
                    border: '1.5px solid #ccd6e0',
                    borderRadius: '4px',
                    backgroundColor: selectedPlan === 'twoweek' ? '#eef6f8' : 'transparent',
                    borderColor: selectedPlan === 'twoweek' ? '#00829a' : '#ccd6e0',
                    transition: 'all 0.15s'
                  }}>
                    <input 
                      type="radio"
                      name="studyPlan"
                      checked={selectedPlan === 'twoweek'}
                      onChange={() => setSelectedPlan('twoweek')}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#00829a',
                        marginTop: '3px',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2d3748' }}>Two week access</span>
                        <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#2d3748' }}>$39.99</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#718096', marginTop: '2px' }}>
                        Renews on {getRenewalDateStr()} for $59.99/mo
                      </div>
                    </div>
                  </label>
                </>
              )}

            </div>

          </div>

          {/* 92% passed telemetry badge */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            border: '1.5px solid #e2e8f0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#00829a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem',
              fontWeight: '800',
              color: '#ffffff',
              flexShrink: 0
            }}>
              92%
            </div>
            <div>
              <p style={{
                fontSize: '0.88rem',
                lineHeight: '1.4',
                color: '#4a5568',
                margin: 0
              }}>
                of students <strong style={{ color: '#e15b3e', fontWeight: '700' }}>passed their exam</strong> after using PrepSumit.com*
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
