import { z } from "zod";

export const schema = z.object({
    socketId: z.string(),
    nickname: z.string(),
});