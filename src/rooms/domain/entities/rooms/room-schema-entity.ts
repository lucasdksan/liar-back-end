import { z } from "zod";

export const schema = z.object({
    hostId: z.string(),
});