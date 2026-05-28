import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  setHomeActiveTab,
  searchQuery, 
  setSearchQuery, 
  courses,
  onSelectCourse,
  onStartSignup,
  onSelectCategoryLanding,
  onOpenInfo
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const [activeSubCategory, setActiveSubCategory] = useState({
    courses: 'By Subject',
    subjects: 'Business',
    teachers: 'Lesson Plans',
    certifications: 'Teacher Certification Exams',
    degrees: 'Transfer Credits'
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const dropdownStructure = {
    courses: [
      {
        name: 'By Subject',
        hasArrow: true,
        items: [
          { text: 'Arts', landing: 'subject-humanities' },
          { text: 'Business', landing: 'subject-business' },
          { text: 'Computer Science', landing: 'subject-science' },
          { text: 'Education & Teaching', landing: 'teacher-resources' },
          { text: 'English (ELA)', landing: 'subject-english' },
          { text: 'Foreign Language', query: 'Foreign Language' },
          { text: 'Health & Medicine', query: 'Health & Medicine' },
          { text: 'History', landing: 'subject-humanities' },
          { text: 'Humanities', landing: 'subject-humanities' },
          { text: 'Math', landing: 'subject-math' },
          { text: 'Psychology', id: 'intro-psychology' },
          { text: 'Science', landing: 'subject-science' },
          { text: 'Social Science', landing: 'subject-humanities' }
        ]
      },
      {
        name: 'College Courses',
        hasArrow: true,
        items: [
          { text: 'CLEP Courses', landing: 'college-credit' },
          { text: 'AP Courses', landing: 'college-credit' },
          { text: 'DSST Courses', landing: 'college-credit' },
          { text: 'Transferable Credit Courses', landing: 'college-credit' },
          { text: 'Working Scholars® Orientation', id: 'working-scholars-intro' }
        ]
      },
      {
        name: 'High School Courses',
        hasArrow: true,
        items: [
          { text: 'AP Test Prep', landing: 'college-credit' },
          { text: 'High School Homework Help', landing: 'subject-math' },
          { text: 'Common Core Standards', landing: 'teacher-resources' }
        ]
      },
      {
        name: 'Middle School Courses',
        hasArrow: true,
        items: [
          { text: 'Middle School Math', landing: 'subject-math' },
          { text: 'Middle School Science', landing: 'subject-science' },
          { text: 'Middle School English', landing: 'subject-english' }
        ]
      },
      {
        name: 'Elementary School Courses',
        hasArrow: true,
        items: [
          { text: 'Elementary Math', landing: 'subject-math' },
          { text: 'Elementary Science', landing: 'subject-science' },
          { text: 'Reading Help', landing: 'subject-english' }
        ]
      }
    ],
    subjects: [
      {
        name: 'Art',
        hasArrow: true,
        items: [
          { text: 'Art History', landing: 'subject-humanities' },
          { text: 'Graphic Design', landing: 'subject-humanities' },
          { text: 'Studio Art', landing: 'subject-humanities' },
          { text: 'Music Theory', landing: 'subject-humanities' }
        ]
      },
      {
        name: 'Business',
        hasArrow: true,
        items: [
          { text: 'Accounting', landing: 'subject-business' },
          { text: 'Business Administration', landing: 'subject-business' },
          { text: 'Business Communication', landing: 'subject-business' },
          { text: 'Business Ethics', landing: 'subject-business' },
          { text: 'Business Intelligence', landing: 'subject-business' },
          { text: 'Business Law', landing: 'subject-business' },
          { text: 'Economics', id: 'macroeconomics' },
          { text: 'Finance', id: 'macroeconomics' },
          { text: 'Healthcare Administration', landing: 'subject-business' },
          { text: 'Human Resources', landing: 'subject-business' },
          { text: 'Information Technology', landing: 'subject-business' },
          { text: 'International Business', landing: 'subject-business' },
          { text: 'Operations Management', landing: 'subject-business' },
          { text: 'Real Estate', id: 'real-estate-salesperson' },
          { text: 'Sales & Marketing', landing: 'subject-business' }
        ]
      },
      {
        name: 'Computer Science',
        hasArrow: true,
        items: [
          { text: 'Computer Engineering', landing: 'subject-science' },
          { text: 'Computer Programming', query: 'Computer Science' },
          { text: 'Cybersecurity', landing: 'subject-science' },
          { text: 'Data Science', landing: 'subject-science' },
          { text: 'Software', landing: 'subject-science' }
        ]
      },
      {
        name: 'Education & Teaching',
        hasArrow: true,
        items: [
          { text: 'Curriculum Design', landing: 'teacher-resources' },
          { text: 'Special Education', landing: 'teacher-resources' },
          { text: 'Classroom Management', landing: 'teacher-resources' },
          { text: 'Instructional Technology', landing: 'teacher-resources' }
        ]
      },
      {
        name: 'English',
        hasArrow: true,
        items: [
          { text: 'Grammar', landing: 'subject-english' },
          { text: 'Literature', landing: 'subject-english' },
          { text: 'Public Speaking', landing: 'subject-english' },
          { text: 'Reading', landing: 'subject-english' },
          { text: 'Vocabulary', landing: 'subject-english' },
          { text: 'Writing & Composition', id: 'english-composition' }
        ]
      },
      {
        name: 'Health & Medicine',
        hasArrow: true,
        items: [
          { text: 'Nursing (NCLEX)', id: 'nclex-rn-prep' },
          { text: 'Anatomy & Physiology', id: 'cell-biology' },
          { text: 'Medical Terminology', landing: 'subject-science' },
          { text: 'Pharmacology', landing: 'subject-science' }
        ]
      },
      {
        name: 'History',
        hasArrow: true,
        items: [
          { text: 'US History', id: 'us-history' },
          { text: 'World History', landing: 'subject-humanities' },
          { text: 'European History', landing: 'subject-humanities' }
        ]
      },
      {
        name: 'Humanities',
        hasArrow: true,
        items: [
          { text: 'Philosophy', landing: 'subject-humanities' },
          { text: 'Literature Studies', landing: 'subject-humanities' },
          { text: 'Art Criticism', landing: 'subject-humanities' }
        ]
      },
      {
        name: 'Math',
        hasArrow: true,
        items: [
          { text: 'Algebra', id: 'clep-college-algebra' },
          { text: 'Geometry', landing: 'subject-math' },
          { text: 'Calculus', id: 'ap-calculus' },
          { text: 'Statistics', landing: 'subject-math' }
        ]
      },
      {
        name: 'Psychology',
        hasArrow: true,
        items: [
          { text: 'Intro to Psychology', id: 'intro-psychology' },
          { text: 'Developmental Psych', landing: 'subject-humanities' },
          { text: 'Abnormal Psych', landing: 'subject-humanities' }
        ]
      },
      {
        name: 'Science',
        hasArrow: true,
        items: [
          { text: 'Cell Biology', id: 'cell-biology' },
          { text: 'Chemistry', landing: 'subject-science' },
          { text: 'Physics', landing: 'subject-science' },
          { text: 'Earth Science', landing: 'subject-science' }
        ]
      },
      {
        name: 'Social Science',
        hasArrow: true,
        items: [
          { text: 'Sociology', landing: 'subject-humanities' },
          { text: 'Anthropology', landing: 'subject-humanities' },
          { text: 'Political Science', landing: 'subject-humanities' }
        ]
      }
    ],
    teachers: [
      {
        name: 'Lesson Plans',
        hasArrow: true,
        items: [
          { text: 'Math Lesson Plans', landing: 'teacher-resources' },
          { text: 'Science Lesson Plans', landing: 'teacher-resources' },
          { text: 'English Lesson Plans', landing: 'teacher-resources' },
          { text: 'Social Studies Plans', landing: 'teacher-resources' }
        ]
      },
      {
        name: 'Worksheets & Activities',
        hasArrow: true,
        items: [
          { text: 'Printable Worksheets', landing: 'teacher-resources' },
          { text: 'Science Experiments', landing: 'teacher-resources' },
          { text: 'Reading Comprehension', landing: 'teacher-resources' },
          { text: 'Study Guides', landing: 'teacher-resources' }
        ]
      },
      {
        name: 'Teacher Certification Prep',
        hasArrow: true,
        items: [
          { text: 'FTCE Exam Prep', id: 'ftce-professional-education-test' },
          { text: 'Praxis Core Prep', id: 'praxis-core' },
          { text: 'State Certification Info', landing: 'teacher-resources' }
        ]
      },
      {
        name: 'Classroom Management',
        hasArrow: true,
        items: [
          { text: 'Behavior Intervention', landing: 'teacher-resources' },
          { text: 'Grading Rubrics', landing: 'teacher-resources' },
          { text: 'Parent-Teacher Communication', landing: 'teacher-resources' }
        ]
      }
    ],
    certifications: [
      {
        name: 'Teacher Certification Exams',
        hasArrow: true,
        items: [
          { text: 'FTCE exams (Florida)', id: 'ftce-professional-education-test' },
          { text: 'Praxis core (National)', id: 'praxis-core' },
          { text: 'CBEST exams (California)', landing: 'teacher-resources' },
          { text: 'TExES exams (Texas)', landing: 'teacher-resources' }
        ]
      },
      {
        name: 'Nursing Exams',
        hasArrow: true,
        items: [
          { text: 'NCLEX Test Prep', query: 'NCLEX' },
          { text: 'TEAS Test Prep', query: 'TEAS' },
          { text: 'HESI Test Prep', query: 'HESI' },
          { text: 'All Nursing Test Prep', query: 'Nursing' }
        ]
      },
      {
        name: 'Real Estate Exams',
        hasArrow: true,
        items: [
          { text: 'Real Estate Salesperson', id: 'real-estate-salesperson' },
          { text: 'Real Estate Broker', query: 'Real Estate' },
          { text: 'All Real Estate Prep', query: 'Real Estate' }
        ]
      },
      {
        name: 'Military Exams',
        hasArrow: true,
        items: [
          { text: 'ASVAB Test Prep', id: 'asvab-prep' },
          { text: 'AFOQT Test Prep', query: 'ASVAB' },
          { text: 'ASTB Test Prep', query: 'ASVAB' },
          { text: 'All Military Test Prep', query: 'ASVAB' }
        ]
      },
      {
        name: 'Finance Exams',
        hasArrow: true,
        items: [
          { text: 'SIE Test Prep', query: 'Finance' },
          { text: 'Series 6 Test Prep', query: 'Finance' },
          { text: 'Series 65 Test Prep', query: 'Finance' },
          { text: 'Series 66 Test Prep', query: 'Finance' },
          { text: 'Series 7 Test Prep', query: 'Finance' },
          { text: 'CPP Test Prep', query: 'Finance' },
          { text: 'CMA Test Prep', query: 'Finance' },
          { text: 'All Finance Test Prep', query: 'Finance' }
        ]
      },
      {
        name: 'Human Resources Exams',
        hasArrow: true,
        items: [
          { text: 'aPHR Test Prep', query: 'HR' },
          { text: 'PHR Test Prep', query: 'HR' },
          { text: 'SPHR Test Prep', query: 'HR' },
          { text: 'All HR Test Prep', query: 'HR' }
        ]
      },
      {
        name: 'Counseling & Social Work Exams',
        hasArrow: true,
        items: [
          { text: 'LCSW Test Prep', query: 'counseling' },
          { text: 'MFT Test Prep', query: 'counseling' },
          { text: 'All Counseling Test Prep', query: 'counseling' }
        ]
      },
      {
        name: 'Allied Health & Medicine Exams',
        hasArrow: true,
        items: [
          { text: 'CMAA Test Prep', query: 'medicine' },
          { text: 'Phlebotomy Test Prep', query: 'medicine' },
          { text: 'All Allied Health Prep', query: 'medicine' }
        ]
      },
      {
        name: 'TOEFL Exam',
        hasArrow: true,
        items: [
          { text: 'TOEFL Test Prep', id: 'toefl-prep' },
          { text: 'IELTS Test Prep', query: 'TOEFL' },
          { text: 'All English Test Prep', query: 'TOEFL' }
        ]
      },
      {
        name: 'All Test Prep',
        hasArrow: false,
        items: [
          { text: 'Browse Test Prep Directory', query: 'Exam' }
        ]
      }
    ],
    degrees: [
      {
        name: 'Transfer Credits',
        hasArrow: true,
        items: [
          { text: 'ACE Recommended Courses', landing: 'college-credit' },
          { text: 'NCCRS Approved Courses', landing: 'college-credit' },
          { text: 'CLEP Exam Prep', id: 'clep-college-algebra' },
          { text: 'DSST Exam Prep', landing: 'college-credit' }
        ]
      },
      {
        name: 'Working Scholars®',
        hasArrow: true,
        items: [
          { text: 'Program Overview', id: 'working-scholars-intro' },
          { text: 'Eligibility Guidelines', landing: 'college-credit' },
          { text: 'Sponsor Partners', landing: 'college-credit' }
        ]
      },
      {
        name: 'Degree Pathways',
        hasArrow: true,
        items: [
          { text: 'Associate Degree Paths', landing: 'college-credit' },
          { text: 'Bachelor Degree Paths', landing: 'college-credit' },
          { text: 'Credit Transfer Guide', landing: 'college-credit' }
        ]
      }
    ]
  };

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalSearch(searchQuery || '');
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = localSearch.trim().toLowerCase();
    setSearchQuery(localSearch);
    if (query === 'ftce' || query.includes('ftce') || query === 'ped' || query === 'professional education') {
      if (setHomeActiveTab) setHomeActiveTab('Overview');
      setActivePage('ftce');
    } else if (query === 'praxis' || query.includes('praxis')) {
      if (setHomeActiveTab) setHomeActiveTab('Overview');
      setActivePage('praxis');
    } else {
      setActivePage('search');
    }
  };

  const selectCourseById = (courseId) => {
    if (!courses) return;
    const found = courses.find(c => c.id === courseId);
    if (found) {
      if (courseId === 'ftce-professional-education-test') {
        if (setHomeActiveTab) setHomeActiveTab('Overview');
        setActivePage('ftce');
      } else if (courseId === 'praxis-core') {
        if (setHomeActiveTab) setHomeActiveTab('Overview');
        setActivePage('praxis');
      } else if (onSelectCourse) {
        onSelectCourse(found);
      }
      setActiveDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTestimonials = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (setHomeActiveTab) setHomeActiveTab('Overview');
    
    if (activePage !== 'ftce') {
      setActivePage('ftce');
      // Wait for page to render then scroll
      setTimeout(() => {
        const section = document.getElementById('testimonials-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById('testimonials-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* 1. Top Utility Sub-Header Bar (Screenshot 555) */}
      <div style={{
        backgroundColor: '#0c2330',
        color: '#ffffff',
        padding: '8px 24px',
        fontSize: '0.78rem',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '24px',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: '600',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }} className="hide-on-mobile">
        <a href="/category/teacher-resources" onClick={(e) => { e.preventDefault(); onSelectCategoryLanding('teacher-resources'); }} style={{ cursor: 'pointer', opacity: 0.95, textDecoration: 'none', color: '#ffffff' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.95}>For Teachers</a>
        <a href="/category/college-credit" onClick={(e) => { e.preventDefault(); onSelectCategoryLanding('college-credit'); }} style={{ cursor: 'pointer', opacity: 0.95, textDecoration: 'none', color: '#ffffff' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.95}>For Working Scholars®</a>
        <a href="/category/college-credit" onClick={(e) => { e.preventDefault(); onSelectCategoryLanding('college-credit'); }} style={{ cursor: 'pointer', opacity: 0.95, textDecoration: 'none', color: '#ffffff' }} onMouseOver={e => e.target.style.opacity = 1} onMouseOut={e => e.target.style.opacity = 0.95}>For College Credit</a>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="header-nav" style={{ 
        backgroundColor: '#ffffff', 
        borderBottom: '1px solid #d2dbe5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="header-container" style={{ padding: '8px 24px', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Left Side: Hamburger & Logo & Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            
            {/* Hamburger menu for mobile drawer */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                padding: '6px', 
                color: '#1f4e5a',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="show-on-mobile"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Brand Logo - Styled precisely like PrepSumit.com */}
            <a 
              href="/"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', textDecoration: 'none' }}
              onClick={(e) => { e.preventDefault(); setActivePage('home'); setSearchQuery(''); }}
            >
              <Image 
                src="/images/prepsumit-logo.webp" 
                alt="PrepSumit logo" 
                width={34} 
                height={34} 
                style={{ objectFit: 'contain' }}
              />
              <span style={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.65rem', 
                fontWeight: '800', 
                color: '#1f4e5a',
                letterSpacing: '-0.03em'
              }}>
                PrepSumit<span style={{ color: '#ffb627' }}>.com</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '18px', marginLeft: '12px' }}>
              
              {/* Plans Link */}
              <a 
                href="/pricing"
                onClick={(e) => { e.preventDefault(); setActivePage('plans'); }}
                style={{
                  background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                  fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                  padding: '16px 0', transition: 'color 0.2s', textDecoration: 'none', display: 'inline-block'
                }}
                onMouseOver={(e) => e.target.style.color = '#13809c'}
                onMouseOut={(e) => e.target.style.color = '#222222'}
              >
                Plans
              </a>

              {/* Dynamic Dropdowns based on PrepSumit.com categories */}
              {['courses', 'subjects', 'teachers', 'certifications', 'degrees'].map((key) => {
                let label = key.charAt(0).toUpperCase() + key.slice(1);
                if (key === 'degrees') label = 'College Degrees';
                return (
                  <div 
                    key={key}
                    style={{ position: 'relative' }}
                    className="nav-item-container"
                    onMouseEnter={() => {
                      setActiveDropdown(key);
                      const defaultCats = {
                        courses: 'By Subject',
                        subjects: 'Business',
                        teachers: 'Lesson Plans',
                        certifications: 'Teacher Certification Exams',
                        degrees: 'Transfer Credits'
                      };
                      setActiveSubCategory(prev => ({ ...prev, [key]: defaultCats[key] }));
                    }}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === key ? null : key);
                        const defaultCats = {
                          courses: 'By Subject',
                          subjects: 'Business',
                          teachers: 'Lesson Plans',
                          certifications: 'Teacher Certification Exams',
                          degrees: 'Transfer Credits'
                        };
                        setActiveSubCategory(prev => ({ ...prev, [key]: defaultCats[key] }));
                      }}
                      style={{
                        background: 'none', border: 'none', fontFamily: 'var(--font-heading)',
                        fontWeight: '700', fontSize: '0.92rem', color: '#222222', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '4px', padding: '16px 0', transition: 'color 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#13809c'}
                      onMouseOut={(e) => e.target.style.color = '#222222'}
                    >
                      {label} <ChevronDown size={14} style={{ opacity: 0.7 }} />
                    </button>
 
                    {activeDropdown === key && (
                      <div className={`nav-dropdown-pane ${(key === 'certifications' || key === 'degrees') ? 'align-right' : ''}`}>
                        {/* Left column: Categories list */}
                        <div className="nav-dropdown-left">
                          {dropdownStructure[key].map((categoryItem) => {
                            const isAllTestPrep = categoryItem.name === 'All Test Prep';
                            return (
                              <div
                                key={categoryItem.name}
                                className={`nav-dropdown-cat-item ${isAllTestPrep ? 'blue-link' : ''} ${activeSubCategory[key] === categoryItem.name ? 'active' : ''}`}
                                style={isAllTestPrep ? { justifyContent: 'flex-start', gap: '8px' } : {}}
                                onMouseEnter={() => {
                                  setActiveSubCategory(prev => ({ ...prev, [key]: categoryItem.name }));
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isAllTestPrep) {
                                    setSearchQuery('Exam');
                                    setActivePage('search');
                                    setActiveDropdown(null);
                                  } else {
                                    setActiveSubCategory(prev => ({ ...prev, [key]: categoryItem.name }));
                                  }
                                }}
                              >
                                {isAllTestPrep && <ChevronRight size={14} className="blue-chevron" />}
                                <span>{categoryItem.name}</span>
                                {categoryItem.hasArrow && (
                                  <ChevronRight size={14} style={{ opacity: 0.6 }} />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Right column: Dynamic Sub-items list */}
                        <div className="nav-dropdown-right">
                          {(() => {
                            const currentSubCat = dropdownStructure[key].find(cat => cat.name === activeSubCategory[key]) || dropdownStructure[key][0];
                            return currentSubCat.items.map((subItem, idx) => {
                              const href = (() => {
                                if (subItem.landing) return `/category/${subItem.landing}`;
                                if (subItem.id) {
                                  if (subItem.id === 'ftce-professional-education-test') return '/ftce';
                                  if (subItem.id === 'praxis-core') return '/praxis';
                                  if (subItem.id === 'teas-prep') return '/teas';
                                  return `/courses/${subItem.id}`;
                                }
                                if (subItem.query) {
                                  if (subItem.query === 'FTCE') return '/ftce';
                                  if (subItem.query === 'Praxis') return '/praxis';
                                  if (subItem.query === 'TEAS') return '/teas';
                                  return `/search?q=${encodeURIComponent(subItem.query)}`;
                                }
                                return '#';
                              })();
                              return (
                                <a
                                  key={idx}
                                  href={href}
                                  className="nav-dropdown-sub-item"
                                  style={{ textDecoration: 'none' }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (subItem.landing) {
                                      onSelectCategoryLanding(subItem.landing);
                                    } else if (subItem.id) {
                                      selectCourseById(subItem.id);
                                    } else if (subItem.query) {
                                      setSearchQuery(subItem.query);
                                      if (subItem.query === 'FTCE') {
                                        setActivePage('ftce');
                                      } else if (subItem.query === 'Praxis') {
                                        setActivePage('praxis');
                                      } else if (subItem.query === 'TEAS') {
                                        setActivePage('teas');
                                      } else {
                                        setActivePage('search');
                                      }
                                    }
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {subItem.text}
                                </a>
                              );
                            });
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            </nav>
          </div>

          {/* Right Side: Log In, Sign Up, and Inline Round Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            
            {/* Log In Button - White background, thin teal border */}
            <a 
              href="/login"
              onClick={(e) => { e.preventDefault(); setActivePage('login'); }}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #13809c',
                borderRadius: '4px',
                color: '#13809c',
                fontWeight: '700',
                fontSize: '0.88rem',
                padding: '8px 18px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              className="desktop-only"
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(19, 128, 156, 0.04)'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
            >
              Log In
            </a>
             {/* Sign Up Button - Solid Amber */}
            <a 
              href="/signup"
              onClick={(e) => { e.preventDefault(); onStartSignup(); }}
              style={{
                backgroundColor: '#ffb627',
                border: 'none',
                borderRadius: '4px',
                color: '#222222',
                fontWeight: '800',
                fontSize: '0.88rem',
                padding: '9.5px 20px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(255,182,39,0.15)',
                transition: 'all 0.2s',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              className="desktop-only"
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#fba919';
                e.target.style.transform = 'translateY(-0.5px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffb627';
                e.target.style.transform = 'none';
              }}
            >
              Sign Up
            </a>

            {/* Toggleable Search Button / Input - Screenshot 555 style */}
            {!showSearchInput ? (
              <button 
                onClick={() => setShowSearchInput(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#13809c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px'
                }}
                className="hide-on-mobile"
                aria-label="Open Search"
              >
                <Search size={20} />
              </button>
            ) : (
              <form onSubmit={handleSearchSubmit} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative',
                width: '210px'
              }} className="hide-on-mobile">
                <input 
                  type="text" 
                  placeholder="Search Courses & Lessons" 
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '8px 36px 8px 16px',
                    borderRadius: '20px',
                    border: '1.5px solid #13809c',
                    fontSize: '0.82rem',
                    outline: 'none',
                    backgroundColor: '#ffffff',
                    color: '#222222',
                    transition: 'border-color 0.2s'
                  }}
                  onBlur={() => {
                    if (!localSearch.trim()) {
                      setShowSearchInput(false);
                    }
                  }}
                />
                <button 
                  type="submit" 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    position: 'absolute', 
                    right: '12px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    cursor: 'pointer', 
                    color: '#222222', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: 0
                  }}
                  aria-label="Search Submit"
                >
                  <Search size={14} />
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Mobile Drawer (visible when toggle clicked) */}
        {mobileMenuOpen && (
          <div className="fade-in" style={{
            backgroundColor: '#ffffff',
            borderTop: '1px solid #d2dbe5',
            borderBottom: '1px solid #d2dbe5',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--shadow-md)',
            position: 'absolute',
            top: '68px',
            left: 0,
            right: 0,
            zIndex: 998
          }}>
            {/* Search Box for Mobile */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', position: 'relative', width: '100%' }}>
              <input 
                type="text" 
                placeholder="Search Courses & Lessons" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 16px',
                  borderRadius: '20px',
                  border: '1.5px solid #d2dbe5',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button type="submit" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#13809c' }}>
                <Search size={18} />
              </button>
            </form>

            {/* Mobile Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
              <a href="/catalog" onClick={(e) => { e.preventDefault(); setActivePage('catalog'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer', textDecoration: 'none' }}>All Courses</a>
              <a href="/pricing" onClick={(e) => { e.preventDefault(); setActivePage('plans'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer', textDecoration: 'none' }}>Plans</a>
              <a href="/ftce" onClick={(e) => { e.preventDefault(); setSearchQuery('FTCE'); setActivePage('ftce'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer', textDecoration: 'none' }}>FTCE Exams</a>
              <a href="/ftce" onClick={(e) => { e.preventDefault(); if (setHomeActiveTab) setHomeActiveTab('Test'); setActivePage('ftce'); setMobileMenuOpen(false); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer', textDecoration: 'none' }}>FTCE Practice Tests</a>
              <a href="/ftce#testimonials" onClick={(e) => { e.preventDefault(); scrollToTestimonials(); }} style={{ fontSize: '0.95rem', fontWeight: '700', color: '#222222', cursor: 'pointer', textDecoration: 'none' }}>Testimonials</a>
            </div>

            {/* Mobile Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', borderTop: '1px solid #f2f6f9', paddingTop: '16px' }}>
              <a 
                href="/login"
                onClick={(e) => { e.preventDefault(); setActivePage('login'); setMobileMenuOpen(false); }}
                style={{
                  flex: 1,
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #13809c',
                  borderRadius: '4px',
                  color: '#13809c',
                  fontWeight: '700',
                  padding: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Log In
              </a>
              <a 
                href="/signup"
                onClick={(e) => { e.preventDefault(); onStartSignup(); setMobileMenuOpen(false); }}
                style={{
                  flex: 1,
                  backgroundColor: '#ffb627',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#222222',
                  fontWeight: '800',
                  padding: '10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
