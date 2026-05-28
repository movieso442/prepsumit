import { coursesData } from '@/src/data/courses';

export default async function sitemap() {
  const baseUrl = 'https://prepsumit.com';

  // Static routes
  const staticPaths = [
    '',
    '/ftce',
    '/praxis',
    '/pricing',
    '/catalog',
    '/signup',
    '/login',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-use',
    '/teas',
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : (path === '/ftce' || path === '/praxis' ? 0.98 : (path === '/pricing' ? 0.9 : (path === '/privacy-policy' || path === '/terms-of-use' ? 0.5 : 0.7))),
  }));

  // Dynamic course routes
  const courseUrls = coursesData.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: course.id === 'ftce-professional-education-test' || course.id === 'teas-prep' ? 0.98 : 0.75,
  }));

  // Dynamic lesson routes
  const lessonUrls = coursesData.flatMap((course) => {
    if (!course.lessons) return [];
    return course.lessons.map((lesson) => ({
      url: `${baseUrl}/courses/${course.id}/lessons/${lesson.id}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  });

  return [...staticUrls, ...courseUrls, ...lessonUrls];
}
