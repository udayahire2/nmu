const API_URL = 'http://localhost:5001/api/v1/admin';

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalResources: number;
    storageUsed: string;
    recentActivity: any[];
}

export interface AdminProfile {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
}

export const fetchDashboardStats = async (): Promise<DashboardStats | null> => {
    try {
        const response = await fetch(`${API_URL}/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        return await response.json();
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return null;
    }
};

export const fetchProfile = async (): Promise<AdminProfile | null> => {
    try {
        const response = await fetch(`${API_URL}/profile`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        return await response.json();
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
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return await response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        return null;
    }
};
