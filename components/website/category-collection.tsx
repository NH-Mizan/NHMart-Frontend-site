'use client';
import Link from 'next/link';
import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api,errorMessage } from '../../lib/api';
import { Category } from '../../lib/types';
import {CollectionSkeleton,ProductGridSkeleton} from '../ui/skeleton';
import { Catalogue } from './catalogue';
export function CategoryCollection({slug,kind='category'}:{slug:string;kind?:'category'|'subcategory'|'childcategory'|'brand'}){
  const query=useQuery({queryKey:['storefront-categories'],queryFn:async()=>(await api.get('/storefront/categories')).data.data as Category[]});
  const brands=useQuery({queryKey:['storefront-brands'],enabled:kind==='brand',queryFn:async()=>(await api.get('/storefront/brands')).data.data as Category[]});
  let node:Category|undefined,parent:Category|undefined,sub:Category|undefined;
  if(kind==='category'){node=query.data?.find(c=>c.slug===slug);parent=node;}
  if(kind==='subcategory')for(const category of query.data??[]){const found=category.subcategories?.find(s=>s.slug===slug);if(found){node=found;parent=category;sub=found;break;}}
  if(kind==='childcategory')for(const category of query.data??[])for(const group of category.subcategories??[]){const found=group.childCategories?.find(c=>c.slug===slug);if(found){node=found;parent=category;sub=group;}}
  if(kind==='brand')node=brands.data?.find(b=>b.slug===slug);
  if(query.isLoading||kind==='brand'&&brands.isLoading)return <CollectionSkeleton/>;
  if(query.error||brands.error)return <div className="empty-state"><p>{errorMessage(query.error||brands.error)}</p></div>;
  if(!node)return <div className="empty-state"><h1>Collection not found</h1><Link href="/categories">Explore our categories</Link></div>;
  const chips=kind==='category'?node.subcategories:kind==='subcategory'?node.childCategories:[];
  return <><header className="market-listing-heading market-container"><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/categories">Collections</Link>{parent&&parent.id!==node.id&&<><span>/</span><Link href={'/category/'+parent.slug}>{parent.name}</Link></>}<span>/</span><span aria-current="page">{node.name}</span></nav><div><h1>{node.name}</h1>{node.description&&<p>{node.description}</p>}</div>{!!chips?.length&&<nav className="market-category-chips" aria-label="Subcollections">{chips.map(chip=><Link key={chip.id} href={'/'+(kind==='category'?'subcategory':'childcategory')+'/'+chip.slug}>{chip.name}</Link>)}</nav>}</header><Suspense fallback={<div className="market-container skeleton-collection-products"><ProductGridSkeleton/></div>}><Catalogue initialCategory={parent?.slug} initialSubcategory={sub?.slug} initialChildCategory={kind==='childcategory'?slug:undefined} initialBrand={kind==='brand'?slug:undefined}/></Suspense></>;
}
