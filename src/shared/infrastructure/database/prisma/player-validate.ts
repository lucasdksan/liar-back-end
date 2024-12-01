import { ConflictError } from "../../../domain/errors/conflict-error";
import { NotFoundError } from "../../../domain/errors/not-found-error";
import { PrismaService } from "./prisma";

export class PlayerValidate {
    constructor(private readonly prisma: PrismaService) {}

    async validate(userId: string){
        if(!userId || typeof userId !== "string") throw new ConflictError("User Id invalid");
        
        try {
            const player = await this.prisma.users.findUnique({
                where: { id: userId }
            });

            if(!player) throw new NotFoundError("Player not exist!");
            if(!player.valid) throw new ConflictError("Player invalid!");
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new NotFoundError("Failed to validate player");
        }
    }
}