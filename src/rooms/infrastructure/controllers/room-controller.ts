import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../../auth/infrastructure/middlewares/auth-middleware";
import { SocketProvider } from "../../../shared/infrastructure/providers/socket-provider";
import { AddPlayerToRoom } from "../../application/usecases/add-player-room-usecase";
import { CreateRoom } from "../../application/usecases/create-room-usecase";
import { ConflictError } from "../../../shared/domain/errors/conflict-error";
import { statusCode } from "../../../shared/infrastructure/config/status-code";
import { Game } from "../../application/usecases/game-usecase";

export class RoomController {
    constructor(
        private readonly createRoomUsecase: CreateRoom.Usecase,
        private readonly addPlayerUsecase: AddPlayerToRoom.Usecase,
        private readonly gameUsecase: Game.Usecase,
        private readonly socketProvider: SocketProvider,
    ){}

    async createRoom(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { UserId, body } = req;
            const { nickname, socketId } = body;
            
            if(!UserId || !nickname || !socketId) throw new ConflictError("Data invalid");

            const hostId = UserId;

            const { room } = await this.createRoomUsecase.execute({ hostId, nickname, socketId });

            this.socketProvider.emitToRoom(room.toJSON().id, "room-created", {
                message: "Nova sala criada!",
                roomId: room.toJSON().id,
            })

            res.status(statusCode.ACCEPTED).json({ roomId: room.toJSON().id });
        } catch (error) {
            next(error);
        }
    }

    async joinRoom(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { UserId, body } = req;
            const { roomId, nickname, socketId } = body;
            
            if(!UserId || !roomId || !nickname || !socketId) throw new ConflictError("Data invalid");

            const user = { id: UserId, nickname, socketId };

            await this.addPlayerUsecase.execute({ roomId, user });

            this.socketProvider.emitToRoom(roomId, "player-joined", {
                message: `${nickname} entrou na sala`,
                user
            });

            res.status(statusCode.ACCEPTED).json({ message: "Jogador adicionado com sucesso!" });
        } catch (error) {
            next(error);
        }
    }

    async gameRoom(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            await this.gameUsecase.execute({ roomId: id });

            res.status(201).json({ data: "ID" });
        } catch (error) {
            next(error);
        }
    }
}