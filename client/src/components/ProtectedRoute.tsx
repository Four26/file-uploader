import { ReactNode, useEffect, useState } from "react";
import { URL } from "../api/URL";
import { Navigate } from "react-router-dom";

const checkAuthentication = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${URL}/dashboard`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (!response.ok) return false;
        return data;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const isAuthenticated = await checkAuthentication();
            setIsAuthenticated(isAuthenticated);
        }
        checkAuth();
    }, [])

    if (isAuthenticated === null) return <p>Loading...</p>

    return isAuthenticated ? children : <Navigate to="/login" replace />
}
