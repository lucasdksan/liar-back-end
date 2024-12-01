import { statusCode as code } from "./../../infrastructure/config/status-code";
import { AppError } from "../../infrastructure/config/errors/app-error";

export class BadRequestError extends AppError {
    constructor(public message: string, statusCode: number = code.BAD_REQUEST){
        super(message, statusCode);
        this.name = "BadRequestError";
    }
}