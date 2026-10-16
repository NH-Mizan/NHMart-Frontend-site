import axios from 'axios';
import { useAuthStore } from '../stores/auth-store';
export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1', withCredentials: true, timeout: 30000 });
api.interceptors.request.use(config => { const token = useAuthStore.getState().accessToken; if (token) config.headers.Authorization = 'Bearer ' + token; return config; });
let refreshing: Promise<void> | null = null;
api.interceptors.response.use(response => response, async error => { const original = error.config; if (error.response?.status === 401 && original && !original._retried && !/auth\/(login|refresh)|customer\/(login|register)/.test(original.url) && useAuthStore.getState().user) { original._retried = true; try { if (!refreshing) refreshing = axios.post((api.defaults.baseURL || '/api/v1') + '/auth/refresh', {}, { withCredentials: true }).then(({ data }) => { useAuthStore.getState().setSession(data.data.user, data.data.accessToken) }).finally(() => { refreshing = null }); await refreshing; return api(original) } catch { useAuthStore.getState().logout() } } return Promise.reject(error) });
export function errorMessage(error: unknown) { return axios.isAxiosError(error) ? String(error.response?.data?.message || 'Unable to reach the server. Please try again.') : (error instanceof Error ? error.message : 'Unable to complete this action'); }
export async function signOut() { try { await api.post('/auth/logout') } finally { useAuthStore.getState().logout() } }
