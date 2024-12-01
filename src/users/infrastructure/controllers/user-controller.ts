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

export class UserController implements Controller {
    constructor(
        private readonly createUser: CreateUser.Usecase,
        private readonly deleteUser: DeleteUser.Usecase,
        private readonly getUser: GetUser.Usecase,
        private readonly listUser: ListUser.Usecase,
        private readonly updateUser: UpdateUser.Usecase,
    ){}

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
            next(error);
        }
    }
}