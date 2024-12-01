import { PaginationOutputMapper } from "../../../shared/application/dtos/pagination-output-dto";
import { PrismaService } from "../../../shared/infrastructure/database/prisma/prisma";
import { UserController } from "./user-controller";
import { UserOutputDTO } from "../../application/dtos/user-output-dto";
import { UserModelMapper } from "../database/prisma/models/user-model";
import { UserPrismaRepository } from "../database/prisma/repositories/user-prisma-repository";
import { CreateUser } from "../../application/usecases/create-user-usecase";
import { DeleteUser } from "../../application/usecases/delete-user-usecase";
import { GetUser } from "../../application/usecases/get-user-usecase";
import { ListUser } from "../../application/usecases/list-user-usecase";
import { UpdateUser } from "../../application/usecases/update-user-usecase";
import { BcryptjsHashUserProvider } from "../providers/bcrypt-hash-user-provider";
import { SigninUser } from "../../application/usecases/signin-usecase";
import { AuthService } from "../../../auth/infrastructure/services/auth-service";
import { JwtProvider } from "../../../shared/infrastructure/providers/jwt/jwt-provider";
import { EnvConfig } from "../../../shared/infrastructure/config/env/env-config";

export const userFactoryController = (prisma: PrismaService, env: EnvConfig): UserController => {
    const mapperOutput = new UserOutputDTO();
    const bcrypt = new BcryptjsHashUserProvider();
    const mapper = new UserModelMapper();
    const mapperPagination = new PaginationOutputMapper();
    const userRepository = new UserPrismaRepository(prisma, mapper);
    const jwtProvider = new JwtProvider(env.getJwtSecret(), env.getJwtExpiresIn());

    return new UserController(
        new CreateUser.Usecase(userRepository, mapperOutput, bcrypt),
        new DeleteUser.Usecase(userRepository),
        new GetUser.Usecase(userRepository, mapperOutput),
        new ListUser.Usecase(userRepository, mapperOutput, mapperPagination),
        new UpdateUser.Usecase(userRepository, mapperOutput),
        new SigninUser.UseCase(userRepository, mapperOutput, bcrypt),
        new AuthService(jwtProvider)
    );
}