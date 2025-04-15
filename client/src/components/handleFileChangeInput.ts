import { uploadFile } from "./uploadFile";

/* <----- Handle upload files -----> */
export const handleFileChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
        const response = await uploadFile({ file: files[0] });
        console.log(response.message, response.file);
        return;
    }
}