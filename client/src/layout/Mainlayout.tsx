import { Header } from "../pages/Header";
// import { Dashboard } from "../pages/Dashboard";
// import { useEffect } from "react";
// import { getData } from "../components/getData"
// import { useReducerHook } from "../hooks/useReducerHook";
import { Outlet } from "react-router-dom";
export const Mainlayout = () => {

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}
