import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { RoomEntity } from "../../../../domain/entities/rooms/room-entity";
import { RoomRepository } from "../../../../domain/repositories/room-repository";

export class RoomInMemoryRepository implements RoomRepository {
    private rooms: Map<string, RoomEntity> = new Map();

    async create(room: RoomEntity): Promise<void> {
        this.rooms.set(room.id, room);
    }

    async findById(id: string): Promise<RoomEntity> {
        const room = this.rooms.get(id);

        if(!room) throw new NotFoundError("Room not exist");

        return room;
    }

    async update(room: RoomEntity): Promise<void> {
        if(this.rooms.has(room.id)) {
            this.rooms.set(room.id, room);
        }
    }

    async delete(id: string): Promise<void> {
        this.rooms.delete(id);
    }
}