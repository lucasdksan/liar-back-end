import { z } from "zod";
import dotenv from "dotenv";
import { IEnv } from "./env-interface";
import { schema } from "./env-schema";

export class EnvConfig implements IEnv {
    private config: z.infer<typeof schema>;

    constructor() {
        dotenv.config();

        this.config = schema.parse({
            port: Number(process.env.PORT),
            databaseUrl: String(process.env.DATABASE_URL),
        });
    }
    
    getDatabaseUrl(): string {
        return this.config.databaseUrl;
    }

    getPort(): number {
        return this.config.port;
    }
    
}