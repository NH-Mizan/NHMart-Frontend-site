'use client';
import Link from 'next/link';
import {useId,useState} from 'react';
import {useRouter} from 'next/navigation';
import {Minus,Plus,ShoppingBag} from 'lucide-react';
import {Product,Variant,formatMoney} from '../../lib/types';
import {useCartStore} from '../../stores/cart-store';

const sizeKey=(v:Variant)=>v.sizeId||v.size?.name||'';
const colorKey=(v:Variant)=>v.colorId||v.color?.name||'';
export function ProductPurchase({product:p,quick=false}:{product:Product;quick?:boolean}){
  const id=useId(),router=useRouter(),add=useCartStore(s=>s.add);
  const[color,setColor]=useState(''),[size,setSize]=useState(''),[quantity,setQuantity]=useState(1),[notice,setNotice]=useState('');
  const variants=p.variants.filter(v=>v.status==='ACTIVE');
  const colors=[...new Map(variants.filter(v=>colorKey(v)).map(v=>[colorKey(v),{key:colorKey(v),name:v.color?.name||colorKey(v),hex:v.color?.hexCode}])).values()];
  const sizes=[...new Map(variants.filter(v=>sizeKey(v)).map(v=>[sizeKey(v),{key:sizeKey(v),name:v.size?.name||sizeKey(v)}])).values()];
  const complete=(!colors.length||!!color)&&(!sizes.length||!!size);
  const variant=complete?variants.find(v=>colorKey(v)===color&&sizeKey(v)===size)??null:null;
  // Variants without named dimensions are still selectable by SKU.
  const[unnamed,setUnnamed]=useState('');
  const selected=variants.length&&!colors.length&&!sizes.length?variants.find(v=>v.id===unnamed)??null:variant;
  const stock=selected?.stockQuantity??(variants.length?0:p.stock),ready=!variants.length||!!selected;
  const maximum=Math.min(stock,99);
  const chooseColor=(key:string)=>{setColor(key);if(size&&!variants.some(v=>colorKey(v)===key&&sizeKey(v)===size&&v.stockQuantity>0))setSize('');setQuantity(1);setNotice('')};
  const chooseSize=(key:string)=>{setSize(key);setQuantity(1);setNotice('')};
  const buy=(checkout=false)=>{if(!ready||stock<1)return;try{add(p,selected,quantity);setNotice('Added to your cart');if(checkout)router.push('/checkout')}catch(error){setNotice(error instanceof Error?error.message:'Unable to add product')}};
  return <div className="reference-purchase"><div className="detail-price"><strong>{formatMoney(selected?.price??p.price)}</strong>{Number(p.oldPrice)>Number(selected?.price??p.price)&&<del>{formatMoney(p.oldPrice)}</del>}</div>{p.shortDescription&&<p className="purchase-description">{p.shortDescription}</p>}
    {!!colors.length&&<fieldset className="reference-option"><legend>Color <span>{colors.find(c=>c.key===color)?.name||'Select a color'}</span></legend><div className="reference-options">{colors.map(option=>{const available=variants.some(v=>colorKey(v)===option.key&&v.stockQuantity>0);const swatch=option.hex&&/^#[\da-f]{6}$/i.test(option.hex)?option.hex:/^[a-z]+$/i.test(option.name)?option.name:'#e2e8f0';return <label className={'reference-color '+(!available?'unavailable':'')} key={option.key} title={option.name}><input type="radio" name={id+'-color'} value={option.key} checked={color===option.key} disabled={!available} onChange={()=>chooseColor(option.key)} aria-label={option.name}/><span className="reference-swatch" style={{backgroundColor:swatch}}/><span className="reference-color-name">{option.name}</span></label>})}</div></fieldset>}
    {!!sizes.length&&<fieldset className="reference-option"><legend>Size <span>{sizes.find(s=>s.key===size)?.name||'Select a size'}</span></legend><div className="reference-options">{sizes.map(option=>{const available=variants.some(v=>sizeKey(v)===option.key&&(!color||colorKey(v)===color)&&v.stockQuantity>0);return <label className={'reference-size '+(!available?'unavailable':'')} key={option.key}><input type="radio" name={id+'-size'} value={option.key} checked={size===option.key} disabled={!available} onChange={()=>chooseSize(option.key)} aria-label={option.name}/><span>{option.name}</span></label>})}</div></fieldset>}
    {!!variants.length&&!colors.length&&!sizes.length&&<label className="store-label">Option<select value={unnamed} onChange={e=>{setUnnamed(e.target.value);setQuantity(1)}}><option value="">Select an option</option>{variants.map(v=><option key={v.id} value={v.id} disabled={v.stockQuantity<1}>{v.sku}</option>)}</select></label>}
    <p className={ready&&stock>0?'stock-available':'purchase-stock'} aria-live="polite">{!ready?'Select your options to check availability':stock>0?`In stock · ${stock} available`:'Out of stock'}</p>
    <div className="reference-quantity-row"><label htmlFor={id+'-quantity'}>Quantity</label><div className="reference-quantity"><button aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(n=>Math.max(1,n-1))}><Minus size={14}/></button><input id={id+'-quantity'} type="number" min="1" max={Math.max(1,maximum)} aria-label="Quantity" value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(maximum||1,Math.floor(Number(e.target.value))||1)))}/><button aria-label="Increase quantity" disabled={!ready||quantity>=maximum} onClick={()=>setQuantity(n=>Math.min(maximum,n+1))}><Plus size={14}/></button></div></div>
    <div className="reference-purchase-buttons"><button className="primary-cta" disabled={!ready||stock<1} onClick={()=>buy()}><ShoppingBag size={16}/>Add to cart</button>{!quick&&<button className="reference-order-now" disabled={!ready||stock<1} onClick={()=>buy(true)}>Order Now</button>}</div>{notice&&<p className="notice" role="status">{notice} <Link href="/cart">View cart</Link></p>}
  </div>;
}
