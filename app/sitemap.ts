import type { MetadataRoute } from 'next';
const base=process.env.NEXT_PUBLIC_SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'https://pookalam-six.vercel.app');
export default function sitemap():MetadataRoute.Sitemap{return[{url:base,lastModified:new Date(),changeFrequency:'weekly',priority:1}]}
