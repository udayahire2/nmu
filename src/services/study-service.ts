const API_URL = 'http://localhost:5001/api/v1/study-materials';

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
        if (!response.ok) throw new Error('Failed to fetch materials');
        return await response.json();
    } catch (error) {
        console.error('Error fetching approved materials:', error);
        return [];
    }
};

export const fetchPendingMaterials = async (): Promise<StudyMaterial[]> => {
    try {
        const response = await fetch(`${API_URL}/pending`);
        if (!response.ok) throw new Error('Failed to fetch pending materials');
        return await response.json();
    } catch (error) {
        console.error('Error fetching pending materials:', error);
        return [];
    }
};

export const uploadMaterial = async (formData: FormData): Promise<StudyMaterial | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData, // Auto-sets Content-Type to multipart/form-data
        });
        if (!response.ok) throw new Error('Failed to upload material');
        return await response.json();
    } catch (error) {
        console.error('Error uploading material:', error);
        return null;
    }
};

export const updateMaterialStatus = async (id: string, status: 'approved' | 'rejected'): Promise<StudyMaterial | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update status');
        return await response.json();
    } catch (error) {
        console.error('Error updating material status:', error);
        return null;
    }
};
