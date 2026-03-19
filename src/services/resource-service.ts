import { buildApiUrl, getAuthHeaders } from './api';

const API_URL = buildApiUrl('/resources');

export interface ResourceItem {
    _id: string;
    title: string;
    subject: string;
    semester: string;
    branch: string;
    type: 'pdf' | 'video' | 'doc' | 'markdown';
    description: string;
    category: 'Notes' | 'PYQ' | 'Syllabus' | 'Lab Manual' | 'Reference Book' | 'Other';
    pattern?: string;
    unit?: string;
    year: 'FE' | 'SE' | 'TE' | 'BE';
    author: string;
    url: string;
    createdAt?: string;
}

export type CreateResourcePayload = Omit<ResourceItem, '_id' | 'createdAt'>;

export const fetchResources = async (): Promise<ResourceItem[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch resources');

        const data = await response.json();
        return data.data ?? [];
    } catch (error) {
        console.error('Error fetching resources:', error);
        return [];
    }
};

export const createResource = async (
    payload: CreateResourcePayload
): Promise<ResourceItem | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Failed to create resource');

        const data = await response.json();
        return data.data ?? null;
    } catch (error) {
        console.error('Error creating resource:', error);
        return null;
    }
};

export const deleteResource = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting resource:', error);
        return false;
    }
};
