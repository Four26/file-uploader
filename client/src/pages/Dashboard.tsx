import { Dispatch, useCallback, useEffect } from "react";
import { getData } from "../components/getData";
import { Action, State } from "../hooks/types";
import { CreateFolderModal } from "./CreateFolderModal";
import { UploadFileModal } from "./UploadFileModal";
import { folder } from "../components/folder";
import { useNavigate, useParams } from "react-router-dom";


import { Sidebar } from "../components/dashboard/Sidebar";
import { Username } from "../components/dashboard/Username";
import { FileFolder } from "../components/dashboard/FileFolder";

type Props = {
    state: State;
    dispatch: Dispatch<Action>;
};



export const Dashboard = ({ state, dispatch }: Props) => {
    const navigate = useNavigate();
    const { folderId } = useParams();

    const currentItems = state.fileFolderData.data.filter((item) => {
        if (!folderId) {
            return item.type === "folder" ? item.parent_id === null : item.folder_id === null;
        }
        return item.type === "folder" ? item.parent_id === Number(folderId) : item.folder_id === Number(folderId);
    });

    const createFolder = () => dispatch({ type: "SHOW_MODAL", payload: { showModal: true, type: "create" } });
    const uploadFile = () => dispatch({ type: "SHOW_MODAL", payload: { showModal: true, type: "upload" } });
    const folderName = state.folderName.folderName;

    const handleFolderClick = async (folderId: number) => {
        try {
            dispatch({ type: "CURRENT_FOLDER", payload: { currentFolderId: folderId } });
            dispatch({ type: "ADD_TO_HISTORY", payload: folderId });

            const folderContents = await folder(folderId);

            if (folderContents) {
                dispatch({ type: "SET_FILE_FOLDER_DATA", payload: folderContents });
            }

            navigate(`/dashboard/folders/${folderId}`);
        } catch (error) {
            console.error("Error opening folder", error);
        }
    };

    const loadData = useCallback(async () => {
        try {
            const username = await getData();
            dispatch({ type: "DISPLAY_USERNAME", payload: { username: username.user.username } });

            const contentData = folderId ? await folder(Number(folderId)) : await getData();
            dispatch({ type: 'SET_FILE_FOLDER_DATA', payload: contentData });
        } catch (error) {
            console.error('Failed to load data:', error);
            return error
        }
    }, [folderId, dispatch]);


    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar createFolder={createFolder} uploadFile={uploadFile} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Username */}
                <Username state={state} />

                {/* File/Folder List */}
                <FileFolder currentItems={currentItems} folderId={folderId} createFolder={createFolder} uploadFile={uploadFile} handleFolderClick={handleFolderClick} />
            </div>

            {/* Modals */}
            {state.showModal.type === "create" && (
                <CreateFolderModal
                    dispatch={dispatch}
                    folderName={folderName}
                    currentFolderId={folderId ? Number(folderId) : null}
                    onSuccess={loadData}
                />
            )}
            {state.showModal.type === "upload" && (
                <UploadFileModal dispatch={dispatch} currentFolderId={folderId ? Number(folderId) : null} />
            )}
        </div>
    );
};