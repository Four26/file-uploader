import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);  // Get the file extension
        const basename = path.basename(file.originalname, extname);  // Get the base name without extension
        let name = `${basename}${extname}`;
        let counter = 1;

        while (fs.existsSync(path.join(uploadPath, name))) {
            name = `${basename}(${counter})${extname}`;
            counter++;
        }
        return cb(null, name);
    }
});

const upload = multer({ storage: storage });

export const multerMiddleware = () => upload.single('file');
