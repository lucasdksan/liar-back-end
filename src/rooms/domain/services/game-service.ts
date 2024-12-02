import { SocketProvider } from "../../../shared/infrastructure/providers/socket-provider";
import { RoomEntity } from "../entities/rooms/room-entity";

export class GameService {
    constructor(
        private readonly socketProvider: SocketProvider,
    ){}

    execute(room: RoomEntity) {
        console.log(room);
    }
}