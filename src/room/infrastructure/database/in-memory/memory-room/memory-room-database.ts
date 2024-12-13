import { Memory } from "../../../../../shared/infrastructure/database/in-memory/memory";
import { RoomProps } from "../../../../domain/entities/room-entity";

export type MemoryRoomProps = {
    id: string;
} & RoomProps;

export class MemoryRoomDatabase extends Memory<MemoryRoomProps> {}