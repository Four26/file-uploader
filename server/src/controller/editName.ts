import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
export const editName = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id, type, name } = req.body;
    console.log(`Data: ${id}, ${type}, ${name}`);
});