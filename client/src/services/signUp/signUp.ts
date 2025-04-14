import { URL } from "../../api/URL";
import { SignUpField } from "../../hooks/useReducerHook";
export const signUp = async (userData: SignUpField) => {
    try {
        const response = await fetch(`${URL}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            return { error: data.error || data.message }
        }
        return { message: data.message };
    } catch (error) {
        console.error(error)
    }
}
