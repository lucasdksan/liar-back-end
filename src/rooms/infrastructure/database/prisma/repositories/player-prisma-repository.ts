import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { PrismaService } from "../../../../../shared/infrastructure/database/prisma/prisma";
import { PlayerRepository, TPlayer } from "../../../../domain/repositories/player-repository";
import { userConvertToPlayer } from "../models/player-model";

export class PlayerPrismaRepository implements PlayerRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async findById(id: string): Promise<TPlayer> {
        try {
            const player = await this.prismaService.users.findUnique({
                where: { id }
            });
    
            if(!player) throw new NotFoundError(`Player not found usind id: ${id}`);
    
            return userConvertToPlayer(player);
        } catch (error) {
            throw new NotFoundError(`Player not found usind id: ${id}`);
        }
    }
}