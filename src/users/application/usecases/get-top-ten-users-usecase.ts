import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { UserRepository } from "../../domain/repositories/user-repository";
import { UserTopTenOutput, UserTopTenOutputDTO } from "../dtos/user-top-ten-output-dto";

export namespace GetTopTen {
    export type Input = void;

    export type Output = UserTopTenOutput[];

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
            private readonly mapperOutput: UserTopTenOutputDTO,
        ) {}

        async execute(input: void): Promise<Output> {
            const entityList = await this.userRepository.topTenUsers();
            const resultMapper = entityList.map((entity) => this.mapperOutput.toOutput(entity));

            return resultMapper;
        }
    }
}