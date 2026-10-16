import { WebsiteShell } from '../../../components/website/website-shell';
import { ProductDetails } from '../../../components/website/product-details';
import type { Metadata } from 'next';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params;try{const response=await fetch((process.env.API_INTERNAL_URL||'http://127.0.0.1:5000')+'/api/v1/storefront/products/'+encodeURIComponent(slug),{cache:'no-store'});if(response.ok){const{data}=await response.json();return{title:(data.metaTitle||data.name)+' | NH Mart',description:data.metaDescription||data.shortDescription||undefined}}}catch{}return{title:'Product | NH Mart'}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <WebsiteShell><ProductDetails slug={slug}/></WebsiteShell>}
