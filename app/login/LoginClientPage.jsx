"use client";

import Login from '@/src/views/Login';
import { useAppContext } from '../providers';

export default function LoginClientPage() {
  const { 
    setActivePage, 
    setShowEmailPopup, 
    handleSelectCategoryLanding, 
    handleOpenInfo 
  } = useAppContext();

  return (
    <Login 
      setActivePage={setActivePage}
      onStartSignup={() => setShowEmailPopup(true)}
      onSelectCategoryLanding={handleSelectCategoryLanding}
      onOpenInfo={handleOpenInfo}
    />
  );
}
