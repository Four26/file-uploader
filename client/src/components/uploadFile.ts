import { URL } from "../api/URL";

type InputFileData = {
    file: File
}

export const uploadFile = async ({ file }: InputFileData) => {
    const fileData = new FormData();
    fileData.append('file', file);
    try {
        const response = await fetch(`${URL}/uploadFile`, {
            method: 'POST',
            credentials: 'include',
            body: fileData
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
