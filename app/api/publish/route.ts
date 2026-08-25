export async function POST(request:Request){
  try{
    const payload=await request.json();const base=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
    if(!base||!key)return Response.json({id:`demo-${Date.now()}`,demo:true});
    const record={title:String(payload.title||'Untitled Pookalam').slice(0,80),image_url:String(payload.image||''),style:String(payload.style||'Classic Kerala'),likes:0,published:true};
    const response=await fetch(`${base}/rest/v1/pookalams`,{method:'POST',headers:{apikey:key,authorization:`Bearer ${key}`,'content-type':'application/json',prefer:'return=representation'},body:JSON.stringify(record)});
    if(!response.ok)throw new Error(`Supabase ${response.status}`);const rows=await response.json();return Response.json(rows[0]||record);
  }catch(error){return Response.json({error:error instanceof Error?error.message:'Publish failed'},{status:502});}
}
