import { buildApiUrl, getAuthHeaders } from './api';

const API_URL = buildApiUrl('/admin');

export interface DashboardStats {
    totalUsers: number;
    totalResources: number;
    newUsers: number;
    newResources: number;
}

export interface AdminProfile {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
}

export const fetchDashboardStats = async (): Promise<DashboardStats | null> => {
    try {
        const response = await fetch(`${API_URL}/stats`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        return data.stats ?? null;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return null;
    }
};

export const fetchProfile = async (): Promise<AdminProfile | null> => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        return data.profile ?? null;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};

export const updateProfile = async (data: Partial<AdminProfile>): Promise<AdminProfile | null> => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update profile');
        const payload = await response.json();
        return payload.profile ?? null;
    } catch (error) {
        console.error('Error updating profile:', error);
        return null;
    }
};
