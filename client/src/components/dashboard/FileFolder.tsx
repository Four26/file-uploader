import React from 'react'
import { FaFolder } from 'react-icons/fa';
import { HiOutlineFolderAdd } from 'react-icons/hi';
import { TbFileUpload } from 'react-icons/tb';
import { FileFolderData } from '../../hooks/types';
import { getFileIcon } from '../fileTypes';
import { formatBytes } from '../formatBytes';

type Props = {
    currentItems: FileFolderData['data'],
    folderId: string | undefined,
    createFolder: () => void,
    uploadFile: () => void
    handleFolderClick: (folderId: number) => void
}

export const FileFolder = ({ currentItems, folderId, createFolder, uploadFile, handleFolderClick }: Props) => {
    return (
        <div className="flex-1 overflow-auto p-6">
            {currentItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaFolder className="text-5xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {!folderId ? "Your Drive is empty" : "This folder is empty"}
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md">
                        {!folderId
                            ? "Get started by uploading files or creating folders"
                            : "Add files or create subfolders to get started"}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={createFolder}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <HiOutlineFolderAdd />
                            New Folder
                        </button>
                        <button
                            onClick={uploadFile}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <TbFileUpload />
                            Upload Files
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Modified
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            {item.type === "file" ? (
                                                <div className="text-gray-500">
                                                    {React.createElement(getFileIcon(item.name), { className: "text-xl" })}
                                                </div>
                                            ) : (
                                                <FaFolder
                                                    onClick={() => handleFolderClick(item.id)}
                                                    className="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500 transition-colors"
                                                />
                                            )}
                                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatBytes(item.size)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(item.type === "file" ? item.uploaded_at : item.created_at).toLocaleDateString("en-SG", {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-3">
                                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                                                Share
                                            </button>
                                            <button
                                                className="text-gray-600 hover:text-gray-800 transition-colors">
                                                Rename
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 transition-colors">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>)
}
