import { URL } from "../api/URL";

export const folder = async (folderId: number | null) => {
    const folderPath = folderId === null ? 'null' : folderId
    try {
        const response = await fetch(`${URL}/folders/${folderPath}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folderId })
        });
        const data = await response.json();

        if (!response.ok) return false;
        return data;
    } catch (error) {
        return error;
    }
}
