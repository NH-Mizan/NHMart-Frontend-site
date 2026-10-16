import { WebsiteShell } from '../../../components/website/website-shell';
import { CategoryCollection } from '../../../components/website/category-collection';
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <WebsiteShell><CategoryCollection slug={slug}/></WebsiteShell>}
