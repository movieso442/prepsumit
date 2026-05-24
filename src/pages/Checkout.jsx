import { useState } from 'react';
import { Lock, ShieldCheck, CreditCard } from 'lucide-react';

export default function Checkout({ signupData, onCheckoutComplete }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' ($59.99) vs 'twoweek' ($39.99)
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' vs 'paypal'
  const [cardDetails, setCardDetails] = useState({
    cardholder: signupData ? `${signupData.firstName} ${signupData.lastName}` : '',
    number: '',
    expiry: '',
    cvv: '',
    zip: ''
  });

  const handleJoin = (e) => {
    e.preventDefault();
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.zip)) {
      alert("Please fill out all credit card billing details.");
      return;
    }
    // Simulate successful checkout
    onCheckoutComplete(selectedPlan === 'monthly' ? '$59.99/mo Monthly Plan' : '$39.99 Two-Week Pass');
  };

  return (
    <div className="fade-in checkout-layout-grid" style={{ 
      maxWidth: '1080px', 
      margin: '40px auto', 
      padding: '0 16px'
    }}>
      
      {/* Left Column: Payment Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', color: '#1f4e5a', fontWeight: '800', marginBottom: '8px' }}>
            Complete your registration
          </h2>
          <p style={{ color: '#4a5568', fontSize: '0.92rem' }}>
            You're steps away from unlocking 1,500+ study guides and practice exams.
          </p>
        </div>

        {/* Payment Tabs */}
        <div style={{ display: 'flex', border: '1px solid #d2dbe5', borderRadius: '4px', overflow: 'hidden' }}>
          <button 
            onClick={() => setPaymentMethod('card')}
            style={{
              flex: 1,
              padding: '14px',
              border: 'none',
              backgroundColor: paymentMethod === 'card' ? '#ffffff' : '#f2f6f9',
              color: paymentMethod === 'card' ? '#13809c' : '#4a5568',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderBottom: paymentMethod === 'card' ? '3px solid #13809c' : 'none'
            }}
          >
            <CreditCard size={18} /> Credit or Debit Card
          </button>
          <button 
            onClick={() => setPaymentMethod('paypal')}
            style={{
              flex: 1,
              padding: '14px',
              border: 'none',
              backgroundColor: paymentMethod === 'paypal' ? '#ffffff' : '#f2f6f9',
              color: paymentMethod === 'paypal' ? '#13809c' : '#4a5568',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderBottom: paymentMethod === 'paypal' ? '3px solid #13809c' : 'none'
            }}
          >
            {/* PayPal Text Logo styling */}
            <span style={{ fontStyle: 'italic', fontWeight: '900', color: '#003087' }}>Pay<span style={{ color: '#0079C1' }}>Pal</span></span>
          </button>
        </div>

        {paymentMethod === 'card' ? (
          <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Cardholder Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1f4e5a' }}>CARDHOLDER NAME</label>
              <input 
                type="text" 
                value={cardDetails.cardholder}
                onChange={e => setCardDetails({ ...cardDetails, cardholder: e.target.value })}
                required
                style={{
                  padding: '12px 16px',
                  border: '1.5px solid #d2dbe5',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  color: '#222222'
                }}
              />
            </div>

            {/* Card Number */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1f4e5a' }}>CARD NUMBER</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {/* Small card provider icons */}
                  <span style={{ fontSize: '10px', padding: '2px 4px', border: '1px solid #d2dbe5', borderRadius: '3px', fontWeight: '800', color: '#1A1F71' }}>VISA</span>
                  <span style={{ fontSize: '10px', padding: '2px 4px', border: '1px solid #d2dbe5', borderRadius: '3px', fontWeight: '800', color: '#EB001B' }}>MC</span>
                  <span style={{ fontSize: '10px', padding: '2px 4px', border: '1px solid #d2dbe5', borderRadius: '3px', fontWeight: '800', color: '#0173B2' }}>AMEX</span>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="4111 2222 3333 4444" 
                value={cardDetails.number}
                onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                maxLength="19"
                required
                style={{
                  padding: '12px 16px',
                  border: '1.5px solid #d2dbe5',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  color: '#222222'
                }}
              />
            </div>

            {/* Expiry and CVV */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1f4e5a' }}>EXPIRATION DATE</label>
                <input 
                  type="text" 
                  placeholder="MM / YY" 
                  value={cardDetails.expiry}
                  onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  maxLength="5"
                  required
                  style={{
                    padding: '12px 16px',
                    border: '1.5px solid #d2dbe5',
                    borderRadius: '4px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    color: '#222222'
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1f4e5a' }}>SECURITY CODE (CVV)</label>
                <input 
                  type="password" 
                  placeholder="123" 
                  value={cardDetails.cvv}
                  onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  maxLength="4"
                  required
                  style={{
                    padding: '12px 16px',
                    border: '1.5px solid #d2dbe5',
                    borderRadius: '4px',
                    fontSize: '0.95rem',
                    outline: 'none',
                    color: '#222222'
                  }}
                />
              </div>
            </div>

            {/* ZIP Code */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1f4e5a' }}>ZIP / POSTAL CODE</label>
              <input 
                type="text" 
                placeholder="e.g. 90210" 
                value={cardDetails.zip}
                onChange={e => setCardDetails({ ...cardDetails, zip: e.target.value })}
                required
                style={{
                  padding: '12px 16px',
                  border: '1.5px solid #d2dbe5',
                  borderRadius: '4px',
                  fontSize: '0.95rem',
                  outline: 'none',
                  color: '#222222',
                  width: '180px'
                }}
              />
            </div>

            {/* Green Lock Join Now Button */}
            <button 
              type="submit"
              style={{
                backgroundColor: '#16a34a',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '1.1rem',
                padding: '16px 20px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(22,163,74,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '12px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#15803d'}
              onMouseOut={e => e.target.style.backgroundColor = '#16a34a'}
            >
              <Lock size={18} /> Join Now
            </button>
          </form>
        ) : (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            border: '1.5px dashed #d2dbe5',
            borderRadius: '4px',
            backgroundColor: '#f9fbfd'
          }}>
            <p style={{ color: '#4a5568', marginBottom: '16px' }}>
              Click below to complete authorization securely using PayPal.
            </p>
            <button 
              onClick={handleJoin}
              style={{
                backgroundColor: '#ffc439',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 32px',
                cursor: 'pointer',
                fontStyle: 'italic',
                fontWeight: '900',
                fontSize: '1.1rem',
                color: '#003087',
                boxShadow: '0 3px 6px rgba(0,0,0,0.06)'
              }}
            >
              Pay<span style={{ color: '#0079C1' }}>Pal</span> Checkout
            </button>
          </div>
        )}

        {/* Safe Banner */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '12px', 
          padding: '16px', 
          backgroundColor: '#f2f6f9', 
          borderRadius: '4px',
          borderLeft: '4px solid #13809c',
          fontSize: '0.85rem',
          lineHeight: '1.5'
        }}>
          <ShieldCheck size={24} style={{ color: '#13809c', flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#1f4e5a' }}>30-Day Money-Back Guarantee</strong>
            <p style={{ color: '#4a5568', marginTop: '2px' }}>
              If you aren't completely satisfied with your test prep progress, simply request a refund within 30 days of joining. No questions asked.
            </p>
          </div>
        </div>

      </div>

      {/* Right Column: Plan Summary and telemetry */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Plan Details Card */}
        <div className="card" style={{ padding: '28px', borderTop: '6px solid #13809c' }}>
          <h3 style={{ color: '#1f4e5a', fontSize: '1.25rem', marginBottom: '16px', fontWeight: '800' }}>
            Choose your study plan
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Plan Option 1: Monthly */}
            <label 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                border: selectedPlan === 'monthly' ? '2px solid #13809c' : '1px solid #d2dbe5',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedPlan === 'monthly' ? '#f2f6f9' : '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              <input 
                type="radio" 
                name="plan" 
                checked={selectedPlan === 'monthly'}
                onChange={() => setSelectedPlan('monthly')}
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#13809c' }}
              />
              <div>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <strong style={{ color: '#1f4e5a' }}>FTCE Test Prep Monthly Pass</strong>
                  <span style={{ color: '#13809c', fontWeight: '800' }}>$59.99/mo</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#718096', marginTop: '4px', lineHeight: '1.4' }}>
                  Complete recurring access to all lessons, guides, video tutorials, and test tools. Cancel online anytime.
                </p>
              </div>
            </label>

            {/* Plan Option 2: 2-Week Study Pass */}
            <label 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px',
                border: selectedPlan === 'twoweek' ? '2px solid #13809c' : '1px solid #d2dbe5',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedPlan === 'twoweek' ? '#f2f6f9' : '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              <input 
                type="radio" 
                name="plan" 
                checked={selectedPlan === 'twoweek'}
                onChange={() => setSelectedPlan('twoweek')}
                style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: '#13809c' }}
              />
              <div>
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <strong style={{ color: '#1f4e5a' }}>2-Week Intensive pass</strong>
                  <span style={{ color: '#13809c', fontWeight: '800' }}>$39.99</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#718096', marginTop: '4px', lineHeight: '1.4' }}>
                  Two weeks of full, unlimited access. Non-recurring; does not renew automatically.
                </p>
              </div>
            </label>

          </div>

          {/* Pricing Total */}
          <div style={{ 
            marginTop: '24px', 
            paddingTop: '16px', 
            borderTop: '1px solid #d2dbe5',
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#1f4e5a'
          }}>
            <span style={{ fontWeight: '700' }}>Total Due Today:</span>
            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#13809c' }}>
              {selectedPlan === 'monthly' ? '$59.99' : '$39.99'}
            </span>
          </div>

        </div>

        {/* Circular Telemetry Card */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#f2f6f9', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '4px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '1.15rem',
            color: '#1f4e5a',
            flexShrink: 0
          }}>
            92%
          </div>
          <div>
            <strong style={{ color: '#1f4e5a', display: 'block', fontSize: '0.95rem' }}>Pass your test the first time</strong>
            <p style={{ fontSize: '0.82rem', color: '#4a5568', marginTop: '2px', lineHeight: '1.4' }}>
              Over 92% of PrepSummit.com students pass their FTCE Florida teacher certification exams on their very first attempt!
            </p>
          </div>
        </div>

        {/* Testimonials snippet */}
        <div className="card" style={{ padding: '24px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '0.88rem', color: '#4a5568', lineHeight: '1.5' }}>
            "The practice tests were exactly aligned with what was on my FTCE Professional Education Test. I was so anxious, but the lessons broke concepts down beautifully. I passed on my first try!"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffb627' }} />
            <strong style={{ fontSize: '0.82rem', color: '#1f4e5a' }}>Sarah M. — Florida Certified Teacher</strong>
          </div>
        </div>

      </div>

    </div>
  );
}
