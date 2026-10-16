import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

const publicRoutes = [
  '/',
  '/about',
  '/how-to-join',
  '/portfolios',
  '/invite-request',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
