import { URL } from "../../api/URL";
import { LogInField } from "../../hooks/useReducerHook";

export const logIn = async (userData: LogInField) => {
    try {
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();

        if (!response.ok) {
            return { error: data.message }
        }
        return data;
    } catch (error) {
        console.error(error);
        return;
    }
}
