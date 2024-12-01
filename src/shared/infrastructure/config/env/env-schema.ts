import z from "zod";

export const schema = z.object({
    port: z.number().default(3000),
    databaseUrl: z.string(),
    jwtSecret: z.string(),
    jwtExpiresIn: z.string(),
});