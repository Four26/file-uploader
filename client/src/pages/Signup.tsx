import { Link } from "react-router-dom";
import { signUp } from "../services/signUp/signUp";
import { useReducerHook } from "../hooks/useReducerHook";
import React from "react";

export type SignupField = {
    name: string,
    type: string,
    label: string,
};

type ErrorObject = {
    code: string,
    exact: boolean,
    inclusive: boolean,
    message: string,
    minimum: number,
    path: string[],
    type: string
}

const formInputs: SignupField[] = [
    { name: 'firstname', type: 'text', label: 'First Name' },
    { name: 'lastname', type: 'text', label: 'Last Name' },
    { name: 'username', type: 'text', label: 'Username' },
    { name: 'password', type: 'password', label: 'Password' },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password' }
];
export const Signup = () => {
    const [state, dispatch] = useReducerHook();

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        console.log(name, value)
        dispatch({ type: 'SIGNUP_INPUTS_VALUE', payload: { [name]: value } })
    }
    const handleSignUpSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await signUp(state.signUpField);

        if (response?.error) {
            if (Array.isArray(response.error)) {
                response.error.map((error: ErrorObject) => {
                    const errorMessage = error.message;
                    if (errorMessage) {
                        dispatch({ type: 'SIGNUP_RESPONSE', payload: { message: errorMessage } });
                    }
                });
            } else {
                dispatch({ type: 'SIGNUP_RESPONSE', payload: { message: response.error } });
                return;
            }
            return;
        }

        if (response?.message) {
            dispatch({ type: 'SIGNUP_RESPONSE', payload: { message: response.message } });

            setTimeout(() => {
                dispatch({ type: 'SIGNUP_INPUTS_VALUE', payload: { firstname: '', lastname: '', username: '', password: '', confirmPassword: '' } });
                dispatch({ type: 'SIGNUP_RESPONSE', payload: { message: '' } });
            }, 3000);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="form-con shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded-lg w-[400px] mt-10 p-8 bg-white">
                {state.signUpResponse.message && <p className={`text-center ${state.signUpResponse.message === 'Successfully signed up!' ? 'text-green-500' : 'text-red-500'}`}>{state.signUpResponse.message}</p>}
                <h1 className="text-center text-2xl font-semibold mb-6">Signup</h1>
                <form
                    onSubmit={handleSignUpSubmit}
                    className="flex flex-col space-y-4">
                    {formInputs.map(({ name, type, label }) => (
                        <div
                            key={name}
                            className="relative">
                            <input
                                onChange={handleInputValue}
                                type={type}
                                name={name}
                                value={state.signUpField[name as keyof typeof state.signUpField]}
                                required
                                placeholder={label}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full border-none cursor-pointer mt-4 rounded-md py-2 bg-blue-500 text-white hover:bg-blue-700 transition-all duration-200 ease-in">Signup</button>
                    <p className="text-center text-gray-600 text-sm">All ready have an account? <Link to="/login" className="text-blue-500 underline">Login</Link></p>
                </form >
            </div>
        </div >
    );
}
