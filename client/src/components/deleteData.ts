import { URL } from "../api/URL";


export const deleteData = async (id: number, type: string, name: string) => {
    try {
        const response = await fetch(`${URL}/deleteData/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, type, name })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('Request failed with status: ' + response.status);
        }
        console.log(data.message);
        return data;;
    } catch (error) {
        console.log('Error deleting data', error);
        return error;
    }
}
