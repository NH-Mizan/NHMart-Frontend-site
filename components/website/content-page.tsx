'use client';
import { useQuery } from '@tanstack/react-query';
import { api,errorMessage } from '../../lib/api';
export function ContentPage({slug}:{slug:string}){const page=useQuery({queryKey:['content-page',slug],queryFn:async()=>(await api.get('/storefront/pages/'+encodeURIComponent(slug))).data.data as {title:string;content:string}});return <section className="store-page content-page">{page.isLoading?<p>Loading…</p>:page.error?<div className="empty-state"><h1>Page unavailable</h1><p>{errorMessage(page.error)}</p></div>:<><h1>{page.data?.title}</h1><div className="content-copy">{page.data?.content}</div></>}</section>}
