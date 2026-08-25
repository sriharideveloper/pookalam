export async function POST(request:Request){
  try{
    const payload=await request.json() as {title?:string;image?:string;style?:string;author_name?:string};const base=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
    if(!base||!key)return Response.json({id:`demo-${Date.now()}`,demo:true});
    const bucket=process.env.SUPABASE_BUCKET||'pookalams';let imageUrl=String(payload.image||'');
    const match=imageUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,(.+)$/);
    if(match){
      const bytes=Uint8Array.from(atob(match[2]),(char)=>char.charCodeAt(0));const extension=match[1].split('/')[1].replace('jpeg','jpg');const fileName=`${crypto.randomUUID()}.${extension}`;
      const upload=await fetch(`${base}/storage/v1/object/${bucket}/${fileName}`,{method:'POST',headers:{apikey:key,authorization:`Bearer ${key}`,'content-type':match[1],'x-upsert':'false'},body:bytes});
      if(!upload.ok)throw new Error(`Supabase Storage ${upload.status}`);imageUrl=`${base}/storage/v1/object/public/${bucket}/${fileName}`;
    }else if(imageUrl.startsWith('/'))imageUrl=new URL(imageUrl,request.url).toString();
    const record={title:String(payload.title||'Untitled Pookalam').slice(0,80),image_url:imageUrl,style:String(payload.style||'Classic Kerala').slice(0,40),author_name:String(payload.author_name||'Poovili Artist').slice(0,60),likes:0,published:true};
    const response=await fetch(`${base}/rest/v1/pookalams`,{method:'POST',headers:{apikey:key,authorization:`Bearer ${key}`,'content-type':'application/json',prefer:'return=representation'},body:JSON.stringify(record)});
    if(!response.ok)throw new Error(`Supabase ${response.status}`);const rows=await response.json() as Array<Record<string,unknown>>;return Response.json(rows[0]||record);
  }catch(error){return Response.json({error:error instanceof Error?error.message:'Publish failed'},{status:502});}
}
