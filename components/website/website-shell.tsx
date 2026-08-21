import { WebsiteFooter } from './website-footer'; import { WebsiteHeader } from './website-header';
export function WebsiteShell({children}:{children:React.ReactNode}){return <div className="website-shell"><WebsiteHeader/><main>{children}</main><WebsiteFooter/></div>}
