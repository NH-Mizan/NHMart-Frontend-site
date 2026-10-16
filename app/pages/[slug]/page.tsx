import { WebsiteShell } from '../../../components/website/website-shell';
import { ContentPage } from '../../../components/website/content-page';
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;return <WebsiteShell><ContentPage slug={slug}/></WebsiteShell>}
