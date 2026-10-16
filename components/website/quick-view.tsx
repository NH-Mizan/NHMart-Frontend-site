'use client';
import Link from 'next/link';
import {useEffect,useId,useRef,useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Package,X} from 'lucide-react';
import {api,errorMessage} from '../../lib/api';
import {Product} from '../../lib/types';
import {ProductDetailsSkeleton} from '../ui/skeleton';
import {ProductPurchase} from './product-purchase';

export function QuickView({slug,onClose}:{slug:string;onClose:()=>void}){
  const dialog=useRef<HTMLDialogElement>(null),title=useId();const[image,setImage]=useState(0);
  const query=useQuery({queryKey:['product',slug],queryFn:async()=>(await api.get('/storefront/products/'+encodeURIComponent(slug))).data.data as Product});
  useEffect(()=>{const element=dialog.current,previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;element?.showModal();document.body.style.overflow='hidden';return()=>{document.body.style.overflow=overflow;element?.close();previous?.focus()}},[]);
  const p=query.data;
  const trapFocus=(event:React.KeyboardEvent<HTMLDialogElement>)=>{
    if(event.key!=='Tab')return;
    const elements=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(element=>element.getClientRects().length>0);
    const first=elements[0],last=elements.at(-1);if(!first||!last)return;
    if(event.shiftKey&&(document.activeElement===first||document.activeElement===event.currentTarget)){event.preventDefault();last.focus()}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  };
  return <dialog className="reference-quick-view" ref={dialog} aria-labelledby={title} onKeyDown={trapFocus} onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose()}}}><button className="quick-view-close" aria-label="Close quick view" onClick={onClose}><X size={22}/></button>{query.isLoading?<><h2 className="skeleton-sr-only" id={title}>Loading product</h2><ProductDetailsSkeleton quick/></>:!p?<div className="empty-state"><h2 id={title}>Product unavailable</h2><p>{errorMessage(query.error)}</p><button onClick={()=>query.refetch()}>Try again</button></div>:<div className="quick-view-grid"><div className="quick-view-media">{p.images[image]?<img className="quick-view-image" src={p.images[image].url} alt={p.images[image].alt||p.name}/>:<Package size={70}/>}<div className="detail-thumbs">{p.images.map((photo,index)=><button key={photo.url} aria-label={'View photo '+(index+1)} className={image===index?'selected':''} onClick={()=>setImage(index)}><img src={photo.url} alt=""/></button>)}</div></div><div className="quick-view-content"><h2 id={title}>{p.name}</h2><ProductPurchase key={p.id} product={p} quick/><div className="quick-view-meta"><p><strong>SKU:</strong> {p.sku}</p>{p.category&&<p><strong>Category:</strong> <Link href={'/category/'+p.category.slug}>{p.category.name}</Link></p>}{p.brand&&<p><strong>Brand:</strong> {p.brand.name}</p>}<Link className="quick-view-details" href={'/products/'+p.slug}>View Full Details →</Link></div></div></div>}</dialog>;
}
