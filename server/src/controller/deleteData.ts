import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const deleteFolderDIR = async (name: string) => {
    const basePath = path.join(__dirname, '..', 'folders', name);

    try {
        await fs.promises.rm(basePath, { recursive: true, force: true });
    } catch (error) {
        throw new Error(`Error deleting folder in directory. ${error}`)
    }
}

const deleteFileDIR = async (name: string) => {
    const basePath = path.join(__dirname, '..', 'uploads', name);

    try {
        await fs.promises.rm(basePath, { recursive: true, force: true });
    } catch (error) {
        throw new Error(`Error deleting file in directory. ${error}`)
    }
}


export const deleteData = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, name } = req.body;

    try {
        if (type === 'file') {
            const deleteFile = await prisma.file.delete({
                where: { id: parseInt(id) }
            });

            //Delete file in the directory app
            await deleteFileDIR(name);

            res.status(200).json({ message: 'Successfully deleted file!' });
        } else if (type === 'folder') {
            const deleteFolder = await prisma.folder.delete({
                where: { id: parseInt(id) }
            });

            //Delete folder in the directory app
            await deleteFolderDIR(name);

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