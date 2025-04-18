import { Action } from "../hooks/types";
import { createFolder } from "../components/createFolder";
import { folder } from "../components/folder";
import { getData } from "../components/getData";
type Props = {
    dispatch: React.Dispatch<Action>,
    folderName: string
    currentFolderId: number | null
    onSuccess: () => void
}

export const CreateFolderModal = ({ dispatch, folderName, currentFolderId, onSuccess }: Props) => {
    const folderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        dispatch({ type: 'SET_FOLDER_NAME', payload: { folderName: inputValue } })
        console.log(inputValue);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await createFolder(folderName, currentFolderId);



            let updatedData;

            if (currentFolderId !== null) {
                updatedData = await folder(currentFolderId);
            } else {
                updatedData = await getData();
            }

            if (updatedData) {
                dispatch({ type: 'SET_FILE_FOLDER_DATA', payload: updatedData });
            }
            if (onSuccess) {
                onSuccess();
            }
            dispatch({ type: 'SET_FOLDER_NAME', payload: { folderName: '' } });
            dispatch({ type: 'SHOW_MODAL', payload: { showModal: false, type: "" } });



        } catch (error) {
            console.log('Error creating folder', error);
            return error;
        }
    }

    const closeModal = () => {
        console.log("Closing modal...");

        dispatch({ type: 'SHOW_MODAL', payload: { showModal: false, type: "" } });
    }
    return (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-transparent opacity-95 z-50">
            <form
                onSubmit={handleSubmit}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-xl flex flex-col gap-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-center text-black">Create New Folder</h2>
                <input
                    type="text"
                    name="folderName"
                    value={folderName}
                    onChange={folderInput}
                    autoFocus
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="btn-con flex justify-between text-sm gap-4">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-md outline-none border-none w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-300">Create Folder</button>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="cursor-pointer rounded-md outline-none border-none w-full py-2 px-4 border bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-all duration-300">Cancel</button>
                </div>
            </form>
        </div>)
}
