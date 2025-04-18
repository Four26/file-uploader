import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { folder } from "./folder";

const prisma = new PrismaClient();

export const deleteData = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type } = req.body;

    try {
        if (type === 'file') {
            const deleteFile = await prisma.file.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ message: 'Successfully deleted file!' });
        } else if (type === 'folder') {
            const deleteFolder = await prisma.folder.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ message: 'Successfully deleted folder!' });
        } else {
            res.status(400).json({ message: 'Invalid type!' });
        }
    } catch (error) {
        console.error('Error deleting data', error);
        res.status(500).json({ message: 'Internal server error', error: error });
        return;
    }
})