import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function getParentFolders(folderId: number): Promise<Array<{ name: string }>> {
    const parents = [];
    let currentId = folderId;

    while (currentId) {
        const folder = await prisma.folder.findUnique({
            where: { id: currentId },
            select: { name: true, parent_id: true }
        });

        if (!folder) break;

        parents.unshift({ name: folder.name });
        currentId = folder.parent_id || 0;
    }

    return parents;
}

export const createFolder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { folderName, parent_id } = req.body;
    const user = req.user as users;

    try {
        const baseFolderPath = path.join(__dirname, "../folders");

        let parentPath = baseFolderPath;

        if (parent_id) {
            const parentFolders = await getParentFolders(parent_id);

            parentPath = path.join(baseFolderPath, ...parentFolders.map(f => f.name))
            await fs.promises.mkdir(parentPath, { recursive: true });
        };

        let finalFolderName = folderName || "New Folder";
        let counter = 1;
        let fullPath = path.join(parentPath, finalFolderName);

        while (fs.existsSync(fullPath)) {
            finalFolderName = `${folderName || "New Folder"}(${counter})`;
            fullPath = path.join(parentPath, finalFolderName);
            counter++;
        }

        await fs.promises.mkdir(fullPath);

        const folderData = await prisma.folder.create({
            data: {
                name: finalFolderName,
                parent_id: parent_id || null,
                created_at: new Date(),
                updated_at: new Date(),
                user_id: user.id
            }
        });

        if (parent_id) {
            await prisma.folder.update({
                where: { id: parent_id },
                data: { updated_at: new Date() }
            });
        }

        console.log("Creating folder with data:", {
            name: finalFolderName,
            parent_id: parent_id || null,
            user_id: user.id
        });

        res.status(200).json({ message: 'Folder created', folder: folderData });
        return;
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ message: "Failed to create folder", error: error.message });
            return;
        } else {
            res.status(500).json({ message: "Failed to create folder", error: "Unknown error" });
            return;
        }
    }
});