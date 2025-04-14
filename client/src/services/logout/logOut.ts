import { URL } from "../../api/URL";

export const logOut = async () => {
    try {
        const response = await fetch(`${URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}