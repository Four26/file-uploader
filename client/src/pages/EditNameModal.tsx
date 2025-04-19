import { Dispatch, FormEvent, useState } from "react"
import { Action, FileFolderItem } from "../hooks/types"
import { editName } from "../components/editName"

type Props = {
    dispatch: Dispatch<Action>,
    item: FileFolderItem
    onSuccess: () => Promise<unknown>
}
export const EditNameModal = ({ dispatch, item, onSuccess }: Props) => {
    const lastDotIndex = item.name.lastIndexOf('.');
    const hasExtension = lastDotIndex > 0;
    const originalName = hasExtension ? item.name.substring(0, lastDotIndex) : item.name;
    const extension = hasExtension ? item.name.substring(lastDotIndex) : '';

    const [newName, setNewName] = useState(originalName);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const fullNewName = newName + extension;
            await editName(item.id, item.type, fullNewName);
            dispatch({ type: 'SHOW_MODAL', payload: { showModal: false, type: '' } });
            if (onSuccess) {
                await onSuccess();
            }
        } catch (error) {
            console.error('Error submiting the form', error);
            return error;
        }
    }

    const closeModal = () => {
        dispatch({ type: 'SHOW_MODAL', payload: { showModal: false, type: "" } });
    }
    return (
        <div className="fixed inset-0 top-0 left-0 w-full h-full bg-transparent opacity-95 z-50">
            <form
                onSubmit={handleSubmit}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-xl flex flex-col gap-6 max-w-sm w-full">
                <h2 className="text-xl font-semibold text-center text-black">Edit Name</h2>
                <input
                    type="text"
                    name="folderName"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                    className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="btn-con flex justify-between text-sm gap-4">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-md outline-none border-none w-full py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700 transition-all duration-300">Save</button>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="cursor-pointer rounded-md outline-none border-none w-full py-2 px-4 border bg-gray-200 text-black font-semibold hover:bg-gray-300 transition-all duration-300">Cancel</button>
                </div>
            </form>
        </div>
    )
}
