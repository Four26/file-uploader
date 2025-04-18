import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();
export const dashboard = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = req.user as users
    const getFile = await prisma.file.findMany({
        where: { user_id: user.id },
        orderBy: { uploaded_at: 'desc' }
    });
    const getFolder = await prisma.folder.findMany({
        where: { user_id: user.id },
        orderBy: { created_at: 'desc' }
    });

    const taggedFile = getFile.map(data => ({ ...data, type: 'file', folder_id: data.folder_id, parent_id: null }));
    const taggedFolder = getFolder.map(data => ({ ...data, type: 'folder', folder_id: null, parent_id: data.parent_id }));
    const mergedData = [...taggedFile, ...taggedFolder];
    res.status(200).json({ message: 'These are the files', data: mergedData, user: user });
    return;
});