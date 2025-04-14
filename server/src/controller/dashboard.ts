import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { PrismaClient, users } from "@prisma/client";

const prisma = new PrismaClient();
export const dashboard = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = req.user as users
    const getFile = await prisma.file.findMany({
        where: {
            user_id: user.id
        }
    });
    res.status(200).json({ message: 'These are the files', file: getFile });
    return;
});