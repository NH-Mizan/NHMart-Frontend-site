import { create } from 'zustand';
type User={id:string;name:string;email:string;roles?:string[]};
type State={user:User|null;accessToken:string|null;setSession:(user:User,token:string)=>void;logout:()=>void};
export const useAuthStore=create<State>((set)=>({user:null,accessToken:null,setSession:(user,accessToken)=>{localStorage.setItem('nhmart-session',JSON.stringify({user,accessToken}));set({user,accessToken})},logout:()=>{localStorage.removeItem('nhmart-session');set({user:null,accessToken:null})}}));
