import { Request, Response, NextFunction } from "express";
import { AppError } from "../config/errors/app-error";
import { statusCode } from "../config/status-code";

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "Internal Server Error",
        });
        return;
    }
};