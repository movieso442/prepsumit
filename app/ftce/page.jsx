import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers,
  LogIn,
  MapPin,
  Sparkles,
} from 'lucide-react';
import JsonLd from '@/src/components/seo/JsonLd';

const pageUrl = 'https://prepsumit.com/ftce';
const pageTitle = 'FTCE Practice Test & Study Guide for Florida Teachers | PrepSumit';
const pageDescription =
  'Prepare for the Florida Teacher Certification Examinations with PrepSumit. Practice FTCE questions, review study guides, use flashcards, and build a smarter study plan for your teaching certification exam.';
const ogImage = 'https://prepsumit.com/og-image.png';

const studyOptions = [
  'FTCE General Knowledge',
  'FTCE Professional Education',
  'FTCE Elementary Education K-6',
  'FTCE Subject Area Exams',
  'Practice questions',
  'Flashcards',
  'Study outlines',
];

const supportCards = [
  {
    icon: ClipboardCheck,
    title: 'Practice questions',
    text: 'Work through focused FTCE-style questions and review explanations so every answer becomes a study signal.',
  },
  {
    icon: FileText,
    title: 'Study guides',
    text: 'Use clear topic outlines to organize what to review for General Knowledge, Professional Education, and subject exams.',
  },
  {
    icon: Brain,
    title: 'Flashcards',
    text: 'Review terms, classroom practices, instructional strategies, and exam vocabulary in short study sessions.',
  },
  {
    icon: Layers,
    title: 'Study plans',
    text: 'Turn weak areas into a practical daily routine that helps you keep studying with purpose.',
  },
];

const studySteps = [
  'Diagnostic quiz',
  'Review weak topics',
  'Practice daily',
  'Track progress',
  'Repeat before exam day',
];

const faqs = [
  {
    question: 'What is the FTCE?',
    answer:
      'The FTCE, or Florida Teacher Certification Examinations, is a group of exams used in Florida teacher certification. Depending on your path, you may need General Knowledge, Professional Education, or Subject Area Exam preparation.',
  },
  {
    question: 'Which FTCE exams can I prepare for on PrepSumit?',
    answer:
      'PrepSumit helps candidates study for major FTCE areas, including General Knowledge, Professional Education, Elementary Education K-6, and Subject Area Exams through practice questions, study outlines, flashcards, and guided review.',
  },
  {
    question: 'Does PrepSumit offer FTCE practice questions?',
    answer:
      'Yes. PrepSumit includes FTCE practice questions designed to help you check understanding, identify weak areas, and continue with focused review before exam day.',
  },
  {
    question: 'Can I study for FTCE General Knowledge?',
    answer:
      'Yes. FTCE General Knowledge preparation is part of the study areas covered on PrepSumit, along with Professional Education, Elementary Education K-6, and Subject Area Exam support.',
  },
  {
    question: 'How should I start preparing for the FTCE?',
    answer:
      'Start with a diagnostic quiz or sample practice questions, review the topics you miss, study a focused guide, practice a little each day, and repeat review cycles before your scheduled exam.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://prepsumit.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'FTCE Practice Test & Study Guide',
      item: pageUrl,
    },
  ],
};

