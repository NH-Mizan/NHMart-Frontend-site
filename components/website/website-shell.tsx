import { WebsiteFooter } from './website-footer';
import { MarketHeader } from './market-header';
export function WebsiteShell({children}:{children:React.ReactNode}){return <div className="website-shell market-store"><MarketHeader/><main>{children}</main><WebsiteFooter/></div>}
