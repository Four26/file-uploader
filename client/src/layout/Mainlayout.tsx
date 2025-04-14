import { Header } from "../pages/Header";
import { Dashboard } from "../pages/Dashboard";
import { Footer } from "../pages/Footer";
export const Mainlayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <Dashboard />
            </main>
            <Footer />
        </div>
    )
}