export const metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: 'PrepSumit',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'FTCE practice test and study guide from PrepSumit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FtcePage() {
  return (
    <>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={breadcrumbSchema} />

      <article className="ftce-landing">
        <section className="ftce-hero" aria-labelledby="ftce-hero-title">
          <Image
            className="ftce-hero-bg-image"
            src="/images/ftce-prep-illustration.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="ftce-hero-overlay" aria-hidden="true" />
          <div className="ftce-container ftce-hero-grid">
            <div className="ftce-hero-copy">
              <nav className="ftce-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <span>FTCE</span>
              </nav>

              <p className="ftce-eyebrow">
                <MapPin size={16} aria-hidden="true" />
                Florida teacher certification preparation
              </p>

              <h1 id="ftce-hero-title">
                FTCE Practice Test & Study Guide for Florida Teachers
              </h1>

              <p className="ftce-hero-text">
                PrepSumit helps Florida teacher candidates prepare for the FTCE with practice
                questions, study guides, quizzes, flashcards, and focused study plans.
              </p>

              <div className="ftce-hero-actions" aria-label="FTCE primary actions">
                <Link className="ftce-button ftce-button-primary" href="/signup?exam=FTCE">
                  Start Free FTCE Practice
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <a className="ftce-button ftce-button-secondary" href="#study-guide">
                  View Study Guide
                  <BookOpen size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="ftce-section" aria-labelledby="ftce-study-options">
          <div className="ftce-container">
            <div className="ftce-section-heading">
              <p className="ftce-kicker">What you can study</p>
              <h2 id="ftce-study-options">FTCE prep organized around the work ahead</h2>
              <p>
                Use PrepSumit to move from broad exam awareness into practical study sessions
                built around questions, flashcards, outlines, and review.
              </p>
            </div>

            <div className="ftce-study-list" aria-label="FTCE study areas and tools">
              {studyOptions.map((option) => (
                <div className="ftce-study-item" key={option}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{option}</span>
                </div>
              ))}
            </div>

            <div className="ftce-tool-grid">
              {supportCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div className="ftce-tool-card" key={card.title}>
                    <div className="ftce-tool-icon">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ftce-section ftce-free-practice" aria-labelledby="free-practice-heading">
          <div className="ftce-container ftce-split">
            <div>
              <p className="ftce-kicker">Free practice</p>
              <h2 id="free-practice-heading">Start With a Free FTCE Practice Quiz</h2>
              <p>
                Begin with sample questions to see what feels strong and what needs more review.
                After the quiz, use your weak areas to keep studying with guided FTCE outlines,
                short review sessions, and targeted practice.
              </p>
            </div>
            <Link className="ftce-button ftce-button-primary" href="/signup?exam=FTCE">
              Take Free FTCE Quiz
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="ftce-section" id="study-guide" aria-labelledby="study-guide-heading">
          <div className="ftce-container ftce-guide-grid">
            <div className="ftce-guide-main">
              <p className="ftce-kicker">Study guide</p>
              <h2 id="study-guide-heading">FTCE Study Guide for Florida Teacher Candidates</h2>

              <div className="ftce-guide-block">
                <h3>What is the FTCE?</h3>
                <p>
                  The Florida Teacher Certification Examinations are used to help evaluate
                  whether teacher candidates have the knowledge and skills required for
                  certification in Florida. The exams may include General Knowledge,
                  Professional Education, and subject-specific requirements.
                </p>
              </div>

              <div className="ftce-guide-block">
                <h3>Who takes the FTCE?</h3>
                <p>
                  FTCE exams are commonly taken by Florida teacher candidates, education
                  program students, career changers entering teaching, and educators adding
                  certification areas.
                </p>
              </div>

              <div className="ftce-guide-block">
                <h3>How PrepSumit helps with FTCE preparation</h3>
                <p>
                  PrepSumit gives you a simple way to review exam topics, answer practice
                  questions, study with flashcards, and turn confusing areas into a focused
                  study plan before test day.
                </p>
              </div>
            </div>

            <aside className="ftce-study-plan" aria-labelledby="study-approach-heading">
              <div className="ftce-plan-icon">
                <GraduationCap size={26} aria-hidden="true" />
              </div>
              <h3 id="study-approach-heading">Suggested study approach</h3>
              <ol>
                {studySteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        <section className="ftce-section ftce-florida" aria-labelledby="florida-heading">
          <div className="ftce-container ftce-florida-inner">
            <div>
              <p className="ftce-kicker">Florida focus</p>
              <h2 id="florida-heading">Built for Florida Teacher Certification Preparation</h2>
              <p>
                PrepSumit is built for Florida teacher candidates who need a clear, organized
                way to prepare for certification exams while balancing coursework, classroom
                responsibilities, work, and family schedules.
              </p>
            </div>
            <div className="ftce-florida-note">
              <Sparkles size={22} aria-hidden="true" />
              <span>
                Study with a focused path for FTCE General Knowledge, Professional Education,
                Elementary Education K-6, and subject area review.
              </span>
            </div>
          </div>
        </section>

        <section className="ftce-section" aria-labelledby="ftce-faq-heading">
          <div className="ftce-container ftce-faq-wrap">
            <div className="ftce-section-heading">
              <p className="ftce-kicker">FAQ</p>
              <h2 id="ftce-faq-heading">FTCE Practice Test FAQs</h2>
            </div>

            <div className="ftce-faq-list">
              {faqs.map((faq) => (
                <section className="ftce-faq-item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="ftce-section ftce-internal-links" aria-labelledby="prep-links-heading">
          <div className="ftce-container">
            <h2 id="prep-links-heading">Explore PrepSumit</h2>
            <div className="ftce-link-grid">
              <Link href="/">
                PrepSumit homepage
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/praxis">
                Praxis practice and study guide
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/signup">
                Create a free account
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/login">
                <LogIn size={16} aria-hidden="true" />
                Log in
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
