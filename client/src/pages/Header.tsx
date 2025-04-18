import { FiLogOut } from "react-icons/fi";
import { useHandleLogOut } from "../components/useHandleLogOut";

export const Header = () => {

    const logOut = useHandleLogOut();
    return (
        <header className="border-b-blue-700">
            <nav className="bg-blue-700 text-white py-4 px-10 flex justify-between items-center gap-9">
                <h1 className="text-3xl font-bold">File Uploader</h1>

                <div className="w-auto gap-10 btn-con flex  flex-wrap items-center sm:flex-nowrap">
                    <div className="relative group w-max">
                        <FiLogOut
                            onClick={logOut}
                            className="text-2xl cursor-pointer hover:text-red-500"
                        />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-xs bg-gray-800 text-white px-2 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Logout
                        </span>
                    </div>

                </div>
            </nav>
        </header>
    )
}

