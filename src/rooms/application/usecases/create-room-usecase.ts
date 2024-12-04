import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { PlayerEntity } from "../../domain/entities/players/player-entity";
import { RoomEntity } from "../../domain/entities/rooms/room-entity";
import { RoomRepository } from "../../domain/repositories/room-repository";
import { RoomOutput, RoomOutputDTO } from "../dtos/room-output-dto";

export namespace CreateRoom {
    export type Input = { 
        hostId: string; 
        socketId: string;
        nickname: string; 
    };

    export type Output = RoomOutput;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly roomRepository: RoomRepository,
            private readonly mapper: RoomOutputDTO,
        ){}

        async execute(input: Input): Promise<Output> {
            const { hostId, ...values } = input;
            const room = new RoomEntity({ hostId });
            const playerEntity = new PlayerEntity({ ...values }, hostId);

            room.addPlayer({ alive: true, cards: [], ...playerEntity.toJSON() });
            await this.roomRepository.create(room);

            return this.mapper.toOutput(room);
        }
    }
}