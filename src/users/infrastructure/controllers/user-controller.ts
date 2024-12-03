import { RequestHandler } from "express";
import { Controller } from "../../../shared/infrastructure/controllers/controller";
import { CreateUser } from "../../application/usecases/create-user-usecase";
import { DeleteUser } from "../../application/usecases/delete-user-usecase";
import { GetUser } from "../../application/usecases/get-user-usecase";
import { ListUser } from "../../application/usecases/list-user-usecase";
import { UpdateUser } from "../../application/usecases/update-user-usecase";
import { statusCode } from "../../../shared/infrastructure/config/status-code";
import { UserPresenter } from "../presenters/user-presenter";
import { UserSearchPresenter } from "../presenters/user-search-presenter";
import { SigninUser } from "../../application/usecases/signin-usecase";
import { CustomLogger } from "../../../shared/infrastructure/providers/logger/custom-logger-provider";
import { loggerFactory } from "../../../shared/infrastructure/providers/logger/logger-factory-provider";
import { AuthService } from "../../../auth/application/services/auth-service";

export class UserController implements Controller {
    private readonly logger: CustomLogger;

    constructor(
        private readonly createUser: CreateUser.Usecase,
        private readonly deleteUser: DeleteUser.Usecase,
        private readonly getUser: GetUser.Usecase,
        private readonly listUser: ListUser.Usecase,
        private readonly updateUser: UpdateUser.Usecase,
        private readonly signinUser: SigninUser.UseCase,
        private readonly authService: AuthService,
    ){
        this.logger = loggerFactory();
    }

    public post: RequestHandler = async (req, res, next)=> {
        const { 
            nickname,
            password,
            email,
        } = req.body;
        
        try {
            const output = await this.createUser.execute({
                nickname,
                password,
                email,
            });
    
            res.status(statusCode.CREATED).json(output);
        } catch (error) {
            this.logger.error(`Error in userController post: ${error}`);
            next(error);
        }
    }

    public get: RequestHandler = async (req, res, next)=> {
        const { id } = req.params;
        
        try {
            const output = await this.getUser.execute({ id });
            const userPresenter = new UserPresenter(output);

            res.status(statusCode.OK).json(userPresenter.presenter());
        } catch (error) {
            this.logger.error(`Error in userController get: ${error}`);
            next(error);
        }
    }
    
    public put: RequestHandler = async (req, res, next)=> {
        const { id } = req.params;
        const props = req.body;
        
        try {
            const output = await this.updateUser.execute({ id, ...props });

            res.status(statusCode.OK).json(output);
        } catch (error) {
            this.logger.error(`Error in userController put: ${error}`);
            next(error);
        }
    }
    
    public delete: RequestHandler = async (req, res, next)=> {
        const { id } = req.params;
        const { admin } = req.body;

        try {
            await this.deleteUser.execute({ id, admin });

            res.status(statusCode.OK).json({ message: "User deleted" });
        } catch (error) {
            this.logger.error(`Error in userController delete: ${error}`);
            next(error);
        }
    }

    public search: RequestHandler = async (req, res, next)=> {
        const search = req.query;

        try {
            const output = await this.listUser.execute(search);
            const userPresenter = new UserSearchPresenter(output);

            res.status(statusCode.OK).json(userPresenter.presenter());
        } catch (error) {
            this.logger.error(`Error in userController search: ${error}`);
            next(error);
        }
    }

    public signin: RequestHandler = async (req, res, next) => {
        const {
            password,
            email,
        } = req.body;

        try {
            const output = await this.signinUser.execute({ email, password });
            const token =  this.authService.login({ email, id: output.id });

            res.status(statusCode.ACCEPTED).json({ token });
        } catch (error) {
            this.logger.error(`Error in userController signin: ${error}`);
            next(error);
        }
    }

    public signup: RequestHandler = async (req, res, next) => {
        const { 
            nickname,
            password,
            email,
        } = req.body;
        
        try {
            const output = await this.createUser.execute({
                nickname,
                password,
                email,
            });
    
            const token =  this.authService.login({ email, id: output.id });
            res.status(statusCode.CREATED).json({ token });
        } catch (error) {
            this.logger.error(`Error in userController signup: ${error}`);
            next(error);
        }
    }
}