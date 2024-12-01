import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { UserRepository } from "../../domain/repositories/user-repository";
import { UserOutput, UserOutputDTO } from "../dtos/user-output-dto";

export namespace UpdateUser {
    export type Input = {
        id: string;
        nickname?: string;
    };

    export type Output = UserOutput;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
            private readonly mapperOutput: UserOutputDTO,
        ){}
        
        async execute(input: Input): Promise<UserOutput> {
            const { id, ...values} = input;

            if(!id) throw new BadRequestError("Input data not provided");

            const filteredInput = Object.fromEntries(
                Object.entries(values).filter(([_, value]) => value !== undefined)
            );

            const entity = await this.userRepository.findById(id);

            entity.update({ ...filteredInput });
            await this.userRepository.update(entity);
            
            return this.mapperOutput.toOutput(entity);
        }
    }
}