import { RoomEntity } from "../../../../domain/entities/rooms/room-entity";
import { RoomRepository } from "../../../../domain/repositories/room-repository";

export class RoomInMemoryRepository implements RoomRepository {
    private rooms: Map<string, RoomEntity> = new Map();

    async create(room: RoomEntity): Promise<void> {
        this.rooms.set(room.id, room);
    }

    async findById(id: string): Promise<RoomEntity | null> {
        return this.rooms.get(id) || null;
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