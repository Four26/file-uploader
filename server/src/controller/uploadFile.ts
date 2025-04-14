import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();

export const uploadFile = expressAsyncHandler(async (req: Request, res: Response) => {
    const file = req.file;
    const user = req.user as users;

    if (!file) {
        res.status(400).json({ message: 'No file uploaded!' });
        return;
    }

    const fileUrl = `${process.env.SERVER_URL}/uploads/${file?.filename}`;

    const response = await prisma.file.create({
        data: {
            name: file.filename,
            size: file.size,
            uploaded_at: new Date(),
            file_path: file.path,
            file_url: fileUrl,
            folder_id: null,
            user_id: user.id
        }
    });
    res.status(200).json({ message: 'Successfully uploaded file!', file: response });
})