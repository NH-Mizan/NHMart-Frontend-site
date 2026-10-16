'use client';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {api} from '../../lib/api';
import {formatMoney,type Product,type StoreSettings} from '../../lib/types';
import {BarcodeImage,barcodeSupported} from './barcode-image';
import {PrintPreview} from './print-preview';

export function ProductBarcodes({product,onClose}:{product:Product;onClose:()=>void}){
  const[selected,setSelected]=useState(product.variants[0]?.id??product.id),[copies,setCopies]=useState('1'),[format,setFormat]=useState('sheet'),[showPrice,setShowPrice]=useState(true);
  const settings=useQuery({queryKey:['store-settings'],queryFn:async()=>(await api.get('/storefront/settings')).data.data as StoreSettings});
  const variant=product.variants.find(item=>item.id===selected),sku=variant?.sku??product.sku,price=variant?.price??product.price;
  const quantity=Number(copies),valid=Number.isInteger(quantity)&&quantity>=1&&quantity<=100&&barcodeSupported(sku);
  const description=[variant?.color?.name,variant?.size?.name].filter(Boolean).join(' / ');
  return <PrintPreview canPrint={valid} title="Product barcode labels" onClose={onClose} pageStyle={format==='thermal'?'size: 58mm 40mm; margin: 0;':'size: A4; margin: 10mm;'}><div className="barcode-options store-form no-print"><label>Product / variant<select value={selected} onChange={event=>setSelected(event.target.value)}><option value={product.id}>{product.sku} — Product</option>{product.variants.map(item=><option value={item.id} key={item.id}>{item.sku} — {[item.color?.name,item.size?.name].filter(Boolean).join(' / ')||'Variant'}{item.status==='INACTIVE'?' (inactive)':''}</option>)}</select></label><label>Copies<input type="number" min="1" max="100" step="1" value={copies} onChange={event=>setCopies(event.target.value)}/></label><label>Paper<select value={format} onChange={event=>setFormat(event.target.value)}><option value="sheet">A4 label sheet</option><option value="thermal">58 × 40 mm thermal label</option></select></label><label className="checkbox-label"><input type="checkbox" checked={showPrice} onChange={event=>setShowPrice(event.target.checked)}/>Show selling price</label><p>Code 128 encodes the saved SKU. Choose a size/colour variant for its own code. Print at 100% scale.</p>{!valid&&<p role="alert" className="notice error">Choose 1–100 copies and an SKU containing 1–80 printable ASCII characters.</p>}</div><div className={'barcode-labels '+(format==='thermal'?'thermal-labels':'sheet-labels')}>{valid&&Array.from({length:quantity},(_,index)=><article className="barcode-label" key={index}><small>{settings.data?.name||'Store'}</small><strong>{product.name}</strong>{description&&<span>{description}</span>}<BarcodeImage value={sku}/>{showPrice&&<b>{formatMoney(price)}</b>}</article>)}</div></PrintPreview>;
}
