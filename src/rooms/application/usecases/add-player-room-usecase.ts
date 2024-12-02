import { RoomRepository } from "./../../domain/repositories/room-repository";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { InvalidCredentialsError } from "../../../shared/application/errors/invalid-credentials-error";
import { PlayerEntity } from "../../domain/entities/players/player-entity";
import { PlayerValidate } from "../../../shared/infrastructure/database/prisma/player-validate";

export namespace AddPlayerToRoom {
    export type Input = { 
        roomId: string; 
        user: {
            id: string;
            nickname: string;
            socketId: string;
        };
    };

    export type Output = void;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly roomRepository: RoomRepository,
            private readonly playerValidate: PlayerValidate,
        ){}
        
        async execute(input: Input): Promise<Output> {
            const { user, roomId } = input;

            const room = await this.roomRepository.findById(roomId);

            if(!room) throw new InvalidCredentialsError("Room not find");
            
            const { id, ...values } = user;
            await this.playerValidate.validate(id);
            
            const playerEntity = new PlayerEntity({ ...values }, id);

            room.addPlayer(playerEntity.toJSON());

            await this.roomRepository.update(room);
        }
    }
}