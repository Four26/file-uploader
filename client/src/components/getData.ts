import { URL } from "../api/URL";
export const getData = async () => {

    // const url = folderId !== null
    //     ? `${URL}/dashboard?folderId=${folderId}`
    //     : `${URL}/dashboard`;

    try {
        const response = await fetch(`${URL}/dashboard`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log('Data', data);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
};