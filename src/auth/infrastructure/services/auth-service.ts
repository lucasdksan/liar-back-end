import { JwtPayload } from "jsonwebtoken";
import { JwtProvider } from "../../../shared/infrastructure/providers/jwt/jwt-provider";

export class AuthService {
    constructor(
        private readonly jwtProvider: JwtProvider,
    ){}

    login(user: { id: string; email: string; }): string{
        const payload = { sub: user.id, email: user.email };

        return this.jwtProvider.generateToken(payload);
    } 

    validateToken(token: string): JwtPayload | null {
        const decoded = this.jwtProvider.verifyToken(token);

        if (typeof decoded === "object" && decoded !== null) {
            return decoded as JwtPayload;
        }

        return null;
    }
}