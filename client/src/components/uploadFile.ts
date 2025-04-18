import { URL } from "../api/URL";

type Props = {
    file: File
    currentFolderId: number | null
}

export const uploadFile = async ({ file, currentFolderId }: Props) => {
    const fileData = new FormData();
    fileData.append('file', file);

    if (currentFolderId) {
        fileData.append('folder_id', currentFolderId.toString());
    }

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
