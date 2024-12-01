import { statusCode as code } from "./../../infrastructure/config/status-code";
import { AppError } from "../../infrastructure/config/errors/app-error";

export class EntityValidationError extends AppError {
    constructor(public message: string, statusCode: number = code.UNPROCESSABLE_ENTITY){
        super(message, statusCode);
        this.name = "Entity Validation Error";
    }
}