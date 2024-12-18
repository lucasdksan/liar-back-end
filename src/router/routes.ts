import { NextFunction, Request, RequestHandler, Response, Router } from "express";
import { CustomLogger } from "../shared/infrastructure/providers/logger/custom-logger-provider";
import { EnvConfig } from "../shared/infrastructure/config/env/env-config";
import { loggerFactory } from "../shared/infrastructure/providers/logger/logger-factory-provider";

export type RouteConfig = {
    method: "get" | "post" | "put" | "delete";
    path: string;
    handler: RequestHandler;
};

export type RouteMiddlewareConfig = {
    method: "get" | "post" | "put" | "delete";
    path: string;
    middlewares: RequestHandler[];
    handler: RequestHandler;
}

export type RouteWithMiddlewareConfig = {
    controller: any;
    routes: RouteMiddlewareConfig[];
};

export class Routes {
    private readonly _router: Router;
    private readonly logger: CustomLogger;

    constructor(private readonly envConfig: EnvConfig) {
        this._router = Router();
        this.logger = loggerFactory();
    }

    /**
     * Registra múltiplos controladores e suas rotas.
     * @param controllersConfig - Lista de controladores e suas respectivas rotas.
     */
    registerControllers(controllersConfig: { controller: any; routes: RouteConfig[] }[]): void {
        controllersConfig.forEach(({ controller, routes }) => {
            routes.forEach((route) => {
                this._router[route.method](route.path, this.wrapController(route.handler.bind(controller)));
            });
        });
    }

    /**
     * Registra múltiplos controladores com middlewares.
     * @param controllersWithMiddlewaresConfig - Lista de controladores com suas respectivas rotas e middlewares.
     */
    registerRouteWithMiddlewares(controllersWithMiddlewaresConfig: RouteWithMiddlewareConfig[]): void {
        controllersWithMiddlewaresConfig.forEach(({ controller, routes }) => {
            routes.forEach(({ method, path, middlewares, handler }) => {
                const wrappedHandler = this.wrapController(handler.bind(controller));
                this._router[method](path, ...middlewares, wrappedHandler);
            });
        });
    }

    /**
     * Captura erros de controladores assíncronos.
     */
    private wrapController(handler: RequestHandler) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next);
            } catch (error) {
                this.logger.error(`Error in wrapController: ${error}`);
                next(error);
            }
        };
    }

    public get router(): Router {
        return this._router;
    }
}