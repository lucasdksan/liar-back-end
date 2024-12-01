import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { RoomEntity } from "../../domain/entities/rooms/room-entity";
import { RoomRepository } from "../../domain/repositories/room-repository";
import { RoomOutput, RoomOutputDTO } from "../dtos/room-output-dto";

export namespace CreateRoom {
    export type Input = { hostId: string; };

    export type Output = RoomOutput;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly roomRepository: RoomRepository,
            private readonly mapper: RoomOutputDTO,
        ){}

        async execute(input: Input): Promise<Output> {
            const room = new RoomEntity({ hostId: input.hostId });

            await this.roomRepository.create(room);

            return this.mapper.toOutput(room);
        }
    }
}