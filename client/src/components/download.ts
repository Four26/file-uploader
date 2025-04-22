import { URL } from "../api/URL";
export const download = async (id: number) => {
    try {
        const response = await fetch(`${URL}/download/${id}`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.blob();
        if (!response.ok) {
            throw new Error(`Error sending file data to download in the server ${response.status}`);
        }

        let filename = 'downloaded_file';

        //Extract the file name
        const disposition = response.headers.get('Content-Disposition');
        console.log(disposition);
        if (disposition && disposition.includes('filename=')) {
            const match = disposition.match(/filename="?(.+?)"?$/);
            if (match) {
                filename = match[1];
            }
        }

        //Creates a temporary url representing the BLOB data
        const url = window.URL.createObjectURL(data);

        //Set the url href attribute of the anchor element
        const a = document.createElement('a');
        a.href = url;

        //Set the download attribute of the anchor element to the file name
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        //Release the temporary url
        window.URL.revokeObjectURL(url);

        return data;
    } catch (error) {
        throw new Error(`Error downloading file. ${error}`)
    }
}
