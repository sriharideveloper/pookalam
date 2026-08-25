'use client';

import { ChangeEvent, PointerEvent, useEffect, useRef, useState } from 'react';
import ShareActions from './ShareActions';

const colors = ['#e85d45', '#f0bf42', '#d63b78', '#397452', '#f0933f', '#f7e7b1'];

export default function Studio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(9);
  const [symmetry, setSymmetry] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [last, setLast] = useState<{x:number;y:number} | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [spot, setSpot] = useState<{file:File;url:string} | null>(null);
  const [result, setResult] = useState('/images/heavenly-pookalam.png');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle'|'working'|'published'|'demo'|'error'>('idle');
  const [style, setStyle] = useState('Classic Kerala');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let isFirst = true;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      let snapshot = canvas.width ? canvas.toDataURL() : '';
      if (isFirst) {
        try { const saved = localStorage.getItem('pookalam_sketch'); if (saved) snapshot = saved; } catch (e) {}
      }
      isFirst = false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      if (snapshot) {
        const image = new Image(); image.onload = () => {
          ctx?.drawImage(image, 0, 0, rect.width, rect.height);
          setHistory((h) => h.length ? h : [snapshot]);
        }; image.src = snapshot;
      }
    };
    resize(); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);
  }, []);

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x:event.clientX - rect.left, y:event.clientY - rect.top };
  };

  const drawSegment = (from:{x:number;y:number}, to:{x:number;y:number}) => {
    const canvas = canvasRef.current; const ctx = canvas?.getContext('2d'); if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect(); const cx = rect.width / 2; const cy = rect.height / 2;
    const turns = symmetry ? 10 : 1;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.lineWidth = size;
    for (let i=0;i<turns;i++) {
      const angle = i * Math.PI * 2 / turns;
      const rotate = (p:{x:number;y:number}, mirror=false) => {
        const px = mirror ? -(p.x-cx) : p.x-cx; const py = p.y-cy;
        return {x:cx + px*Math.cos(angle)-py*Math.sin(angle), y:cy + px*Math.sin(angle)+py*Math.cos(angle)};
      };
      [false, ...(symmetry ? [true] : [])].forEach((mirror) => {
        const a=rotate(from, mirror); const b=rotate(to, mirror); ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      });
    }
  };

  const saveToStorage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      try { localStorage.setItem('pookalam_sketch', canvas.toDataURL()); } catch (e) {}
    }
  };

  const begin = (event:PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const snapshot = event.currentTarget.toDataURL();
    setHistory((items) => [...items.slice(-9), snapshot]);
    const p=point(event); setLast(p); setDrawing(true); drawSegment(p,{x:p.x+.1,y:p.y+.1});
  };
  const move = (event:PointerEvent<HTMLCanvasElement>) => { if (!drawing || !last) return; const next=point(event); drawSegment(last,next);setLast(next); };
  const end = () => { setDrawing(false); setLast(null); saveToStorage(); };
  const clear = () => { const c=canvasRef.current; c?.getContext('2d')?.clearRect(0,0,c.width,c.height); setHistory([]); try { localStorage.removeItem('pookalam_sketch'); } catch (e) {} };
  const undo = () => {
    const canvas=canvasRef.current; const previous=history.at(-1); if(!canvas||!previous)return;
    const ctx=canvas.getContext('2d'); const image=new Image(); image.onload=()=>{ctx?.clearRect(0,0,canvas.width,canvas.height);ctx?.drawImage(image,0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height); saveToStorage();};image.src=previous;setHistory((h)=>h.slice(0,-1));
  };
  const onSpot = (event:ChangeEvent<HTMLInputElement>) => { const file=event.target.files?.[0]; if(file)setSpot({file,url:URL.createObjectURL(file)}); };
  const generate = async () => {
    setGenerating(true); setGenerated(false); setPublishStatus('idle');
    try {
      const canvas=canvasRef.current; const form=new FormData();
      if(canvas) { const blob=await new Promise<Blob|null>((resolve)=>canvas.toBlob(resolve,'image/png')); if(blob)form.append('sketch',blob,'sketch.png'); }
      if(spot) form.append('spot',spot.file); form.append('style',style);
      const response=await fetch('/api/generate',{method:'POST',body:form});
      if(response.ok){const data=await response.json() as {image?:string};if(data.image)setResult(data.image);}
      else {
        const err = await response.json().catch(()=>({}));
        alert(`API Error: ${err.error || response.statusText}`);
      }
    } catch (e) { alert(`Network error: ${e instanceof Error ? e.message : 'Unknown'}`); }
    setGenerated(true); setGenerating(false);
  };
  const publish = async () => {
    setPublishStatus('working');
    try {
      const response=await fetch('/api/publish',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({title:'Ente Onam Bloom',image:result,style})});
      if(!response.ok)throw new Error('Publish failed');const data=await response.json() as {demo?:boolean};setPublishStatus(data.demo?'demo':'published');
    } catch { setPublishStatus('error'); }
  };

  return (
    <div className="creator-grid">
      <div className="creator-card draw-card">
        <div className="card-heading"><div><span className="mini-label">01 · DRAWBOARD</span><h3>Manassil ullathu varaykku.</h3></div><span className="status-dot">Live canvas</span></div>
        <div className="canvas-wrap">
          <div className="canvas-toolbar">
            <button onClick={undo} aria-label="Undo last stroke">↶</button><button onClick={clear} aria-label="Clear canvas">⌫</button><i />
            <label className="symmetry-toggle"><input type="checkbox" checked={symmetry} onChange={(e)=>setSymmetry(e.target.checked)} /><span>✦</span> Mandala mirror</label>
          </div>
          <canvas ref={canvasRef} onPointerDown={begin} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label="Pookalam sketch canvas" />
          {!history.length && <div className="canvas-empty"><b>✿</b><span>Ivde draw cheyyu</span><small>One petal becomes a full mandala</small></div>}
        </div>
        <div className="brush-controls">
          <div className="palette-row">{colors.map((item)=><button key={item} aria-label={`Use ${item}`} className={color===item?'selected':''} style={{background:item}} onClick={()=>setColor(item)} />)}</div>
          <label>Brush <input type="range" min="3" max="24" value={size} onChange={(e)=>setSize(Number(e.target.value))} /></label>
        </div>
      </div>

      <div className="creator-side">
        <div className="creator-card upload-card">
          <div><span className="mini-label">02 · OPTIONAL</span><h3>Ninte space kaanikkamo?</h3><p>Floor, courtyard, office — evide pookalam venam ennu oru photo upload cheyyu.</p></div>
          <label className={`upload-zone ${spot?'has-photo':''}`} style={spot?{backgroundImage:`linear-gradient(rgba(25,45,30,.08),rgba(25,45,30,.35)),url(${spot.url})`}:{}}>
            <input type="file" accept="image/*" onChange={onSpot} /><span>{spot?'Photo ready ✓':'＋'}</span><b>{spot?spot.file.name:'Choose a spot photo'}</b><small>{spot?'Tap to replace':'JPG, PNG · max 10 MB'}</small>
          </label>
        </div>
        <div className="creator-card magic-card">
          <div className="card-heading"><div><span className="mini-label">03 · AI MAGIC</span><h3>Poovayi viriyatte.</h3></div><span className="provider-pill">Auto model</span></div>
          <div className="style-chips">{['Classic Kerala','Anime dream','Royal atham'].map((item)=><button key={item} className={style===item?'active':''} onClick={()=>setStyle(item)}>{item}</button>)}</div>
          <button className="generate-button" onClick={generate} disabled={generating}><span>{generating?'Petals arranging...':'Generate my pookalam'}</span><b>{generating?<i className="spinner"/>:'✦'}</b></button>
          <p className="model-note"><i /> Nano Banana or OpenAI — whichever is ready, automatically.</p>
        </div>
      </div>

      {(generating || generated) && <div className="result-stage" aria-live="polite">
        <div className="result-copy"><span className="mini-label">YOUR BLOOM</span><h3>{generating?'Oro poovum place cheyyunnu...':'Ithaanu ninte pookalam.'}</h3><p>{generating?'Geometry, petals, light — ellam ninte sketch-ne follow cheythu varunnu.':'Zoom cheyyu, share cheyyu, allel community-il publish cheyyu.'}</p>{generated&&<><div className="result-actions"><button onClick={publish} disabled={publishStatus==='working'}>{publishStatus==='working'?'Publishing...':'Publish to Explore ↗'}</button><a href={result} download="ente-pookalam.png">Download ↓</a></div><ShareActions compact /></>}{publishStatus==='published'&&<div className="publish-toast">✦ Published with sneham! Explorer-il live aanu.</div>}{publishStatus==='demo'&&<div className="publish-toast">✦ Demo publish ready. Supabase keys add cheythal public aakum.</div>}{publishStatus==='error'&&<div className="publish-toast error">Publish pattiyilla — keys and schema onn check cheyyu.</div>}</div>
        <div className={`result-image ${generating?'is-generating':''}`}><img src={result} alt="Generated realistic Kerala pookalam in a sunlit courtyard" /><div className="scan-line" /><span className="result-badge">{generating?'AI BLOOMING':'HIGH DETAIL · READY'}</span></div>
      </div>}
    </div>
  );
}
