'use client';
import Link from 'next/link';
import {WebsiteShell} from '../../components/website/website-shell';
import {CustomerDashboard,AccountSkeleton} from '../../components/website/customer-dashboard';
import {useAuthStore} from '../../stores/auth-store';
export default function Account(){const {user,hydrated}=useAuthStore();return <WebsiteShell><section className="customer-account market-container">{!hydrated?<AccountSkeleton/>:user?<CustomerDashboard key={user.id} user={user}/>:<div className="account-signed-out"><span>YOUR ACCOUNT</span><h1>Welcome to your account</h1><p>Sign in to track orders, update your details and manage your wishlist.</p><div><Link className="account-primary" href="/account/login">Sign in</Link><Link className="account-secondary" href="/account/register">Create an account</Link></div><Link href="/products">Continue shopping</Link></div>}</section></WebsiteShell>}
