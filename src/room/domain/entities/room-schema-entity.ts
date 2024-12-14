import { z } from "zod";

export const schema = z.object({
    player: z.object({ 
        id: z.string(),
        nickname: z.string(),
        socketId: z.string(),
    }).optional(),
    clearedToEnter: z.boolean(),
});