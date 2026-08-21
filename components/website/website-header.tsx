'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';

const links=[['/','Home'],['/products','Shop'],['/about','About'],['/contact','Contact']];
export function WebsiteHeader(){const path=usePathname();const[open,setOpen]=useState(false);return <><div className="site-announcement"><span>Free delivery on orders over ৳2,000</span><span>Support: +880 1700-000000</span></div><header className="site-header"><div className="site-header-inner"><Link href="/" className="site-logo"><span>NH</span><b>Mart</b></Link><nav className={open?'open':''}>{links.map(([href,label])=><Link onClick={()=>setOpen(false)} className={path===href?'active':''} href={href} key={href}>{label}</Link>)}<Link onClick={()=>setOpen(false)} href="/login" className="mobile-account">Admin login</Link></nav><div className="site-actions"><button aria-label="Search"><Search size={19}/></button><Link href="/login" aria-label="Account"><UserRound size={19}/></Link><button className="cart-button" aria-label="Cart"><ShoppingBag size={19}/><span>0</span></button><button className="site-menu" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X size={22}/>:<Menu size={22}/>}</button></div></div></header>{open&&<button className="site-nav-overlay" onClick={()=>setOpen(false)} aria-label="Close navigation"/>}</>}
