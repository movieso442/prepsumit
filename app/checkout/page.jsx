"use client";

import Checkout from '@/src/views/Checkout';
import { useAppContext } from '../providers';

export default function CheckoutPage() {
  const { 
    signupData, 
    handleCheckoutComplete, 
    selectedCourse, 
    setActivePage 
  } = useAppContext();

  return (
    <Checkout 
      signupData={signupData}
      onCheckoutComplete={handleCheckoutComplete}
      selectedCourse={selectedCourse}
      onBack={() => setActivePage('signup')}
      setActivePage={setActivePage}
    />
  );
}
