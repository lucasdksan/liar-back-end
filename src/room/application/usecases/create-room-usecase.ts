import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { RoomEntity } from "../../domain/entities/room-entity";
import { RoomRepository } from "../../domain/repositories/room-repository";
import { RoomOutput, RoomOutputDTO } from "../dtos/room-output-dto";

export namespace CreateRoom {
    export type Input = {
        id: string;
        nickname: string;
        socketId: string;
    }

    export type Output = RoomOutput;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly roomRepository: RoomRepository,
            private readonly mapperOutput: RoomOutputDTO,
        ){}
        
        execute(input: Input): RoomOutput {
            const { id, nickname, socketId } = input;

            if(!id || !nickname || !socketId) throw new BadRequestError("Input data not provided");

            const entity = new RoomEntity({ clearedToEnter: true, player: { ...input } });
            
            this.roomRepository.insert(entity);

            return this.mapperOutput.toOutput(entity);
        }
    }
}