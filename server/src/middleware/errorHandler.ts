import { Request, Response, NextFunction } from "express";

type Props = {
    err: Error;
    req: Request;
    res: Response;
    next: NextFunction
}
export const errorHandler = ({ err, req, res, next }: Props) => {
    const errStack = err.stack;
    const errMessage = err.message;
    console.log(errStack);
    console.log(errMessage);

    res.status(500).json({
        message: errMessage,
        stack: errStack
    });
}   