import { useState } from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Signup({ onComplete, onBackToHome }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'United States',
    referral: []
  });

  const countries = [
    'United States',
    'Cameroon',
    'Nigeria',
    'Canada',
    'United Kingdom',
    'South Africa',
    'Kenya',
    'Ghana'
  ];

  const referralOptions = [
    'Search Engine (Google, Bing, etc.)',
    'Social Media (Facebook, TikTok, Instagram)',
    'Friend or Colleague recommendation',
    'Teacher or Professor recommendation',
    'TV Advertisement',
    'Online Banner / Blog post',
    'Other'
  ];

  const handleNext = () => {
    if (step === 1 && (!formData.firstName.trim() || !formData.lastName.trim())) {
      alert("Please enter both your First Name and Last Name.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToHome();
    }
  };

  const handleCheckboxChange = (opt) => {
    setFormData(prev => {
      const active = prev.referral.includes(opt) 
        ? prev.referral.filter(item => item !== opt)
        : [...prev.referral, opt];
      return { ...prev, referral: active };
    });
  };

  return (
    <div className="fade-in" style={{
      maxWidth: '520px',
      margin: '60px auto',
      padding: '40px 32px',
      backgroundColor: '#ffffff',
      border: '1px solid #d2dbe5',
      borderRadius: '8px',
      boxShadow: '0 8px 30px rgba(31,78,90,0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      
      {/* Step Indicator Header */}
      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={handleBack} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: '#13809c', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '0.88rem',
            fontWeight: '600'
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Step {step} of 3
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', backgroundColor: '#eef2f6', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${(step / 3) * 100}%`, 
          height: '100%', 
          backgroundColor: '#ffb627', 
          transition: 'width 0.3s ease-out' 
        }} />
      </div>

      {/* STEP 1: First and Last Name */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '2.1rem', color: '#1f4e5a', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px' }}>
              Try it risk-FREE.
            </h2>
            <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>
              No obligation; cancel online easily anytime. Let's start with your name.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1f4e5a' }}>FIRST NAME</label>
              <input 
                type="text" 
                placeholder="e.g. John" 
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                style={{
                  padding: '12px 16px',
                  border: '1.5px solid #d2dbe5',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#222222',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#13809c'}
                onBlur={e => e.target.style.borderColor = '#d2dbe5'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1f4e5a' }}>LAST NAME</label>
              <input 
                type="text" 
                placeholder="e.g. Doe" 
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                style={{
                  padding: '12px 16px',
                  border: '1.5px solid #d2dbe5',
                  borderRadius: '4px',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#222222',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#13809c'}
                onBlur={e => e.target.style.borderColor = '#d2dbe5'}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Country Selection */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '2.1rem', color: '#1f4e5a', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px' }}>
              Confirm your country
            </h2>
            <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>
              Where are you currently preparing or studying from?
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1f4e5a' }}>COUNTRY</label>
            <select 
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              style={{
                padding: '12px 16px',
                border: '1.5px solid #d2dbe5',
                borderRadius: '4px',
                outline: 'none',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                color: '#222222',
                cursor: 'pointer'
              }}
            >
              {countries.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* STEP 3: Survey Checklist */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '2.1rem', color: '#1f4e5a', fontWeight: '800', lineHeight: '1.2', marginBottom: '8px' }}>
              How did you hear about us?
            </h2>
            <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>
              Select all that apply to help us tailor your experience.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {referralOptions.map((opt, idx) => (
              <label 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px', 
                  border: '1px solid #d2dbe5', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.92rem',
                  color: '#4a5568',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#f2f6f9'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <input 
                  type="checkbox" 
                  checked={formData.referral.includes(opt)}
                  onChange={() => handleCheckboxChange(opt)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#13809c' }}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Submit / Next Button */}
      <button 
        onClick={handleNext}
        style={{
          backgroundColor: '#ffb627',
          border: 'none',
          borderRadius: '4px',
          color: '#222222',
          fontWeight: '800',
          fontSize: '1rem',
          padding: '14px 20px',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(255,182,39,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '12px',
          transition: 'all 0.2s'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#fba919'}
        onMouseOut={e => e.target.style.backgroundColor = '#ffb627'}
      >
        {step === 3 ? "Proceed to Checkout" : "Continue"} <ArrowRight size={18} />
      </button>

      {/* Trust & Shield Badge */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '8px', 
        color: '#13809c', 
        fontSize: '0.85rem', 
        fontWeight: '600',
        marginTop: '8px'
      }}>
        <ShieldCheck size={18} /> Safe & Secure 256-Bit SSL Encryption
      </div>

    </div>
  );
}
