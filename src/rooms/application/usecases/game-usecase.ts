import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { RoomRepository } from "../../domain/repositories/room-repository";
import { GameService } from "../../domain/services/game-service";

export namespace Game {
    export type Input = { roomId: string; };

    export type Output = void;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly roomRepository: RoomRepository,
            private readonly gameService: GameService,
        ){}

        async execute(input: Input): Promise<Output> {
            const { roomId } = input;
            const room = await this.roomRepository.findById(roomId);

            this.gameService.execute(room);
        }
    }
}