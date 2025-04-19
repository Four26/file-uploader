import { Link } from "react-router-dom";

export const Welcome = () => {
    return (
        <div>
            <main className="flex flex-col items-center justify-center pt-20">
                <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
                    Welcome to File Uploader Web App!
                </h1>
                <p className="text-lg text-center mb-6 max-w-lg">
                    Easily store, organize, and share your files with a streamlined personal storage solution.
                </p>

                <section className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>📁 Create and manage folders</li>
                        <li>📂 Upload and organize files</li>
                        <li>🔍 View file details (name, size, upload time)</li>
                        <li>📥 Download your files anytime</li>
                        <li>🔒 Secure session-based authentication</li>
                    </ul>
                </section>

                <section className="mt-12 flex space-x-4">
                    <Link to="/signup" className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                        Sign up
                    </Link>
                    <Link
                        to="/login"
                        className="px-5 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition">
                        Log in
                    </Link>
                </section>
            </main>
        </div>
    )
}

