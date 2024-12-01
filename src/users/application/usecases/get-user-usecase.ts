import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { UserRepository } from "../../domain/repositories/user-repository";
import { UserOutput, UserOutputDTO } from "../dtos/user-output-dto";

export namespace GetUser {
    export type Input = { id: string };

    export type Output = UserOutput;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
            private readonly mapperOutput: UserOutputDTO,
        ) {}

        async execute(input: Input): Promise<UserOutput> {
            const entity = await this.userRepository.findById(input.id);

            return this.mapperOutput.toOutput(entity);
        }
    }
}