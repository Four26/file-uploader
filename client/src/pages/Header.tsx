import { logOut } from "../services/logout/logOut";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { uploadFile } from "../components/uploadFile";

export const Header = () => {
    const navigate = useNavigate();

    /* <----- Handle upload files -----> */
    const handleFileChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const response = await uploadFile({ file: files[0] });
            console.log(response.message, response.file);
        }
    }
    /* <----- End of handle upload files -----> */

    /* <-----Handle LogOut button -----> */
    const handleLogOut = async () => {
        try {
            const response = await logOut();

            if (!response?.error) {
                navigate('/');
            }

        } catch (error) {
            return error;
        }
    }
    /* <----- End  of handle logout button -----> */

    return (
        <header>
            <nav className="bg-blue-600 text-white py-4 px-10 flex justify-between items-center gap-9">
                <h1 className="text-3xl font-bold">File Uploader</h1>

                <div className="w-auto gap-10 btn-con flex  flex-wrap items-center sm:flex-nowrap">
                    <label
                        className="bg-white text-blue-600 border-blue-300 cursor-pointer rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2 px-8 py-2">
                        <GoUpload />
                        <span
                        >Upload File</span>
                        <input
                            onChange={handleFileChangeInput}
                            type="file"
                            className="cursor-pointer hidden"
                        />
                    </label>

                    <div className="new-folder">
                        <input
                            type="text"
                            className="hidden" />
                        <button
                            className="bg-blue-400 text-white border-blue-300 cursor-pointer rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2 px-8 py-2"> <FiPlus /><span>New Folder</span></button>
                    </div>

                    <a onClick={handleLogOut}
                        className="underline text-black hover:text-white transition-all duration-200 ease-in cursor-pointer"> Logout</a>
                </div>
            </nav>
        </header>
    )
}

