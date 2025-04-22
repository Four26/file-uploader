import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export const download = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const getFile = await prisma.file.findUnique({
        where: { id: parseInt(id) }
    });


    if (!getFile || !fs.existsSync(getFile.file_path)) {
        res.status(404).json({ message: 'File not found!' });
        return
    }

    // Set required headers to get the file name
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.download(getFile.file_path, getFile.name);
});