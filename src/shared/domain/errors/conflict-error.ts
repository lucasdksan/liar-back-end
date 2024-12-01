import { statusCode as code } from "./../../infrastructure/config/status-code";
import { AppError } from "../../infrastructure/config/errors/app-error";

export class ConflictError extends AppError {
    constructor(public message: string, statusCode: number = code.CONFLICT ) {
        super(message, statusCode);
        this.name = "ConflictError";
    }
}