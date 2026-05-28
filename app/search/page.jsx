"use client";

import SearchResults from '@/src/views/SearchResults';
import { useAppContext } from '../providers';

export default function SearchPage() {
  const { 
    searchQuery, 
    setSearchQuery, 
    handleSelectCourse, 
    setShowEmailPopup, 
    courses 
  } = useAppContext();

  return (
    <SearchResults 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSelectCourse={handleSelectCourse}
      onStartSignup={() => setShowEmailPopup(true)}
      courses={courses}
    />
  );
}
