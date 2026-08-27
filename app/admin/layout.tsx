'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, Grid2X2, LogOut, Menu, Package, Settings, ShoppingCart, Users, X, BarChart3, Layers3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/auth-store';
const items = [['', 'Dashboard', Grid2X2], ['users', 'Users', Users], ['products', 'Products', Package], ['orders', 'Orders', ShoppingCart], ['categories', 'Categories', Layers3], ['subcategories', 'Subcategories', Layers3], ['child-categories', 'Child categories', Layers3], ['customers', 'Customers', Users], ['reports', 'Reports', BarChart3], ['settings', 'Settings', Settings]] as const;
export default function AdminLayout({ children }: { children: React.ReactNode }) {
 const path=usePathname(),router=useRouter(); const [open,setOpen]=useState(false); const user=useAuthStore(s=>s.user),logout=useAuthStore(s=>s.logout);
 useEffect(()=>{if(!user){const saved=localStorage.getItem('nhmart-session');if(saved)useAuthStore.setState(JSON.parse(saved));else router.replace('/login')}},[user,router]);
 useEffect(()=>{if(user&&!user.roles?.some(role=>role==='ADMIN'||role==='SUPER_ADMIN')){logout();router.replace('/login')}},[user,logout,router]);
 if(!user||!user.roles?.some(role=>role==='ADMIN'||role==='SUPER_ADMIN'))return null;
 return <div className="admin-frame"><aside className={`admin-sidebar ${open?'is-open':''}`}><div className="brand"><span>NH MART</span><button className="sidebar-close" onClick={()=>setOpen(false)}><X size={18}/></button></div><div className="sidebar-label">MENU</div><nav>{items.map(([href,label,Icon])=><Link onClick={()=>setOpen(false)} className={path===`/admin/${href}`?'active':''} href={`/admin/${href}`} key={label}><Icon size={17}/><span>{label}</span></Link>)}</nav><button className="admin-logout" onClick={()=>{logout();router.replace('/login')}}><LogOut size={16}/> Sign out</button></aside>{open&&<button className="sidebar-overlay" onClick={()=>setOpen(false)} aria-label="Close menu"/>}<section className="admin-content"><header className="admin-topbar"><button className="mobile-menu" onClick={()=>setOpen(true)}><Menu size={21}/></button><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>Overview</strong></div><div className="top-actions"><button className="icon-btn"><Bell size={19}/></button><span className="top-divider"/><span className="top-avatar">{user.name.slice(0,2).toUpperCase()}</span><span className="top-name">{user.name}</span></div></header><main className="admin-main">{children}</main></section></div>;
}
