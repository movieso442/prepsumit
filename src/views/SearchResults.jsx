import { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronLeft, CheckCircle, FileText, Play, BookOpen, AlertCircle } from 'lucide-react';

export default function SearchResults({ searchQuery, setSearchQuery, onSelectCourse, onStartSignup, courses = [] }) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [activeTab, setActiveTab] = useState('Top Results'); // 'Top Results' | 'Lessons' | 'Courses'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync local input with global query prop changes (e.g., from Navbar search)
  useEffect(() => {
    setLocalSearch(searchQuery || '');
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
    }
  };

  // Mock results for "praxis" (matching screenshots)
  const praxisMockResults = [
    // Page 1
    {
      id: 'praxis-science',
      title: 'Praxis General Science: Content Knowledge (5435) Study Guide and Test Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Learn about the Praxis General Science: Content Knowledge test with this course and study guide, which covers the exam's content categories, format, and study tips. Our Praxis 5435 prep course and study guide is a fun and easy way to ensure you'll be ready come test day.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-prep-resources',
      title: 'Praxis Test Preparation & Resources',
      breadcrumb: 'Courses / Test Prep',
      description: "Prepare for your Praxis exam - all in one place. Learn the way you like with Praxis specific video lessons, study guides, flashcards, and courses that fit your learning style. Whether you have six months of six days, get a study plan to make sure you're prepared for test day.",
      type: 'course',
      iconType: 'text',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-principles',
      title: 'Praxis Principles of Learning and Teaching: PreK-12 (5625) Study Guide and Test Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "This course will help you prepare for the Praxis Principles of Learning and Teaching: PreK-12 (5625) exam. Let PrepSumit.com guide you to success on test day as you prepare to take this certification test.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-physics',
      title: 'Praxis Physics: Content Knowledge (5265) Study Guide and Test Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Getting a passing score on the Praxis Physics: Content Knowledge Exam is within reach when you use the helpful lessons provided in our Praxis 5265 course and study guide. Also included are short video and text lessons, and multiple-choice quizzes that can help you see how well you'll do on test day.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-reading-5713',
      title: 'Praxis Core Reading Test Prep | Praxis 5713',
      breadcrumb: 'Courses / Test Prep',
      description: "Read about the content covered on the Praxis Core Reading (5713), as well as the exam policies, format, passing scores, and other relevant test information. Prepare for the Praxis Core Academic Skills for Educators Reading exam with PrepSumit.com's test-aligned preparation materials, including a diagnostic test, a personalized study plan, video lessons, full-length practice tests, and tips on how to ace your exam.",
      type: 'course',
      iconType: 'text',
      actions: ['View Course', 'Take Practice Exam']
    },
    // Page 2
    {
      id: 'praxis-writing-5723',
      title: 'Praxis Core Writing Test Prep | Praxis 5723',
      breadcrumb: 'Courses / Test Prep',
      description: "Get ready for the Praxis Core Academic Skills for Educators Writing (5723) subtest with this comprehensive preparation course. Our study guide's video lessons and practice quizzes are designed to help you refresh your knowledge of grammar, usage, mechanics, and essay writing.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'what-is-praxis',
      title: 'What Is Praxis?',
      breadcrumb: 'Courses / Social Science / Praxis Information Guide',
      description: "What is the Praxis Exam? This guide will answer this question with info on test locations, dates and requirements, Praxis test lengths, exam prep advice, registration details and more.",
      type: 'article',
      iconType: 'article',
      actions: ['View Article']
    },
    {
      id: 'praxis-reading-specialist',
      title: 'Praxis Reading Specialist (5301) Prep',
      breadcrumb: 'Courses / English',
      description: "Use this study guide to prepare for the Praxis Reading Specialist exam. You'll be able to review such topics as reading assessments and instruction, the development of phonics and reading fluency in children, how to teach vocabulary, and more.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-math-5733',
      title: 'Praxis Core Math Test Prep | Praxis 5733',
      breadcrumb: 'Courses / Mathematics',
      description: "Familiarize yourself with the Praxis 5733 exam's content, format, and registration process. Learn all you need to know to pass the Praxis Core Academic Skills for Educators: Mathematics test with PrepSumit.com's full range of test prep resources.",
      type: 'course',
      iconType: 'text',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-combined-5752',
      title: 'Praxis Core Combined Test Prep | Praxis 5752',
      breadcrumb: 'Courses / Test Prep',
      description: "Get an overview of the Praxis 5752 and learn about the subtests, topics, question formats, registration process, and more. PrepSumit.com's prep material will walk you through all the details necessary to pass your Praxis Core Academic Skills for Educators exam.",
      type: 'course',
      iconType: 'text',
      actions: ['View Course', 'Take Practice Exam']
    },
    // Page 3
    {
      id: 'praxis-human-dev',
      title: 'Praxis: Human Development',
      breadcrumb: 'Courses / Education',
      description: "Using this chapter, you will come to a full understanding of the stages of human development to help you get ready for the Praxis Family and Consumer Sciences examination. With fun and engaging videos and written transcripts, you'll feel prepared to tackle this exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-business-mgmt',
      title: 'Praxis Business: Management',
      breadcrumb: 'Courses / Business',
      description: "Prepare for your business content knowledge Praxis with fun and engaging video lessons. Review the functions and roles of management and human resources, in addition to the skills necessary for effective managers.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-business-computer',
      title: 'Praxis Business: Computer Applications',
      breadcrumb: 'Courses / Business',
      description: "Make use of our targeted lessons to prepare for various aspects of the Praxis Business Education Test. Watch the informative video lessons, practice using an assortment of computer applications and complete the short quizzes for self-assessment.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-info-guide',
      title: 'Praxis Information Guide',
      breadcrumb: 'Courses / Social Science',
      description: "Check out our helpful guide to learn all about the registration process, study tips, test dates, and formatting for various Praxis exams.",
      type: 'course',
      iconType: 'text',
      actions: ['View Course']
    },
    {
      id: 'praxis-math-problems',
      title: 'Praxis I Math: Solving Real-Life Problems',
      breadcrumb: 'Courses / Mathematics',
      description: "This chapter talks about using mathematics to solve real-life issues. The chapter is taught through a series of video lessons to help you get ready for questions on the Praxis I Math test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    // Page 4 [From Screenshot 1]
    {
      id: 'praxis-physics-work',
      title: 'Praxis Physics: Work, Energy & Power',
      breadcrumb: 'Courses / Test Prep',
      description: "The basics of physics involve work, energy and power, which fuels the rest of more advanced functions. This chapter goes over these ideas ahead of the Praxis Physics exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-individual-family',
      title: 'Praxis: Individual & Family Resources',
      breadcrumb: 'Courses / Test Prep',
      description: "In this chapter you will be able to complete a quick and engaging review over individual and family resources. You will refresh your memory regarding consumer decisions, personal property insurance, health insurance, and more as you get ready to pass the Praxis Family and Consumer Sciences exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-math-data',
      title: 'Praxis Mathematics: Data',
      breadcrumb: 'Courses / Test Prep',
      description: "Improve your understanding of data before you take the Praxis exam in mathematics. Use the video lessons and self-assessment quizzes in this chapter to master the skills needed to earn your best score.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-test-info',
      title: 'Praxis Test: General Info',
      breadcrumb: 'Courses / Test Prep',
      description: "Look through these informative articles to be better prepared for the Praxis Tests, which are often required for educator certification. Explore the test structures, typical question formats, scoring information, and much more.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-science-motion',
      title: 'Praxis General Science: Motion & Forces',
      breadcrumb: 'Courses / Test Prep',
      description: "Building expertise in physics is necessary if you want to earn a teaching certification in general science. Get ready for the Praxis General Science examination by watching this chapter's educational online video lessons on motion and forces.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    // Page 5 [From Screenshot 4 & 5]
    {
      id: 'praxis-quiz-strategies',
      title: 'Quiz & Worksheet - Praxis Exam Preparation | Strategies, Tips & Resources',
      breadcrumb: 'Courses / Test Prep',
      description: "Assess your understanding of Praxis exam preparation strategies and resources with this interactive quiz. Use the worksheet to identify key study planning templates and test-taking tips.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Quiz']
    },
    {
      id: 'praxis-marketing-strategic',
      title: 'Praxis Marketing: Strategic Planning',
      breadcrumb: 'Courses / Test Prep',
      description: "Let our lessons teach you about strategic planning. The fun and engaging video lessons and self-assessment quizzes in this chapter can prepare you to answer questions about marketing-information management and planning on the Praxis Marketing Education test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-free-tests',
      title: 'Free Praxis II Practice Tests - Praxis Test Prep 2021-2022',
      breadcrumb: 'Courses / Test Prep',
      description: "Take our Praxis II practice tests to prepare for your Praxis II Subject Assessment and receive immediate diagnostic feedback. These practice tests can help you identify which areas you need to focus on for your Praxis II test preparation.",
      type: 'article',
      iconType: 'article',
      actions: ['View Article']
    },
    {
      id: 'praxis-business-it',
      title: 'Praxis Business: Information Technology Operations and Concepts',
      breadcrumb: 'Courses / Business',
      description: "Let us assist you in your review for the information technology operations and concepts questions on the Praxis Business Education test. Watch our short video lessons and take the quick quizzes for immediate feedback.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-math-optimization',
      title: 'Praxis Mathematics: Optimization and Differentiation',
      breadcrumb: 'Courses / Test Prep',
      description: "Let us help you understand optimization and differentiation. The video lessons and self-assessment quizzes show you how to solve problems in preparation for the Praxis Mathematics test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    // Page 6 [From Screenshot 2]
    {
      id: 'praxis-writing-mechanics',
      title: 'Praxis I Writing: Mechanics',
      breadcrumb: 'Courses / Test Prep',
      description: "Study sentence mechanics with these short, engaging lessons. Through video lessons and self-assessment quizzes, you can learn several approaches to help you successfully identify mechanics errors on the Praxis I Core Academic Writing test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-marketing-selling',
      title: 'Praxis Marketing: Selling',
      breadcrumb: 'Courses / Test Prep',
      description: "This chapter can teach you about the role of selling. The engaging and fun video lessons and self-assessment quizzes can prepare you to answer questions about personal selling on the Praxis Marketing Education test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-business-comm',
      title: 'Praxis Business: Foundations of Communication',
      breadcrumb: 'Courses / Business',
      description: "Use this chapter to review communication foundations. Short, user-friendly videos and quizzes for self-assessment will guide your study and help you prepare for the Praxis business exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-biology-evolution',
      title: 'Praxis Biology & General Science: Evolution',
      breadcrumb: 'Courses / Test Prep',
      description: "Let us teach you about the theory of evolution. The video lessons and self-assessment quizzes in this chapter can help you correctly answer questions about evolution and classical genetics on the Praxis II Biology and General Science test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-biology-general-guide',
      title: 'Praxis Biology and General Science: Practice and Study Guide',
      breadcrumb: 'Courses / Science',
      description: "The Praxis Biology and General Science exam has been discontinued. Please view the PrepSumit.com course Praxis General Science (5435): Practice & Study Guide instead. That course is designed to fully prepare you for your teacher certification exam.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    // Page 7
    {
      id: 'praxis-english-5038',
      title: 'Praxis English Language Arts: Content Knowledge (5038)',
      breadcrumb: 'Courses / Test Prep',
      description: "Review literary terms, reading analysis, writing guidelines, and research mechanics to excel on the Praxis 5038 English Language Arts exam. Use our short, dynamic video lessons and diagnostic tests.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-social-5081',
      title: 'Praxis Social Studies: Content Knowledge (5081) Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Boost your score on the Praxis 5081 Social Studies test. Our study guide reviews world history, US government, behavioral sciences, geography, and economics concepts.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-math-5161',
      title: 'Praxis Mathematics: Content Knowledge (5161) Study Guide',
      breadcrumb: 'Courses / Test Prep',
      description: "Ensure you are ready for the Praxis 5161 Math exam with our complete study companion. Revisit algebra, coordinate geometry, trigonometry, calculus, and matrix theory.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-art-5134',
      title: 'Praxis Art: Content Knowledge (5134) Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Pass your Praxis 5134 Art exam with our visual arts study guide. Reviews art history, design elements, visual mediums, art criticism, and classroom safety.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-business-economic',
      title: 'Praxis Business: Economic Systems & Market Structures',
      breadcrumb: 'Courses / Business',
      description: "Explore the differences between market and command economies, oligopolies and monopolies with this chapter's video lessons and quizzes. Our instructors discuss these topics and more to help you study for the Praxis Business Education exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    // Page 8
    {
      id: 'praxis-chemistry-5245',
      title: 'Praxis Chemistry: Content Knowledge (5245) Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Refresh your knowledge of chemical reactions, atomic structure, thermodynamics, and organic chemistry principles to pass the Praxis 5245 Chemistry certification test.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-writing-essay',
      title: 'Praxis Core Writing: Essay Practice & Scoring Guide',
      breadcrumb: 'Courses / Test Prep',
      description: "Prepare for the essay portion of the Praxis Core Writing test. Learn to plan, structure, draft, and refine persuasive and source-based essays under timed conditions.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-early-5025',
      title: 'Praxis Early Childhood Education (5025) Study Guide',
      breadcrumb: 'Courses / Test Prep',
      description: "Prepare to teach early learners with this Praxis 5025 guide. Covers reading development, math foundations, social studies themes, and science basics.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-special-5354',
      title: 'Praxis Special Education (5354) Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Gain the specialized knowledge needed to pass the Praxis 5354 Special Education exam. Study legal rights, IEP processes, instruction modifications, and student assessments.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-marketing-professional',
      title: 'Praxis Marketing: Professional Development',
      breadcrumb: 'Courses / Test Prep',
      description: "Through our materials on professional development in marketing, you can study for the Praxis Marketing Education exam. These materials include written lessons and quizzes where you can track your progress and practice answering multiple-choice questions like those found on the test.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    // Page 9
    {
      id: 'praxis-health-5857',
      title: 'Praxis Health & Physical Education (5857) Prep',
      breadcrumb: 'Courses / Test Prep',
      description: "Study motor development, fitness principles, safety protocols, health literacy, and lesson planning to clear your Praxis 5857 Health & PE exam.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-esol-5362',
      title: 'Praxis English to Speakers of Other Languages (5362) Study Guide',
      breadcrumb: 'Courses / Test Prep',
      description: "Learn teaching methodologies, linguistics basics, vocabulary acquisition techniques, and cultural integration models to pass your Praxis 5362 ESOL test.",
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam']
    },
    {
      id: 'praxis-science-earth',
      title: 'Praxis General Science: Earth & Space Science',
      breadcrumb: 'Courses / Test Prep',
      description: "Study plate tectonics, geological history, ocean currents, atmospheric patterns, and solar systems to pass the general science Praxis exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-biology-cell',
      title: 'Praxis Biology: Cell Biology & Biochemistry',
      breadcrumb: 'Courses / Test Prep',
      description: "Master cell membranes, organelles, cellular respiration, photosynthesis, mitosis, and macromolecules for the biology Praxis subject assessment.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-core-vocabulary',
      title: 'Praxis Core Reading: Vocabulary & Context Clues',
      breadcrumb: 'Courses / Test Prep',
      description: "Increase your reading score on the Praxis Core by mastering techniques to identify word meanings using surrounding text context clues.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    // Page 10
    {
      id: 'praxis-math-calculus',
      title: 'Praxis Mathematics: Calculus Concepts',
      breadcrumb: 'Courses / Test Prep',
      description: "Review limits, continuity, derivative shortcuts, integration rules, and their practical word-problem applications for the Praxis math exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-writing-grammar',
      title: 'Praxis I Writing: Usage and Grammar Rules',
      breadcrumb: 'Courses / Test Prep',
      description: "Study pronoun cases, subject-verb agreements, modifier placements, and sentence fragments to clear the grammar writing Praxis subtest.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-social-history',
      title: 'Praxis Social Studies: US History & Civics',
      breadcrumb: 'Courses / Test Prep',
      description: "Review key eras in American history alongside constitutional foundations and civil rights amendments to excel on the social studies Praxis.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    },
    {
      id: 'praxis-core-everything',
      title: 'Praxis Core Exams: Everything You Need to Know',
      breadcrumb: 'Courses / Social Science / Praxis Information Guide',
      description: "Everything you need to know about the Praxis Core exam. Learn what's on it, who needs to take it, what study guide to use, and how to pass.",
      type: 'article',
      iconType: 'article',
      actions: ['View Article']
    },
    {
      id: 'praxis-principles-development',
      title: 'Praxis Principles of Learning: Student Development',
      breadcrumb: 'Courses / Test Prep',
      description: "Study cognitive, social, emotional, and physical development stages and their instructional impact for the Praxis PLT teacher exam.",
      type: 'lesson',
      iconType: 'video',
      actions: ['View Chapter']
    }
  ];

  // Resolve search source
  const isPraxis = searchQuery?.toLowerCase().trim() === 'praxis';

  // Compute results
  let rawResults = [];
  if (isPraxis) {
    rawResults = praxisMockResults;
  } else {
    // Dynamic matching from coursesData database
    const query = searchQuery?.toLowerCase().trim() || '';
    rawResults = courses.filter(course => {
      return course.title.toLowerCase().includes(query) ||
             course.subject.toLowerCase().includes(query) ||
             course.description.toLowerCase().includes(query) ||
             course.lessons.some(l => l.title.toLowerCase().includes(query) || l.summary.toLowerCase().includes(query));
    }).map(course => ({
      id: course.id,
      title: course.title,
      breadcrumb: `Courses / ${course.subject}`,
      description: course.description,
      type: 'course',
      iconType: 'video',
      actions: ['View Course', 'Take Practice Exam'],
      originalCourse: course
    }));

    // Add lessons that match query as lesson type results
    courses.forEach(course => {
      course.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(query) || lesson.summary.toLowerCase().includes(query)) {
          rawResults.push({
            id: lesson.id,
            title: lesson.title,
            breadcrumb: `Courses / ${course.subject} / ${course.title}`,
            description: lesson.summary,
            type: 'lesson',
            iconType: 'video',
            actions: ['View Chapter'],
            originalCourse: course
          });
        }
      });
    });
  }

  // Filter based on active tabs
  const getFilteredResults = () => {
    if (activeTab === 'Courses') {
      return rawResults.filter(item => item.type === 'course');
    }
    if (activeTab === 'Lessons') {
      return rawResults.filter(item => item.type === 'lesson' || item.type === 'chapter');
    }
    // 'Top Results' has everything
    return rawResults;
  };

  const filteredResults = getFilteredResults();

  // Pagination calculation
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  const handleActionClick = (actionName, item) => {
    if (actionName === 'View Course' && item.originalCourse) {
      onSelectCourse(item.originalCourse);
    } else if (actionName === 'View Course' && item.id === 'praxis-combined-5752') {
      // Find our real praxis-core course in the database
      const realPraxis = courses.find(c => c.id === 'praxis-core');
      if (realPraxis) {
        onSelectCourse(realPraxis);
      } else {
        onStartSignup();
      }
    } else if (actionName === 'View Course' && item.id === 'praxis-math-5733') {
      const realPraxis = courses.find(c => c.id === 'praxis-core');
      if (realPraxis) {
        onSelectCourse(realPraxis);
      } else {
        onStartSignup();
      }
    } else {
      // Replicates PrepSumit.com: other actions (Take Practice Exam, View Article, View Chapter, mock courses) trigger account creation
      onStartSignup();
    }
  };

  // Stacked pages/files icon wrapper
  const SearchResultIcon = ({ type }) => {
    return (
      <div className="search-result-icon-container">
        {/* Layer 2 (back file outline) */}
        <div className="file-back-sheet"></div>
        {/* Layer 1 (front file container) */}
        <div className="file-front-sheet">
          {type === 'video' ? (
            <div className="play-button-small">
              <Play size={10} fill="#13809c" color="#13809c" />
            </div>
          ) : type === 'text' ? (
            <div className="lines-indicator">
              <span className="line-sm"></span>
              <span className="line-sm"></span>
              <span className="line-sm"></span>
            </div>
          ) : (
            <div className="article-indicator">
              <FileText size={14} color="#13809c" />
            </div>
          )}
        </div>
      </div>
    );
  };

  // PrepSumit.com dynamic pagination numbers helper
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        start = 2;
        end = 3;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 2;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="search-results-page">
      <style>{`
        .search-results-page {
          max-width: 1140px;
          margin: 0 auto;
          padding: 24px 16px 64px;
          font-family: 'Outfit', sans-serif;
          color: #222222;
        }

        .search-header-container {
          margin-bottom: 24px;
        }

        .search-title-main {
          font-size: 2.1rem;
          color: #1f4e5a;
          font-weight: 800;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .search-title-main span {
          font-weight: 400;
          color: #333333;
        }

        .search-box-bar {
          display: flex;
          align-items: stretch;
          max-width: 500px;
          border: 1px solid #c8d6e3;
          border-radius: 4px;
          overflow: hidden;
          background-color: #ffffff;
        }

        .search-box-input {
          flex-grow: 1;
          border: none;
          padding: 10px 16px;
          font-size: 0.95rem;
          outline: none;
          color: #222222;
        }

        .search-box-button {
          background-color: #e8f4f7;
          border: none;
          border-left: 1px solid #c8d6e3;
          padding: 0 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #13809c;
          transition: background-color 0.2s;
        }

        .search-box-button:hover {
          background-color: #d1e9f0;
        }

        /* Tab strip */
        .search-tabs-row {
          display: flex;
          gap: 24px;
          border-bottom: 1px solid #d2dbe5;
          margin-bottom: 24px;
          position: relative;
        }

        .search-tab-item {
          padding: 12px 4px 10px;
          background: none;
          border: none;
          font-size: 0.95rem;
          font-weight: 700;
          color: #666666;
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
        }

        .search-tab-item:hover {
          color: #13809c;
        }

        .search-tab-item.active {
          color: #13809c;
        }

        .search-tab-item.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #13809c;
        }

        /* Small caret pointer under active tab as per PrepSumit.com style */
        .search-tab-item.active::before {
          content: '';
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px 4px 0 4px;
          border-style: solid;
          border-color: #13809c transparent transparent transparent;
          z-index: 10;
        }

        /* Grid Layout */
        .search-grid-layout {
          display: grid;
          grid-template-columns: 8fr 3fr;
          gap: 40px;
        }

        .search-results-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Result item card */
        .search-result-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        /* Custom stacked-file icons */
        .search-result-icon-container {
          position: relative;
          width: 36px;
          height: 42px;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .file-back-sheet {
          position: absolute;
          top: 0;
          right: 0;
          width: 32px;
          height: 38px;
          border: 1px solid #bbc9d6;
          background-color: #f7fafc;
          border-radius: 2px;
        }

        .file-front-sheet {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 38px;
          border: 1px solid #9fb3c4;
          background-color: #ffffff;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 1px 1px 3px rgba(0,0,0,0.05);
        }

        .play-button-small {
          width: 20px;
          height: 20px;
          border: 1.5px solid #13809c;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
        }

        .lines-indicator {
          display: flex;
          flex-direction: column;
          gap: 3px;
          width: 14px;
        }

        .line-sm {
          height: 1.5px;
          background-color: #9fb3c4;
          width: 100%;
          border-radius: 1px;
        }

        .line-sm:last-child {
          width: 60%;
        }

        /* Result Details content */
        .result-content-box {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .result-title-link {
          font-size: 1.15rem;
          color: #007791;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          line-height: 1.35;
        }

        .result-title-link:hover {
          text-decoration: underline;
        }

        .result-category-breadcrumb {
          font-size: 0.78rem;
          color: #768896;
          font-weight: 700;
          margin-top: 1px;
        }

        .result-description-paragraph {
          font-size: 0.88rem;
          color: #333333;
          line-height: 1.45;
          margin: 6px 0 8px;
        }

        .result-actions-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .result-action-link {
          font-size: 0.85rem;
          color: #13809c;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          background: none;
          border: none;
          padding: 0;
        }

        .result-action-link:hover {
          text-decoration: underline;
        }

        /* Right sidebar widgets */
        .search-sidebar-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .master-subject-widget {
          background-color: #ffffff;
          border: 1px solid #d2dbe5;
          border-radius: 4px;
          padding: 24px 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .master-subject-title {
          font-size: 1.12rem;
          color: #1f4e5a;
          font-weight: 800;
          margin: 12px 0 4px 0;
        }

        .master-subject-subtitle {
          font-size: 0.82rem;
          color: #13809c;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .master-subject-btn {
          color: #13809c;
          font-size: 0.88rem;
          font-weight: 700;
          background: none;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .master-subject-btn:hover {
          text-decoration: underline;
        }

        .sidebar-view-courses-text {
          font-size: 0.85rem;
          color: #666666;
          text-align: center;
          margin-top: 12px;
        }

        .sidebar-view-courses-link {
          color: #13809c;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
        }

        .sidebar-view-courses-link:hover {
          text-decoration: underline;
        }

        /* Pagination style */
        .pagination-container-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 40px;
          border-top: 1px solid #e2e8f0;
          padding-top: 24px;
        }

        .pagination-nav-btn {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #13809c;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .pagination-nav-btn:hover:not(:disabled) {
          background-color: #f1f5f9;
        }

        .pagination-nav-btn:disabled {
          color: #94a3b8;
          border-color: #e2e8f0;
          cursor: not-allowed;
        }

        .pagination-number-btn {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #334155;
          font-size: 0.88rem;
          font-weight: 700;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pagination-number-btn:hover {
          background-color: #f1f5f9;
        }

        .pagination-number-btn.active {
          background-color: #1f4e5a;
          color: #ffffff;
          border-color: #1f4e5a;
        }

        .pagination-dots {
          color: #64748b;
          font-weight: 700;
          padding: 0 4px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .search-grid-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .search-title-main {
            font-size: 1.6rem;
          }

          .search-box-bar {
            max-width: 100%;
          }

          .search-tab-item {
            font-size: 0.85rem;
            padding: 10px 2px 8px;
          }

          .search-sidebar-box {
            order: 2; /* Move sidebar to bottom */
            margin-top: 16px;
          }

          .search-results-list {
            order: 1;
            gap: 24px;
          }

          .result-title-link {
            font-size: 1.05rem;
          }

          .result-description-paragraph {
            font-size: 0.82rem;
            margin: 4px 0 6px;
          }
        }
      `}</style>

      {/* Title */}
      <div className="search-header-container">
        <h1 className="search-title-main">
          <span>Search results for </span>{searchQuery}
        </h1>

        <form onSubmit={handleSearchSubmit} className="search-box-bar">
          <input
            type="text"
            className="search-box-input"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search Courses & Lessons"
          />
          <button type="submit" className="search-box-button" aria-label="Submit Search">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="search-tabs-row">
        {['Top Results', 'Lessons', 'Courses'].map((tab) => (
          <button
            key={tab}
            className={`search-tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="search-grid-layout">
        {/* Left Column: List */}
        <div className="search-results-list">
          {currentItems.length > 0 ? (
            currentItems.map((item) => {
              const itemHref = (() => {
                if (item.originalCourse) {
                  if (item.originalCourse.id === 'ftce-professional-education-test') return '/ftce';
                  if (item.originalCourse.id === 'teas-prep') return '/teas';
                  return `/courses/${item.originalCourse.id}`;
                }
                if (item.id === 'praxis-combined-5752' || item.id === 'praxis-math-5733') {
                  return '/courses/praxis-core';
                }
                return '/signup';
              })();
              return (
                <div key={item.id} className="search-result-item">
                  <SearchResultIcon type={item.iconType} />

                  <div className="result-content-box">
                    <a
                      href={itemHref}
                      className="result-title-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleActionClick(item.type === 'course' ? 'View Course' : 'View Chapter', item);
                      }}
                    >
                      {item.title}
                    </a>

                  {item.breadcrumb && (
                    <div className="result-category-breadcrumb">{item.breadcrumb}</div>
                  )}

                  <p className="result-description-paragraph">{item.description}</p>

                  <div className="result-actions-strip">
                    {item.actions &&
                      item.actions.map((act) => (
                        <a
                          key={act}
                          href={act === 'View Course' || act === 'View Chapter' ? itemHref : '/signup'}
                          className="result-action-link"
                          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleActionClick(act, item);
                          }}
                        >
                          {act} <ChevronRight size={12} strokeWidth={2.5} />
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: '#666666' }}>
              <AlertCircle size={40} style={{ color: '#94a3b8', marginBottom: '12px' }} />
              <h3 style={{ margin: '0 0 6px 0', color: '#1f4e5a' }}>No results found</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                We couldn't find anything matching "{searchQuery}". Try spelling it differently or search for another topic.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-container-row">
              <button
                className="pagination-nav-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {getPageNumbers().map((page, index) => {
                if (page === '...') {
                  return <span key={`dots-${index}`} className="pagination-dots">...</span>;
                }

                return (
                  <button
                    key={page}
                    className={`pagination-number-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                className="pagination-nav-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="search-sidebar-box">
          <div className="master-subject-widget">
            <CheckCircle size={44} color="#13809c" style={{ opacity: 0.9 }} />
            <h3 className="master-subject-title">Master any subject</h3>
            <p className="master-subject-subtitle">Watch short, fun videos</p>
            <a 
              href="/signup" 
              className="master-subject-btn" 
              onClick={(e) => { e.preventDefault(); onStartSignup(); }} 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Create an account <ChevronRight size={14} strokeWidth={2.5} />
            </a>
          </div>

          <div className="sidebar-view-courses-text">
            View <a href="/ftce" className="sidebar-view-courses-link" onClick={(e) => { e.preventDefault(); onSelectCourse(courses.find(c => c.id === 'ftce-professional-education-test')); }} style={{ textDecoration: 'underline', color: '#13809c', cursor: 'pointer' }}>courses</a> related to your search.
          </div>
        </div>
      </div>
    </div>
  );
}
