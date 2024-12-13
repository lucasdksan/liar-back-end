import { EntityValidationError } from "../../../../../shared/domain/errors/entity-validation-error";
import { ModelMapper } from "../../../../../shared/infrastructure/database/models/model-mapper";
import { RoomEntity } from "../../../../domain/entities/room-entity";
import { MemoryRoomProps } from "../memory-room/memory-room-database";

export class RoomModelMapper extends ModelMapper<MemoryRoomProps, RoomEntity> {
    toEntity(model: MemoryRoomProps | null): RoomEntity {
        if(!model) throw new EntityValidationError("An entity not be loaded");

        const data = {
            clearedToEnter: model.clearedToEnter,
            player: model.player
        };

        try {
            return new RoomEntity(data, model.id);
        } catch (error) {
            throw new EntityValidationError("An entity not be loaded");
        }
    }
}