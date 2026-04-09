import { buildApiUrl, getAuthHeaders, getErrorMessage, parseApiData } from './api';

const API_URL = buildApiUrl('/study-materials');

export interface StudyMaterial {
    _id: string;
    title: string;
    subject: string;
    type: 'PDF' | 'Video' | 'Notes';
    url?: string;
    filePath?: string;
    status: 'pending' | 'approved' | 'rejected';
    author: string;
    createdAt: string;
}

export const fetchApprovedMaterials = async (): Promise<StudyMaterial[]> => {
    try {
        const response = await fetch(`${API_URL}/approved`);
        const payload = await response.json();
        if (!response.ok || payload.success === false) {
            throw new Error(getErrorMessage(payload, 'Failed to fetch materials'));
        }

        return parseApiData<StudyMaterial[]>(payload, []);
    } catch (error) {
        console.error('Error fetching approved materials:', error);
        return [];
    }
};

export const fetchPendingMaterials = async (): Promise<StudyMaterial[]> => {
    try {
        const response = await fetch(`${API_URL}/pending`, {
            headers: getAuthHeaders(),
        });
        const payload = await response.json();
        if (!response.ok || payload.success === false) {
            throw new Error(getErrorMessage(payload, 'Failed to fetch pending materials'));
        }

        return parseApiData<StudyMaterial[]>(payload, []);
    } catch (error) {
        console.error('Error fetching pending materials:', error);
        return [];
    }
};

export const uploadMaterial = async (formData: FormData): Promise<StudyMaterial | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: formData,
        });
        const payload = await response.json();
        if (!response.ok || payload.success === false) {
            throw new Error(getErrorMessage(payload, 'Failed to upload material'));
        }

        return parseApiData<StudyMaterial | null>(payload, null);
    } catch (error) {
        console.error('Error uploading material:', error);
        return null;
    }
};

export const updateMaterialStatus = async (
    id: string,
    status: 'approved' | 'rejected'
): Promise<StudyMaterial | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders(),
            },
            body: JSON.stringify({ status }),
        });
        const payload = await response.json();
        if (!response.ok || payload.success === false) {
            throw new Error(getErrorMessage(payload, 'Failed to update status'));
        }

        return parseApiData<StudyMaterial | null>(payload, null);
    } catch (error) {
        console.error('Error updating material status:', error);
        return null;
    }
};
