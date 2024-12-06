import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { UserRepository } from "../../domain/repositories/user-repository";

export namespace DeleteUser {
    export type Input = { id: string; };

    export type Output = void;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
        ) {}

        async execute(input: Input): Promise<void> {
            await this.userRepository.delete(input.id);
        }
    }
}