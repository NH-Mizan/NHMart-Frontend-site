'use client';
import {useEffect,useRef} from 'react';
import JsBarcode from 'jsbarcode';

export function barcodeSupported(value:string){return /^[\x20-\x7E]{1,80}$/.test(value)}
export function BarcodeImage({value}:{value:string}){
  const svg=useRef<SVGSVGElement>(null);
  useEffect(()=>{if(svg.current&&barcodeSupported(value))JsBarcode(svg.current,value,{format:'CODE128',width:2,height:48,fontSize:14,margin:12,displayValue:true})},[value]);
  return barcodeSupported(value)?<svg ref={svg} className="generated-barcode" role="img" aria-label={'Barcode '+value} data-barcode-value={value}/>:<p className="notice error" role="alert">This code cannot be printed as Code 128. Use an SKU with 1–80 English letters, digits or printable ASCII symbols.</p>;
}
