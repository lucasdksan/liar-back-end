import { RoomEntity } from "../entities/rooms/room-entity";

export interface RoomRepository {
    create(room: RoomEntity): Promise<void>;
    findById(id: string): Promise<RoomEntity | null>;
    update(room: RoomEntity): Promise<void>;
    delete(id: string): Promise<void>;
}