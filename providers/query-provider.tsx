'use client';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { useEffect,useRef,useState } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { useCartStore } from '../stores/cart-store';
export function QueryProvider({children}:{children:React.ReactNode}){const [client]=useState(()=>new QueryClient({defaultOptions:{queries:{retry:1,staleTime:15000}}}));const userId=useAuthStore(s=>s.user?.id);const previousUser=useRef(userId);useEffect(()=>{useAuthStore.getState().hydrate();useCartStore.getState().hydrate()},[]);useEffect(()=>{if(previousUser.current!==userId){previousUser.current=userId;void client.resetQueries()}},[client,userId]);return <QueryClientProvider client={client}>{children}</QueryClientProvider>}
