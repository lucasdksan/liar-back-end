import { PrismaService } from "../../../../../shared/infrastructure/database/prisma/prisma";
import { PlayerEntity } from "../../../../domain/entities/players/player-entity";
import { PlayerRepository } from "../../../../domain/repositories/player-repository";

export class PlayerPrismaRepository implements PlayerRepository {
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    async findById(id: string): Promise<PlayerEntity> {
        throw new Error("Method not implemented.");
    }
}