import { URL } from "../api/URL";

export const createFolder = async (folderName: string) => {
    try {
        const response = await fetch(`${URL}/createFolder`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folderName })
        });
        const data = await response.json();
        if (!response.ok) {
            return;
        }
        console.log(data.message, data.folder.name)
        return data;
    } catch (error) {
        return error;
    }
}