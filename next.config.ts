import type { NextConfig } from 'next';
const config:NextConfig={distDir:process.env.NEXT_DIST_DIR||'.next',outputFileTracingRoot:process.cwd(),experimental:{cpus:2},async rewrites(){return [{source:'/api/v1/:path*',destination:(process.env.API_INTERNAL_URL||'http://127.0.0.1:5000')+'/api/v1/:path*'}]}};
export default config;
