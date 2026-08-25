import type { MetadataRoute } from 'next';
const base=process.env.NEXT_PUBLIC_SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'https://pookalam-six.vercel.app');
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:'*',allow:'/',disallow:['/api/']},sitemap:`${base}/sitemap.xml`,host:base}}
