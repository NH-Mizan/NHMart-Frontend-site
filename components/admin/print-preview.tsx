'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {Printer,X} from 'lucide-react';

export function PrintPreview({title,onClose,children,pageStyle='size: A4; margin: 12mm;',canPrint=true}:{title:string;onClose:()=>void;children:ReactNode;pageStyle?:string;canPrint?:boolean}){
  const dialog=useRef<HTMLDialogElement>(null);
  const[printing,setPrinting]=useState(false);
  useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.current?.showModal();return()=>{document.body.style.overflow=overflow;previous?.focus()}},[]);
  async function print(){setPrinting(true);try{await document.fonts.ready;await Promise.all(Array.from(dialog.current?.querySelectorAll('img')??[]).map(image=>image.decode().catch(()=>{})));window.print()}finally{setPrinting(false)}}
  return createPortal(<div data-print-portal><style media="print">{'@page{'+pageStyle+'}'}</style><dialog ref={dialog} className="print-preview" aria-label={title} onCancel={event=>{event.preventDefault();onClose()}}><header className="print-preview-toolbar no-print"><h2>{title}</h2><button className="product-primary" disabled={printing||!canPrint} onClick={print}><Printer size={16}/>{printing?'Preparing…':'Print / Save PDF'}</button><button className="secondary-button" aria-label="Close print preview" onClick={onClose}><X size={18}/></button></header><div className="print-preview-content">{children}</div></dialog></div>,document.body);
}
