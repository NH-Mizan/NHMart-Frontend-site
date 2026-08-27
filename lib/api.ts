import axios from 'axios';
export const api=axios.create({baseURL:process.env.NEXT_PUBLIC_API_URL||'http://localhost:5000/api/v1',withCredentials:true});
api.interceptors.request.use((config)=>{if(typeof window!=='undefined'){const saved=localStorage.getItem('nhmart-session');if(saved){const {accessToken}=JSON.parse(saved);if(accessToken)config.headers.Authorization=`Bearer ${accessToken}`;}}return config;});
