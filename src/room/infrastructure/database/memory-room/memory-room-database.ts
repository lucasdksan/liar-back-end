import { Memory } from "../../../../shared/infrastructure/database/in-memory/memory";
import { RoomProps } from "../../../domain/entities/room-entity";

export class MemoryRoomDatabase extends Memory<RoomProps & { id: string; }> {}