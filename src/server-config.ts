import { Routes } from "./router/routes";
import { userRoutes } from "./router/routes/user-routes";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { PrismaService } from "./shared/infrastructure/database/prisma/prisma";
import { userFactoryController } from "./users/infrastructure/controllers/user-factory-controller";

export const serverConfig = (env: EnvConfig) => {
    const prisma = new PrismaService();
    const userController = userFactoryController(prisma, env);
    const userRoutesList = userRoutes(userController);
    const routes = new Routes(env);

    routes.registerControllers([
        { controller: userController, routes: userRoutesList },
    ]);

    return {
        routes: routes.router,
    };
}