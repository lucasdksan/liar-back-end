import { AppError } from "../../infrastructure/config/errors/app-error";
import { statusCode as code } from "./../../infrastructure/config/status-code";

export class NotFoundError extends AppError {
    constructor(public message: string, statusCode: number = code.NOT_FOUND) {
        super(message, statusCode);
        this.name = "NotFoundError";
    }
}