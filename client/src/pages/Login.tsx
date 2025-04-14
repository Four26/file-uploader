import { Link } from "react-router-dom";
import { useReducerHook } from "../hooks/useReducerHook";
import { logIn } from "../services/logIn/logIn";
import { useNavigate } from "react-router-dom";

type LoginField = {
    name: string;
    type: string;
    label: string;
};

const formInputs: LoginField[] = [
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'password', type: 'password', label: 'Password' }
];

export const Login = () => {
    const [state, dispatch] = useReducerHook();
    const navigate = useNavigate();

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        dispatch({ type: 'LOGIN_INPUTS_VALUE', payload: { [name]: value } });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await logIn(state.logInField);

            if (!response?.error) {
                navigate('/dashboard');
            }
            console.log(response.message);
            dispatch({ type: 'LOGIN_RESPONSE', payload: { error: response.error } })
            setTimeout(() => {
                dispatch({ type: 'LOGIN_RESPONSE', payload: { error: '' } })
            }, 3000);
        } catch (error) {
            return error;
        }
    }


    return (
        <div className="flex justify-center items-center">
            <div className="login-con shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-lg w-[400px] mt-20 p-8 bg-white">
                {state.logInResponse.error && <p className="text-red-500 text-center">{state.logInResponse.error}</p>}
                <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4" >
                    {formInputs.map(({ name, type, label }) => (
                        <div key={name} className="relative">
                            <input
                                onChange={inputHandleChange}
                                type={type}
                                name={name}
                                value={state.logInField[name as keyof typeof state.logInField]}
                                required
                                placeholder={label}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    ))}
                    <button type="submit" className="w-full border-none cursor-pointer mt-4 rounded-md py-2 bg-blue-500 text-white hover:bg-blue-700 transition-all duration-200 ease-in">Login</button>
                    <p className="text-center text-gray-600 text-sm">Don't have an account? <Link to="/signup" className="text-blue-500 underline">Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

