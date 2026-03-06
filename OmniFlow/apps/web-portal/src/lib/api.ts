const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function apiClient<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
}

export const api = {
    auth: {
        register: (data: { email: string; password: string; firstName?: string; lastName?: string }) =>
            apiClient<any>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
        login: (data: { email: string; password: string }) =>
            apiClient<any>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
        refresh: (refreshToken: string) =>
            apiClient<any>('/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken }) }),
    },
    workspaces: {
        list: () => apiClient<any[]>('/workspaces'),
        get: (id: string) => apiClient<any>(`/workspaces/${id}`),
    },
    contacts: {
        list: (page = 1, limit = 20) => apiClient<any>(`/contacts?page=${page}&limit=${limit}`),
        get: (id: string) => apiClient<any>(`/contacts/${id}`),
        create: (data: any) => apiClient<any>('/contacts', { method: 'POST', body: JSON.stringify(data) }),
        update: (id: string, data: any) => apiClient<any>(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
        delete: (id: string) => apiClient<any>(`/contacts/${id}`, { method: 'DELETE' }),
    },
    companies: {
        list: (page = 1, limit = 20) => apiClient<any>(`/companys?page=${page}&limit=${limit}`),
        get: (id: string) => apiClient<any>(`/companys/${id}`),
        create: (data: any) => apiClient<any>('/companys', { method: 'POST', body: JSON.stringify(data) }),
    },
    leads: {
        list: (page = 1, limit = 20) => apiClient<any>(`/leads?page=${page}&limit=${limit}`),
        get: (id: string) => apiClient<any>(`/leads/${id}`),
        create: (data: any) => apiClient<any>('/leads', { method: 'POST', body: JSON.stringify(data) }),
    },
    deals: {
        list: (page = 1, limit = 20) => apiClient<any>(`/deals?page=${page}&limit=${limit}`),
        get: (id: string) => apiClient<any>(`/deals/${id}`),
        create: (data: any) => apiClient<any>('/deals', { method: 'POST', body: JSON.stringify(data) }),
    },
    health: {
        check: () => apiClient<any>('/health'),
    },
};
