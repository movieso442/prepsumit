"use client";

import Signup from '@/src/views/Signup';
import { useAppContext } from '../providers';

export default function SignupPage() {
  const { 
    signupDetails, 
    handleSignupComplete, 
    setActivePage 
  } = useAppContext();

  return (
    <Signup 
      initialData={signupDetails}
      onComplete={handleSignupComplete}
      onBack={() => setActivePage('home')}
    />
  );
}
