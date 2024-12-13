import { RoomEntity } from "../../../../domain/entities/room-entity";
import { RoomRepository } from "../../../../domain/repositories/room-repository";
import { MemoryRoomDatabase } from "../memory-room/memory-room-database";
import { RoomModelMapper } from "../models/room-model";

export class RoomInMemoryRepository implements RoomRepository {
    constructor(
        private readonly inMemoryService: MemoryRoomDatabase,
        private readonly mapper: RoomModelMapper,
    ){}
    
    insert(room: RoomEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<RoomEntity> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<RoomEntity[]> {
        throw new Error("Method not implemented.");
    }

    update(room: RoomEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}