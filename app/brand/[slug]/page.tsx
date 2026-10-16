import { WebsiteShell } from '../../../components/website/website-shell';
import { CategoryCollection } from '../../../components/website/category-collection';
export default async function BrandPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <WebsiteShell><CategoryCollection slug={slug} kind="brand"/></WebsiteShell>}
