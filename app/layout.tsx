import type { Metadata } from 'next';
import { Instrument_Serif, Noto_Serif_Malayalam, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const instrument = Instrument_Serif({ variable: '--font-instrument', subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'] });
const malayalam = Noto_Serif_Malayalam({ variable: '--font-malayalam', subsets: ['malayalam'], weight: ['400', '600'] });
const productionUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://poovili-ai-pookalam.sriharimuralikrishna.chatgpt.site');

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: { default:'Poovili — AI Pookalam Studio', template:'%s · Poovili' },
  description: 'Rough aayi draw cheyyu. AI use cheythu next-level realistic Kerala pookalam create, place, publish, and share cheyyu.',
  keywords: ['AI pookalam generator','Onam pookalam design','Kerala flower rangoli','pookalam ideas','Malayalam AI'],
  applicationName:'Poovili',
  authors:[{name:'Poovili'}], creator:'Poovili', publisher:'Poovili', category:'Design',
  alternates:{canonical:'/'},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
  icons:{icon:'/images/poovili-logo.png',shortcut:'/images/poovili-logo.png',apple:'/images/poovili-logo.png'},
  manifest:'/manifest.webmanifest',
  openGraph: { title:'Poovili — Ninte imagination, poovayi viriyatte', description:'Sketch, place, and bloom a realistic Kerala pookalam with AI.',url:'/',siteName:'Poovili',locale:'ml_IN',alternateLocale:['en_IN'],type:'website' },
  twitter: { card:'summary_large_image', title:'Poovili — AI Pookalam Studio', description:'Oru line-il ninnu, oru lokam vare.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData={
    '@context':'https://schema.org','@type':'WebApplication',name:'Poovili',url:productionUrl,
    description:'AI-powered Kerala pookalam sketching, placement and publishing studio.',
    applicationCategory:'DesignApplication',operatingSystem:'Web',inLanguage:['ml','en-IN'],
    image:`${productionUrl}/opengraph-image`,logo:`${productionUrl}/images/poovili-logo.png`,
    offers:{'@type':'Offer',price:'0',priceCurrency:'INR'},
  };
  return <html lang="ml"><body className={`${poppins.variable} ${instrument.variable} ${malayalam.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />{children}</body></html>;
}
