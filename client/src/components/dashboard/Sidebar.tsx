import { HiOutlineFolderAdd } from "react-icons/hi";
import { TbFileUpload } from "react-icons/tb";

type Props = {
    createFolder: () => void,
    uploadFile: () => void
}

export const Sidebar = ({ createFolder, uploadFile }: Props) => {
    return (
        <div className="sm:w-64 bg-white border-rborder-gray-200 p-4 flex">
            <div className="border-red-400 w-full flex items-center justify-around sm:block sm:space-y-2">
                <button
                    onClick={createFolder}
                    className="cursor-pointer flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-colors border border-gray-200 sm:w-full"
                >
                    <HiOutlineFolderAdd className="text-lg text-blue-500" />
                    <span>New Folder</span>
                </button>

                <button
                    onClick={uploadFile}
                    className="cursor-pointer flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg bg-white text-gray-700 hover:bg-blue-50 transition-colors border border-gray-200 sm:w-full"
                >
                    <TbFileUpload className="text-lg text-blue-500" />
                    <span>Upload File</span>
                </button>
            </div>

        </div>)
}
