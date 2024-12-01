import { z } from "zod";

export const schema = z.object({
    email: z.string().email(),
    nickname: z.string(),
    password: z.string(),
    valid: z.boolean(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});