import { ChangeEvent, Dispatch } from "react";
import { uploadFile } from "./uploadFile";
import { Action } from "../hooks/types";
import { getData } from "./getData";
type Props = {
    e: ChangeEvent<HTMLInputElement>
    dispatch: Dispatch<Action>
}

/* <----- Handle upload files -----> */
export const handleFileChangeInput = async ({ e, dispatch }: Props) => {
    const files = e.target.files;

    if (files) {
        const response = await uploadFile({ file: files[0], currentFolderId: null });
        console.log(response.message, response.file);
    }

    const fetchData = await getData();
    dispatch({ type: 'SET_FILE_FOLDER_DATA', payload: fetchData });
}