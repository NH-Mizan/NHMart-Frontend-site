import './globals.css';
import './commerce.css';
import './market.css';
import './reference-product.css';
import './skeleton.css';
import './admin-reference.css';
import './printing.css';
import './account.css';
import { QueryProvider } from '../providers/query-provider';
export const metadata={title:{default:'NH Mart',template:'%s'},icons:{icon:'/store-icon'},description:'Shop everyday products with cash on delivery across Bangladesh.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><QueryProvider>{children}</QueryProvider></body></html>}
