import { URL } from "../api/URL";

export const editName = async (id: number, type: string, name: string) => {
    try {
        const response = await fetch(`${URL}/editName`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, type, name })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Request failed with status: ' + response.status);
        }
        console.log(data.message);
        return data;
    } catch (error) {
        console.error('Internal server error', error);
        return error;
    }
}
