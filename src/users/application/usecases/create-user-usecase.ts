import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { UserEntity } from "../../domain/entities/user-entity";
import { UserRepository } from "../../domain/repositories/user-repository";
import { BcryptjsHashUserProvider } from "../../infrastructure/providers/bcrypt-hash-user-provider";
import { UserOutput, UserOutputDTO } from "../dtos/user-output-dto";

export namespace CreateUser {
    export type Input = {
        email: string;
        nickname: string;
        password: string;
    };

    export type Output = UserOutput;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
            private readonly mapperOutput: UserOutputDTO,
            private readonly bcrypt: BcryptjsHashUserProvider,
        ) { }

        async execute(input: Input): Promise<Output> {
            const { 
                password, 
                email,  
                nickname,
            } = input;

            if (!email || 
                !nickname ||
                !password ) throw new BadRequestError("Input data not provided");

            await this.userRepository.emailExists(email);
            const newPass = await this.bcrypt.generateHash(password);

            const entity = new UserEntity({
                email,
                password: newPass,
                nickname,
                valid: true,
            });

            await this.userRepository.insert(entity);

            return this.mapperOutput.toOutput(entity);
        }
    }
}