import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const editName = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id, type, newName } = req.body;
    console.log(`Data: ${id}, ${type}, ${newName}`);

    if (type === 'file') {
        const updateFile = await prisma.file.update({
            where: {
                id: id
            },
            data: { name: newName }
        });
        res.status(200).json({ message: 'Successfully updated the file name!', file: updateFile });
    } else if (type === 'folder') {
        const updateFolder = await prisma.folder.update({
            where: {
                id: id
            },
            data: { name: newName }
        });
        res.status(200).json({ message: 'Successfully updated the folder name!', folder: updateFolder });
    }
});