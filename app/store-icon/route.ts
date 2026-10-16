export const dynamic='force-dynamic';
export async function GET(){
  try{
    const response=await fetch((process.env.API_INTERNAL_URL||'http://127.0.0.1:5000')+'/api/v1/storefront/settings',{cache:'no-store',signal:AbortSignal.timeout(5000)});
    if(response.ok){const {data}=await response.json();if(data?.favicon&&(/^\/api\/v1\/media\/[a-f0-9-]+\.(png|jpg|webp)$/.test(data.favicon)||/^https?:\/\//.test(data.favicon)))return new Response(null,{status:302,headers:{Location:data.favicon,'Cache-Control':'no-store'}})}
  }catch{}
  return new Response('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#080820"/><text x="32" y="42" text-anchor="middle" font-size="28" fill="#cba768" font-family="sans-serif">NH</text></svg>',{headers:{'Content-Type':'image/svg+xml','Cache-Control':'no-store'}});
}
