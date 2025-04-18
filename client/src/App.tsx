import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mainlayout } from "./layout/Mainlayout";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { useReducerHook } from "./hooks/useReducerHook";
import { getData } from "./components/getData";

import { useEffect } from "react";
function App() {
    const [state, dispatch] = useReducerHook();
    console.log(state.fileFolderData.data);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData();
            dispatch({ type: 'SET_FILE_FOLDER_DATA', payload: response });
            console.log('Response', response);
        }
        fetchData();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path='/dashboard' element={
                    <ProtectedRoute>
                        <Mainlayout />
                    </ProtectedRoute>} >
                    <Route index element={<Dashboard state={state} dispatch={dispatch} />} />
                    <Route path="folders">
                        <Route path=":folderId" element={<Dashboard state={state} dispatch={dispatch} />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
