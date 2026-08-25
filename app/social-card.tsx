/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const logoData=`data:image/png;base64,${readFileSync(join(process.cwd(),'public','images','poovili-logo.png')).toString('base64')}`;

export const socialAlt='Poovili — Ninte imagination, poovayi viriyatte. AI Pookalam Studio.';
export const socialSize={width:1200,height:630};
export const socialContentType='image/png';

export function createSocialCard(){
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',position:'relative',overflow:'hidden',background:'linear-gradient(125deg,#fff1a9 0%,#ffd5cc 43%,#d8efd4 72%,#d7eaf2 100%)',color:'#263b2d',fontFamily:'serif'}}>
    <div style={{position:'absolute',width:520,height:520,borderRadius:999,right:-80,top:56,background:'linear-gradient(145deg,rgba(229,47,118,.28),rgba(246,174,37,.36),rgba(46,151,105,.26))',filter:'blur(30px)'}} />
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'68px 0 62px 78px',width:'64%'}}>
      <div style={{display:'flex',alignItems:'center',gap:18,fontFamily:'sans-serif',fontWeight:700,fontSize:24}}><img src={logoData} style={{width:68,height:68}} />Poovili</div>
      <div style={{display:'flex',flexDirection:'column',fontSize:58,lineHeight:.98,letterSpacing:'-2px',marginTop:36}}><div style={{display:'flex'}}>Ninte imagination,</div><div style={{display:'flex',color:'#d72d70'}}>poovayi viriyatte.</div></div>
      <div style={{display:'flex',fontFamily:'sans-serif',fontSize:22,marginTop:32,color:'#526457'}}>Sketch · Place · Bloom with AI</div>
      <div style={{display:'flex',fontFamily:'sans-serif',fontSize:17,marginTop:18,padding:'11px 17px',borderRadius:999,background:'rgba(255,255,255,.62)',width:420}}>AI POOKALAM STUDIO · MADE WITH SNEHAM</div>
    </div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'36%'}}><img src={logoData} style={{width:350,height:350,filter:'drop-shadow(0 28px 30px rgba(81,49,34,.22))'}} /></div>
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:18,background:'linear-gradient(90deg,#ef9e28,#e84755,#d72d7d,#369364,#50a7b5)'}} />
  </div>,socialSize);
}
