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
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "No token provided",
        });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "Token error",
        });
    }

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema)) {
        return res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "Token malformatted",
        });
    }

    const decoded = jwtProvider.verifyToken(token);

    if (!decoded || typeof decoded !== "object" || !("sub" in decoded)) {
        return res.status(statusCode.UNAUTHORIZED).json({
            status: "error",
            message: "Invalid token",
        });
    }

    req.UserId = decoded.sub as string;
    next();
}