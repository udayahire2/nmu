// ✅ FIX 1: Hardcoded localhost hata do
const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/study-materials`
  : '/api/v1/study-materials';

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

// ✅ FIX 2: Auth helper function
const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token ?? ''}`
    };
};

// ✅ Public route — auth ki zaroorat nahi (theek hai)
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

// ✅ FIX 3: Admin only — auth header add kiya
export const fetchPendingMaterials = async (): Promise<StudyMaterial[]> => {
    try {
        const response = await fetch(`${API_URL}/pending`, {
            headers: getAuthHeaders()  // 👈 Yeh missing tha
        });
        if (!response.ok) throw new Error('Failed to fetch pending materials');
        return await response.json();
    } catch (error) {
        console.error('Error fetching pending materials:', error);
        return [];
    }
};

// ✅ FIX 4: Faculty only — auth header add kiya
export const uploadMaterial = async (
    formData: FormData
): Promise<StudyMaterial | null> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),  // 👈 Yeh missing tha
            body: formData,
            // Note: Content-Type mat dalo manually — 
            // browser khud multipart/form-data set karta hai
        });
        if (!response.ok) throw new Error('Failed to upload material');
        return await response.json();
    } catch (error) {
        console.error('Error uploading material:', error);
        return null;
    }
};

// ✅ FIX 5: Admin only — auth header add kiya
export const updateMaterialStatus = async (
    id: string,
    status: 'approved' | 'rejected'
): Promise<StudyMaterial | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()  // 👈 Yeh missing tha
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