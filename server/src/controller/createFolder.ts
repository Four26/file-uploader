import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

const generateUniqueFolderName = (basePath: string, baseName: string) => {
    let name = baseName;
    let counter = 1;

    while (fs.existsSync(path.join(basePath, name))) {
        name = `${baseName}(${counter})`;
        counter++;
    }
    return name;
}

export const createFolder = expressAsyncHandler(async (req: Request, res: Response) => {
    const { folderName, parent_id } = req.body;
    const user = req.user as users;

    try {
        const baseFolderPath = path.join(__dirname, "../folders");
        const parentFolder = parent_id ? await prisma.folder.findUnique({ where: { id: parent_id } }) : null;
        const parentPath = parentFolder ? path.join(baseFolderPath, parentFolder.name) : baseFolderPath;
        const defaultFolderName = folderName || "New Folder";
        const finalFolderName = generateUniqueFolderName(parentPath, defaultFolderName);
        const fullPath = path.join(parentPath, finalFolderName);

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