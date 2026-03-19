export const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '');

export const buildApiUrl = (path: string): string => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE_URL}${normalizedPath}`;
};

export const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('token');

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
};
