import { notFound } from 'next/navigation';
import { ResourceManager } from '../../../components/admin/resource-manager';
import { modules } from '../../../components/admin/module-config';
export default async function ModulePage({params}:{params:Promise<{module:string}>}){const{module}=await params;if(!modules[module])notFound();return <ResourceManager module={module}/>}
