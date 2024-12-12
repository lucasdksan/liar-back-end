import { z } from "zod";

export const schema = z.object({
    players: z.array(z.object({ 
        id: z.string(),
        nickname: z.string(),
    })),
    open: z.boolean()
});