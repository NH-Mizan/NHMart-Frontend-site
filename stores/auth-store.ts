import { create } from 'zustand';
export type User={id:string;name:string;email:string;roles:string[];permissions:string[]};
type State={user:User|null;accessToken:string|null;hydrated:boolean;hydrate:()=>void;setSession:(user:User,token:string)=>void;logout:()=>void};
export const isStaff=(user:User|null)=>!!user&&(user.roles?.includes('SUPER_ADMIN')||!!user.permissions?.length);
export const useAuthStore=create<State>((set)=>({user:null,accessToken:null,hydrated:false,hydrate:()=>{try{const saved=JSON.parse(localStorage.getItem('nhmart-session')||'null');if(saved?.user?.id&&typeof saved.accessToken==='string'){set({user:saved.user,accessToken:saved.accessToken,hydrated:true});return}}catch{}set({hydrated:true})},setSession:(user,accessToken)=>{localStorage.setItem('nhmart-session',JSON.stringify({user,accessToken}));set({user,accessToken,hydrated:true})},logout:()=>{localStorage.removeItem('nhmart-session');set({user:null,accessToken:null,hydrated:true})}}));
