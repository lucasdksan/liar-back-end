import { PrismaService } from "../../../shared/infrastructure/database/prisma/prisma";
import { RoomController } from "./room-controller";
import { RoomOutputDTO } from "../../application/dtos/room-output-dto";
import { RoomInMemoryRepository } from "../database/in-memory/repositories/room-in-memory-repository";
import { CreateRoom } from "../../application/usecases/create-room-usecase";
import { AddPlayerToRoom } from "../../application/usecases/add-player-room-usecase";
import { PlayerValidate } from "../../../shared/infrastructure/database/prisma/player-validate";
import { SocketProvider } from "../../../shared/infrastructure/providers/socket-provider";
import { Game } from "../../application/usecases/game-usecase";
import { GameService } from "../../domain/services/game-service";

export const roomFactoryController = (prisma: PrismaService, socket: SocketProvider): RoomController => {
    const mapperOutput = new RoomOutputDTO();
    const roomRepository = new RoomInMemoryRepository();
    const createRoom = new CreateRoom.Usecase(roomRepository, mapperOutput);
    const playerValidate = new PlayerValidate(prisma);
    const addRoom = new AddPlayerToRoom.Usecase(roomRepository, playerValidate);
    const gameService = new GameService(socket);
    const gameRoom = new Game.Usecase(roomRepository, gameService);

    return new RoomController(
        createRoom,
        addRoom,
        gameRoom,
        socket,
    );
}