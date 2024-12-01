import { Entity } from "../../../../shared/domain/entities/entity";
import { ConflictError } from "../../../../shared/domain/errors/conflict-error";
import { EntityValidationError } from "../../../../shared/domain/errors/entity-validation-error";
import { schema } from "./room-schema-entity";

export type RoomProps = {
    hostId: string;
}

export type PlayerRoomProps = {
    id: string;
    nickname: string;
    socketId: string;
}

export class RoomEntity extends Entity<RoomProps> {
    private players: PlayerRoomProps[] = [];

    constructor(public props: RoomProps, id?: string){
        super(props, id);

        RoomEntity.validate(props);
    }

    addPlayer(player: PlayerRoomProps) {
        if(this.players.length > 4) throw new ConflictError("The room is complete");

        this.players.push(player);
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }

    getPlayers(): PlayerRoomProps[] {
        return this.players;
    }

    getPlayer(id: string): PlayerRoomProps {
        const index = this.players.findIndex((player) => player.id === id);
        
        return this.players[index];
    }

    isEmpty(): boolean {
        return this.players.length === 0;
    }

    static validate(props: RoomProps) {
        const result = schema.safeParse(props);

        if (!result.success) {
            throw new EntityValidationError(`Validation error: ${result.error.message}`);
        }
    }
}