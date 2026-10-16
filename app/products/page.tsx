import Link from 'next/link';
import { Suspense } from 'react';
import { WebsiteShell } from '../../components/website/website-shell';
import {CollectionSkeleton} from '../../components/ui/skeleton';
import { Catalogue } from '../../components/website/catalogue';
export const metadata={title:'Shop | NH Mart',description:'Browse our latest collection. Cash on delivery across Bangladesh.'};
export default function Products(){return <WebsiteShell><header className="market-listing-heading market-container"><nav aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Shop</span></nav><div><h1>All Products</h1><p>Explore the latest styles in our collection.</p></div></header><Suspense fallback={<CollectionSkeleton/>}><Catalogue/></Suspense></WebsiteShell>}
