import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mainlayout } from "./layout/Mainlayout";
import { Welcome } from "./pages/Welcome";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path='/dashboard' element={<ProtectedRoute>
                    <Mainlayout />
                </ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
