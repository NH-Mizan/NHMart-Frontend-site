'use client';
import Link from 'next/link';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import { WebsiteShell } from '../../components/website/website-shell';
import { ProductCard } from '../../components/website/product-card';
import { api,errorMessage } from '../../lib/api';
import { useAuthStore } from '../../stores/auth-store';
import type { Product } from '../../lib/types';
export default function Wishlist(){const{user,hydrated}=useAuthStore();const qc=useQueryClient();const list=useQuery({queryKey:['wishlist',user?.id],enabled:!!user,queryFn:async()=>(await api.get('/customer/wishlist')).data.data as {product:Product}[]});const remove=useMutation({mutationFn:(id:string)=>api.delete('/customer/wishlist/'+id),onSuccess:()=>qc.invalidateQueries({queryKey:['wishlist']})});return <WebsiteShell><section className="store-page"><div className="store-page-title"><span className="home-kicker">SAVED FOR LATER</span><h1>Your wishlist</h1></div>{!hydrated||list.isLoading?<p>Loading…</p>:!user?<div className="empty-state"><p>Sign in to save your favourite products.</p><Link className="primary-cta" href="/account/login">Sign in</Link></div>:list.error?<p className="notice error">{errorMessage(list.error)}</p>:!list.data?.length?<div className="empty-state"><p>Your wishlist is empty.</p><Link className="primary-cta" href="/products">Explore products</Link></div>:<div className="product-grid">{list.data.map(({product})=><div key={product.id}><ProductCard product={product}/><button className="text-cta" disabled={remove.isPending} onClick={()=>remove.mutate(product.id)}>Remove</button></div>)}</div>}{remove.error&&<p className="notice error">{errorMessage(remove.error)}</p>}</section></WebsiteShell>}
