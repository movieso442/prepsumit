export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/checkout', '/api/'],
    },
    sitemap: 'https://prepsumit.com/sitemap.xml',
  };
}
