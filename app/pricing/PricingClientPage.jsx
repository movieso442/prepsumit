"use client";

import Plans from '@/src/views/Plans';
import { useAppContext } from '../providers';

export default function PricingClientPage() {
  const { 
    signupData,
    setSignupData,
    setShowEmailPopup, 
    setSignupDetails, 
    setActivePage 
  } = useAppContext();

  return (
    <Plans 
      onStartSignup={(details) => {
        if (details) {
          if (signupData) {
            setSignupData(prev => ({
              ...prev,
              planName: details.planName,
              price: details.price,
              selectedTest: details.selectedTest || prev.selectedTest
            }));
            setActivePage('checkout');
          } else {
            setSignupDetails(details);
            setActivePage('signup');
          }
        } else {
          setShowEmailPopup(true);
        }
      }}
      setActivePage={setActivePage}
    />
  );
}
