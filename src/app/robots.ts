import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/management/', '/auth/sign-in/', '/auth/sign-up/'],
    },
    sitemap: 'https://habituate-duardodev.vercel.app/sitemap.xml',
  };
}
