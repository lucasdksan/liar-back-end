import { RoomEntity } from "../entities/room-entity";

export interface RoomRepository {
    insert(room: RoomEntity): Promise<void>;
    findById(id: string): Promise<RoomEntity>;
    findAll(): Promise<RoomEntity[]>;
    update(room: RoomEntity): Promise<void>;
    delete(id: string): Promise<void>;
}