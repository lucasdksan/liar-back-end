import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../shared/infrastructure/config/status-code";
import { JwtProvider } from "../../../shared/infrastructure/providers/jwt-provider";

export interface AuthenticatedRequest extends Request {
    UserId?: string;
}

const jwtProvider = new JwtProvider(process.env.JWT_SECRET as string);

export const authHandlerMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void  => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "No token provided",
        });
        return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "Token error",
        });
        return;
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "Token malformatted",
        });
        return;
    }

    const decoded = jwtProvider.verifyToken(token);

    if (!decoded || typeof decoded !== "object" || !("sub" in decoded)) {
        res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "Invalid token",
        });

        return;
    }

    req.UserId = decoded.sub as string;
    next();
}