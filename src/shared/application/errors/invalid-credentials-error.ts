import { statusCode as code } from "./../../infrastructure/config/status-code";
import { AppError } from "../../infrastructure/config/errors/app-error";

export class InvalidCredentialsError extends AppError {
    constructor(public message: string, statusCode: number = code.UNAUTHORIZED){
        super(message, statusCode);
        this.name = "InvalidCredentialsError";
    }
}