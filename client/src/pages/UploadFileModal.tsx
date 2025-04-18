import { Action } from "../hooks/types";
import { uploadFile } from "../components/uploadFile";
import { getData } from "../components/getData";
import { folder } from "../components/folder";
type Props = {
    dispatch: React.Dispatch<Action>,
    currentFolderId: number | null
}

export const UploadFileModal = ({ dispatch, currentFolderId }: Props) => {

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const inputValue = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement
        const file = inputValue.files![0];

        if (!file) {
            alert('Please select a file');
            return;
        }

        await uploadFile({ file, currentFolderId });

        const folderContents = await folder(currentFolderId || null);

        if (folderContents) {
            dispatch({ type: 'SET_FILE_FOLDER_DATA', payload: folderContents });
        }

        const fetchUpdatedData = await getData();
        dispatch({ type: 'SET_FILE_FOLDER_DATA', payload: fetchUpdatedData });
        dispatch({ type: 'SHOW_MODAL', payload: { showModal: false, type: null } })
    }


    const closeModal = () => {
        console.log("Closing modal...");

        dispatch({ type: 'SHOW_MODAL', payload: { showModal: false, type: null } });
    }
    return (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-transparent opacity-95 z-50">
            <form
                onSubmit={handleUpload}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-xl flex flex-col gap-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-center text-black">Upload File</h2>

                <input type="file" className="file-input file-input-neutral" />

                <div className="btn-con flex justify-between text-sm gap-4">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-md outline-none border-none w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-300">Upload File</button>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="cursor-pointer rounded-md outline-none border-none w-full py-2 px-4 border bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-all duration-300">Cancel</button>
                </div>
            </form>
        </div>)
}
