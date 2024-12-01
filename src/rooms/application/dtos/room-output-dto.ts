import { OutputMapperDTO } from "../../../shared/application/dtos/output-mapper-dto";
import { PlayerRoomProps, RoomEntity } from "../../domain/entities/rooms/room-entity";

export type RoomOutput = {
    room: RoomEntity;
}

export class RoomOutputDTO implements OutputMapperDTO<RoomEntity, RoomOutput> {
    toOutput(entity: RoomEntity): RoomOutput {
        return { room: entity }
    }
}