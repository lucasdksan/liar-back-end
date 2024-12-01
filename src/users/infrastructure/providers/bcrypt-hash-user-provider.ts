
import { compare, hash, genSalt } from "bcryptjs";
import { HashProvider } from "../../../shared/infrastructure/providers/hash-provider";

export class BcryptjsHashUserProvider implements HashProvider {
    async generateHash(payload: string): Promise<string> {
        const salt = await genSalt();

        return hash(payload, salt);
    }

    async compareHash(payload: string, hash: string): Promise<boolean> {
        return compare(payload, hash);
    }
}