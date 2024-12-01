import { roomFactoryController } from "./rooms/infrastructure/controllers/room-factory-controller";
import { Routes } from "./router/routes";
import { roomRoutes } from "./router/routes/room-routes";
import { userRoutes } from "./router/routes/user-routes";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { PrismaService } from "./shared/infrastructure/database/prisma/prisma";
import { SocketProvider } from "./shared/infrastructure/providers/socket-provider";
import { userFactoryController } from "./users/infrastructure/controllers/user-factory-controller";

export const serverConfig = (env: EnvConfig, socket: SocketProvider) => {
    const prisma = new PrismaService();
    const userController = userFactoryController(prisma, env);
    const userRoutesList = userRoutes(userController);
    const roomController = roomFactoryController(prisma, socket);
    const roomRoutesList = roomRoutes(roomController);

    const routes = new Routes(env);

    routes.registerControllers([
        { controller: userController, routes: userRoutesList },
    ]);

    routes.registerRouteWithMiddlewares([
        { controller: roomController, routes: roomRoutesList },
    ]);

    return {
        routes: routes.router,
    };
}