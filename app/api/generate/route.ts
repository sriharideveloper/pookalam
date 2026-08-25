const PROMPT = `Transform the supplied rough mandala sketch into a physically realistic Kerala pookalam made from thousands of fresh individual flower petals. Preserve the sketch's geometry and radial rhythm. If a location photo is supplied, place the pookalam naturally on that exact floor with correct perspective, scale, contact shadows and scene lighting. Use marigold yellow, saffron orange, hibiscus coral, magenta, ivory jasmine and leaf green. Kerala Onam authenticity, intricate hand-laid petal texture, tiny organic imperfections, cinematic diffused daylight, refined anime-film atmosphere but photoreal materials. No people, no text, no watermark, no plastic flowers.`;
type GeminiPart = {text:string} | {inlineData:{mimeType:string;data:string}};

const toBase64 = (buffer:ArrayBuffer) => {
  const bytes=new Uint8Array(buffer); let binary='';
  for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,Math.min(i+0x8000,bytes.length)));
  return btoa(binary);
};
const filePart = async (file:File) => ({ inlineData:{ mimeType:file.type || 'image/png', data:toBase64(await file.arrayBuffer()) } });

async function gemini(sketch:File|null, spot:File|null, style:string) {
  const parts:GeminiPart[]=[{text:`${PROMPT}\nVisual direction: ${style}.`}];
  if(sketch?.size)parts.push(await filePart(sketch)); if(spot?.size)parts.push(await filePart(spot));
  const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY!},body:JSON.stringify({contents:[{role:'user',parts}],generationConfig:{responseModalities:['IMAGE']}})});
  if(!response.ok) { const text = await response.text(); throw new Error(`Gemini ${response.status}: ${text}`); }
  const data=await response.json() as {candidates?:Array<{content?:{parts?:Array<{inlineData?:{mimeType?:string;data:string}}>} }>};
  const image=data.candidates?.[0]?.content?.parts?.find((part)=>part.inlineData)?.inlineData;
  if(!image)throw new Error('No image returned'); return `data:${image.mimeType || 'image/png'};base64,${image.data}`;
}

async function openai(sketch:File|null, spot:File|null, style:string) {
  let response:Response;
  if(sketch?.size || spot?.size){
    const body=new FormData(); body.append('model','dall-e-2');body.append('prompt',`${PROMPT}\nVisual direction: ${style}.`);body.append('size','1024x1024');body.append('response_format','b64_json');
    if(sketch?.size)body.append('image',sketch,'sketch.png');if(spot?.size)body.append('image',spot,spot.name);
    // Note: DALL-E 2 expects square images for edits/variations. If it fails, it will return a helpful error.
    // If we have both, DALL-E 2 edit API only takes one 'image' and one 'mask'. We'll just pass sketch as image if present.
    const editBody = new FormData(); editBody.append('model','dall-e-2');editBody.append('prompt',`${PROMPT}\nVisual direction: ${style}.`);editBody.append('size','1024x1024');editBody.append('response_format','b64_json');
    if (sketch?.size) editBody.append('image', sketch, 'sketch.png');
    else if (spot?.size) editBody.append('image', spot, spot.name);
    
    response=await fetch('https://api.openai.com/v1/images/edits',{method:'POST',headers:{authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:editBody});
  } else {
    response=await fetch('https://api.openai.com/v1/images/generations',{method:'POST',headers:{authorization:`Bearer ${process.env.OPENAI_API_KEY}`,'content-type':'application/json'},body:JSON.stringify({model:'dall-e-3',prompt:`${PROMPT}\nVisual direction: ${style}.`,size:'1024x1024',quality:'standard',response_format:'b64_json'})});
  }
  if(!response.ok) { const text = await response.text(); throw new Error(`OpenAI ${response.status}: ${text}`); }
  const data=await response.json() as {data?:Array<{b64_json?:string}>};const image=data.data?.[0]?.b64_json;if(!image)throw new Error('No image returned');return `data:image/png;base64,${image}`;
}

export async function POST(request:Request){
  try{
    const form=await request.formData();const sketch=form.get('sketch') as File|null;const spot=form.get('spot') as File|null;const style=String(form.get('style')||'Classic Kerala');
    
    if(process.env.GEMINI_API_KEY)return Response.json({image:await gemini(sketch,spot,style),provider:'Nano Banana 2'});
    if(process.env.OPENAI_API_KEY)return Response.json({image:await openai(sketch,spot,style),provider:'OpenAI'});
    
    return Response.json({image:'/images/heavenly-pookalam.png',provider:'demo',demo:true});
  }catch(error){return Response.json({error:error instanceof Error?error.message:'Generation failed'},{status:502});}
}
