import { RoomOutput, RoomOutputDTO } from "../dtos/room-output-dto";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { RoomRepository } from "../../domain/repositories/room-repository";
import { BadRequestError } from "../../../shared/application/errors/bad-request-error";

export namespace AddPlayerInRoom {
    export type Input = {
        roomId: string;
        id: string;
        nickname: string;
        socketId: string;
    };

    export type Output = RoomOutput;

    export class Usecase implements DefaultUsecase<Input, Output>{
        constructor(
            private readonly roomRepository: RoomRepository,
            private readonly mapperOutput: RoomOutputDTO,
        ){}

        async execute(input: Input): Promise<RoomOutput> {
            const { id, nickname, socketId, roomId } = input;

            if(!id || !nickname || !socketId || !roomId) throw new BadRequestError("Input data not provided");

            const entity = await this.roomRepository.findById(roomId);

            entity.addPlayer({ id, nickname, socketId });
            await this.roomRepository.update(entity);

            return this.mapperOutput.toOutput(entity);
        }
    }
}