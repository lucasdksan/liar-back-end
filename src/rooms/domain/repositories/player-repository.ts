import { PlayerEntity } from "../entities/players/player-entity";

export interface PlayerRepository {
    findById(id: string): Promise<PlayerEntity>;
}