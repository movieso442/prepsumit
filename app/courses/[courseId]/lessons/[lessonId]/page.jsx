import LessonClientPage from './LessonClientPage';
import { coursesData } from '@/src/data/courses';

export async function generateStaticParams() {
  return coursesData.flatMap((course) => {
    if (!course.lessons) return [];
    return course.lessons.map((lesson) => ({
      courseId: course.id,
      lessonId: lesson.id,
    }));
  });
}

export async function generateMetadata({ params }) {
  const { courseId, lessonId } = await params;
  const course = coursesData.find(c => c.id.toLowerCase() === courseId.toLowerCase());
  const lesson = course?.lessons?.find(l => l.id.toLowerCase() === lessonId.toLowerCase());

  if (!course || !lesson) {
    return {
      title: "Lesson Not Found | PrepSumit",
      description: "We couldn't locate the requested lesson page on PrepSumit.",
    };
  }

  const title = `${lesson.title} - ${course.title} Lesson | PrepSumit`;
  const description = `Learn ${lesson.title} in the ${course.title} study guide. PrepSumit provides visual micro-lessons and practice questions.`;
  const canonical = `https://prepsumit.com/courses/${course.id}/lessons/${lesson.id}`;

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
          alt: `${lesson.title} | PrepSumit`
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

export default function LessonDetailPage() {
  return <LessonClientPage />;
}
