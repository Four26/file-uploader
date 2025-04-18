import { IconType } from "react-icons";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileArchive, FaFileVideo, FaFileAudio, FaFileAlt, FaImage } from "react-icons/fa";
import { AiOutlineFileGif } from "react-icons/ai";


// export const isImageFile = (filename: string) => {
//     return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);
// }

//Function to get the file type
export const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || "";

    const fileIcons: Record<string, IconType> = {
        pdf: FaFilePdf,
        doc: FaFileWord,
        docx: FaFileWord,
        xls: FaFileExcel,
        xlsx: FaFileExcel,
        zip: FaFileArchive,
        rar: FaFileArchive,
        "7z": FaFileArchive,
        mp4: FaFileVideo,
        avi: FaFileVideo,
        mov: FaFileVideo,
        mp3: FaFileAudio,
        wav: FaFileAudio,
        txt: FaFileAlt,
        png: FaImage,
        jpg: FaImage,
        jpeg: FaImage,
        gif: AiOutlineFileGif,
        default: FaFileAlt
    };

    return fileIcons[ext] || fileIcons["default"];
}
