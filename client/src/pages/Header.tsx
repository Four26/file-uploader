import { FiPlus } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { useHandleLogOut } from "../components/useHandleLogOut";
import { handleFileChangeInput } from "../components/handleFileChangeInput";
import { CreateFolderModal } from "./CreateFolderModal";
import { useReducerHook } from "../hooks/useReducerHook";

export const Header = () => {
    const [state, dispatch] = useReducerHook();

    const fileChangeInput = handleFileChangeInput;
    const logOut = useHandleLogOut();

    const createFolder = () => dispatch({ type: 'SHOW_CREATE_FOLDER_MODAL', payload: { showCreateFolderModal: true } });
    const folderName = state.folderName.folderName;


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
                            onChange={fileChangeInput}
                            type="file"
                            className="cursor-pointer hidden"
                        />
                    </label>

                    <div className="new-folder">
                        <button
                            onClick={createFolder}
                            className="bg-blue-400 text-white border-blue-300 cursor-pointer rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2 px-8 py-2"> <FiPlus /><span>New Folder</span></button>
                    </div>

                    <a onClick={logOut}
                        className="underline text-black hover:text-white transition-all duration-200 ease-in cursor-pointer"> Logout</a>
                </div>
            </nav>
            {state.showCreateFolderModal.showCreateFolderModal && <CreateFolderModal dispatch={dispatch} folderName={folderName} />}
        </header>
    )
}

