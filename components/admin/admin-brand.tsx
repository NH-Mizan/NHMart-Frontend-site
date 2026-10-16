'use client';
import Link from 'next/link';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../lib/api';
import type {StoreSettings} from '../../lib/types';
import {Skeleton} from '../ui/skeleton';

export function AdminBrand({variant='sidebar'}:{variant?:'sidebar'|'header'|'login'}){
  const settings=useQuery({queryKey:['store-settings'],queryFn:async()=>(await api.get('/storefront/settings')).data.data as StoreSettings|null});
  const store=settings.data,image=variant==='sidebar'?store?.footerLogo||store?.logo:store?.logo;
  return <Link className={'admin-brand admin-brand-'+variant} href={variant==='login'?'/':'/admin'} aria-label={variant==='login'?'Visit storefront':'Admin dashboard'}>{settings.isLoading?<Skeleton className="admin-brand-placeholder"/>:image?<img src={image} alt={(store?.name||'Store')+' logo'}/>:<strong>{store?.name||'Store management'}</strong>}{variant==='sidebar'&&<small>STORE MANAGEMENT</small>}</Link>;
}
