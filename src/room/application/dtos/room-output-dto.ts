import { OutputMapperDTO } from "../../../shared/application/dtos/output-mapper-dto";
import { PlayerProps, RoomEntity } from "../../domain/entities/room-entity";

export type RoomOutput = {
    clearedToEnter: boolean; 
    player: PlayerProps;
    id: string;
}

export class RoomOutputDTO implements OutputMapperDTO<RoomEntity, RoomOutput> {
    toOutput(entity: RoomEntity): RoomOutput {
        const { id, clearedToEnter, player } = entity.toJSON();

        return { clearedToEnter, player, id };
    }
}