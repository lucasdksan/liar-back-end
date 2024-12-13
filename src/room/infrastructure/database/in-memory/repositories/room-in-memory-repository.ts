import { RoomEntity } from "../../../../domain/entities/room-entity";
import { RoomRepository } from "../../../../domain/repositories/room-repository";
import { MemoryRoomDatabase } from "../memory-room/memory-room-database";
import { RoomModelMapper } from "../models/room-model";

export class RoomInMemoryRepository implements RoomRepository {
    constructor(
        private readonly inMemoryService: MemoryRoomDatabase,
        private readonly mapper: RoomModelMapper,
    ){}
    
    async insert(room: RoomEntity): Promise<void> {
        const { id, clearedToEnter, player } = room.toJSON();

        this.inMemoryService.set({
            id, clearedToEnter, player
        });

        return;
    }

    async findById(id: string): Promise<RoomEntity> {
        return this._get(id);
    }

    async findAll(): Promise<RoomEntity[]> {
        return this.inMemoryService.list().map(room => this.mapper.toEntity(room));
    }

    async update(room: RoomEntity): Promise<void> {
        const { id, ...roomObject } = room.toJSON();
        const roomSelect = this._get(id);

        this.inMemoryService.updateById(roomSelect.toJSON().id, { id, ...roomObject });
    }
    
    async delete(id: string): Promise<void> {
        this.inMemoryService.removeById(id);
        
        return;
    }   

    private _get(id: string){
        const room = this.inMemoryService.findById(id);

        return this.mapper.toEntity(room);
    }
}