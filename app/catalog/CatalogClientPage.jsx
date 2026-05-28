"use client";

import CourseCatalog from '@/src/views/CourseCatalog';
import { useAppContext } from '../providers';

export default function CatalogClientPage() {
  const { 
    courses, 
    searchQuery, 
    setSearchQuery, 
    handleSelectCourse 
  } = useAppContext();

  return (
    <CourseCatalog 
      courses={courses}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSelectCourse={handleSelectCourse}
    />
  );
}
