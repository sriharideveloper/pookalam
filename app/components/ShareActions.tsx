'use client';

import { useState } from 'react';

const SHARE_COPY = 'Ninte imagination poovayi viriyatte 🌼 Poovili-il AI pookalam create cheyyu.';

export default function ShareActions({compact=false,floating=false}:{compact?:boolean;floating?:boolean}) {
  const [copied,setCopied]=useState(false);
  const pageUrl=()=>window.location.origin;
  const open=(url:string)=>window.open(url,'_blank','noopener,noreferrer');
  const whatsApp=()=>open(`https://wa.me/?text=${encodeURIComponent(`${SHARE_COPY} ${pageUrl()}`)}`);
  const twitter=()=>open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_COPY)}&url=${encodeURIComponent(pageUrl())}&hashtags=Poovili,Onam,Pookalam`);
  const copy=async()=>{await navigator.clipboard.writeText(pageUrl());setCopied(true);window.setTimeout(()=>setCopied(false),1800)};
  return <div className={`share-actions ${compact?'compact':''} ${floating?'floating':''}`} aria-label="Share Poovili">
    {!floating&&<span>Share your bloom</span>}
    <button type="button" className="share-whatsapp" onClick={whatsApp} aria-label="Share on WhatsApp"><b>WA</b>{!floating&&'WhatsApp'}</button>
    <button type="button" className="share-twitter" onClick={twitter} aria-label="Share on X"><b>𝕏</b>{!floating&&'Share'}</button>
    <button type="button" className="share-copy" onClick={copy} aria-label="Copy website link"><b>{copied?'✓':'↗'}</b>{!floating&&(copied?'Copied':'Copy link')}</button>
  </div>;
}
