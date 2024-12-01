import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomLogger } from "./logger/custom-logger-provider";
import { loggerFactory } from "./logger/logger-factory-provider";

export class JwtProvider {
    private readonly secret: string;
    private readonly expiresIn: string;
    private readonly logger: CustomLogger;

    constructor(secret: string, expiresIn: string = "1h") {
        this.secret = secret;
        this.expiresIn = expiresIn;
        this.logger = loggerFactory();
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token: string): JwtPayload | string | null {
        try {
            return jwt.verify(token, this.secret);
        } catch (err) {
            this.logger.error(`Error in verify token: ${err}`);
            return null;
        }
    }
}