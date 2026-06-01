import CourseClientPage from './CourseClientPage';
import { coursesData } from '@/src/data/courses';

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    courseId: course.id,
  }));
}

export async function generateMetadata({ params }) {
  const { courseId } = await params;
  const course = coursesData.find(c => c.id.toLowerCase() === courseId.toLowerCase());

  if (!course) {
    return {
      title: "Course Not Found | PrepSumit",
      description: "We couldn't locate the requested course page on PrepSumit.",
    };
  }

  const title = `${course.title} Study Guide & Course | PrepSumit`;
  const description = `Prepare for the ${course.title} with PrepSumit. Access visual micro-lessons, practice quizzes, and custom study guides for exam success.`;
  const canonical = `https://prepsumit.com/courses/${course.id}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "PrepSumit",
      type: "website",
      images: [
        {
          url: "https://prepsumit.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `${course.title} | PrepSumit`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://prepsumit.com/og-image.png"],
    }
  };
}

export default function CourseDetailPage() {
  return <CourseClientPage />;
}
