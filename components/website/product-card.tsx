'use client';
import Link from 'next/link';
import { Eye, Package, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Product, formatMoney } from '../../lib/types';
import { QuickView } from './quick-view';
import { useCartStore } from '../../stores/cart-store';
export function ProductCard({product}:{product:Product}){
  const[message,setMessage]=useState('');const[quick,setQuick]=useState(false);const add=useCartStore(s=>s.add);
  return <article className="shop-card"><div className="product-card-media"><Link href={`/products/${product.slug}`} className="product-image">{product.images[0]?<img src={product.images[0].url} alt={product.images[0].alt||product.name} loading="lazy"/>:<div className="image-empty"><Package size={40}/></div>}{Number(product.oldPrice)>Number(product.price)&&<span>{Math.round((1-Number(product.price)/Number(product.oldPrice))*100)}% OFF</span>}</Link><button className="product-quick-view" aria-label={'Quick view '+product.name} aria-haspopup="dialog" onClick={()=>setQuick(true)}><Eye size={16}/>Quick View</button></div><div className="shop-card-info"><small>{product.category&&<Link href={'/category/'+product.category.slug}>{product.category.name}</Link>}</small><h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3><div className="shop-prices"><strong>{formatMoney(product.price)}</strong>{Number(product.oldPrice)>Number(product.price)&&<del>{formatMoney(product.oldPrice)}</del>}</div>{product.variants.length?<Link className="shop-add" href={`/products/${product.slug}`}>Choose options</Link>:<button className="shop-add" disabled={product.stock<1} onClick={()=>{try{add(product,null);setMessage('Added to cart')}catch(error){setMessage(error instanceof Error?error.message:'Unable to add')}}}><ShoppingBag size={15}/>{product.stock>0?'Add to cart':'Out of stock'}</button>}{message&&<p className="inline-note" role="status">{message} <Link href="/cart">View cart</Link></p>}</div>{quick&&<QuickView slug={product.slug} onClose={()=>setQuick(false)}/>}</article>
}
