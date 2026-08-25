import type { Metadata } from 'next';
import { Instrument_Serif, Noto_Serif_Malayalam, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const instrument = Instrument_Serif({ variable: '--font-instrument', subsets: ['latin'], weight: ['400'], style: ['normal', 'italic'] });
const malayalam = Noto_Serif_Malayalam({ variable: '--font-malayalam', subsets: ['malayalam'], weight: ['400', '600'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://poovili-ai-pookalam.sriharimuralikrishna.chatgpt.site'),
  title: { default:'Poovili — AI Pookalam Studio', template:'%s · Poovili' },
  description: 'Rough aayi draw cheyyu. AI use cheythu next-level realistic Kerala pookalam create, place, publish, and share cheyyu.',
  keywords: ['AI pookalam generator','Onam pookalam design','Kerala flower rangoli','pookalam ideas','Malayalam AI'],
  openGraph: { title:'Poovili — Ninte imagination, poovayi viriyatte', description:'Sketch, place, and bloom a realistic pookalam with AI.', images:[{url:'/og.png',width:1536,height:1024,alt:'Poovili realistic pookalam in a Kerala courtyard'}],type:'website' },
  twitter: { card:'summary_large_image', title:'Poovili — AI Pookalam Studio', description:'Oru line-il ninnu, oru lokam vare.', images:['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ml"><body className={`${poppins.variable} ${instrument.variable} ${malayalam.variable}`}>{children}</body></html>;
}
