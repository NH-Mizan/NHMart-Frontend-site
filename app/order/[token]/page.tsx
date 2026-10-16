import { WebsiteShell } from '../../../components/website/website-shell';
import { OrderView } from '../../../components/website/order-view';
export const metadata={title:'Your order | NH Mart',robots:{index:false,follow:false}};
export default async function OrderPage({params}:{params:Promise<{token:string}>}){const{token}=await params;return <WebsiteShell><OrderView token={token}/></WebsiteShell>}
