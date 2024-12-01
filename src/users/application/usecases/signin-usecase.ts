import { UserOutput, UserOutputDTO } from "../dtos/user-output-dto";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { UserRepository } from "../../domain/repositories/user-repository";
import { BcryptjsHashUserProvider } from "../../infrastructure/providers/bcrypt-hash-user-provider";
import { BadRequestError } from "../../../shared/application/errors/bad-request-error";
import { InvalidCredentialsError } from "../../../shared/application/errors/invalid-credentials-error";

export namespace SigninUser {
    export type Input = {
        email: string;
        password: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
            private readonly mapperOutput: UserOutputDTO,
            private readonly bcrypt: BcryptjsHashUserProvider,
        ){}

        async execute(input: Input): Promise<UserOutput> {
            const { email, password } = input;

            if(!email || !password ) throw new BadRequestError("Input data not provided");

            const entity = await this.userRepository.findByEmail(email);
            const hashPasswordMatch = await this.bcrypt.compareHash(password, entity.toJSON().password);

            if(!hashPasswordMatch) {
                throw new InvalidCredentialsError("Invalid Credentials");
            }

            return this.mapperOutput.toOutput(entity);
        }
    }
}