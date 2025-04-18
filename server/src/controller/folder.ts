import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const folder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { folderId } = req.params;
    console.log(folderId);
    try {
        if (folderId === 'null') {
            const files = await prisma.file.findMany({
                where: { folder_id: null }
            });
            const folders = await prisma.folder.findMany({
                where: { parent_id: null }
            });
        } else {
            const files = await prisma.file.findMany({
                where: { folder_id: Number(folderId) }
            });
            const folders = await prisma.folder.findMany({
                where: { parent_id: Number(folderId) }
            });

            res.status(200).json({ files, folders });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error navigating to folder', error: error })
        return;
    }
});