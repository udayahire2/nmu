import { buildApiUrl, getAuthHeaders } from './api';

const API_URL = buildApiUrl('/syllabus');

export interface SyllabusItem {
    id?: string;
    _id?: string;
    title: string;
    code: string;
    branch: string;
    semester: string;
    type: 'pdf' | 'markdown';
    credits: number;
    contentUrl: string;
    createdAt?: string;
    updatedAt?: string;
}

export const fetchSyllabus = async (): Promise<SyllabusItem[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch syllabus');
        return await response.json();
    } catch (error) {
        console.error('Error fetching syllabus:', error);
        return [];
    }
};

export const createSyllabus = async (
    data: Omit<SyllabusItem, 'id' | '_id' | 'createdAt' | 'updatedAt'>
): Promise<SyllabusItem | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create syllabus');
        return await response.json();
    } catch (error) {
        console.error('Error creating syllabus:', error);
        return null;
    }
};

export const deleteSyllabus = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting syllabus:', error);
        return false;
    }
};
