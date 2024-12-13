import { MemoryRoomDatabase } from "./room/infrastructure/database/memory-room/memory-room-database";
import { Routes } from "./router/routes";
import { userRoutes } from "./router/routes/user-routes";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { PrismaService } from "./shared/infrastructure/database/prisma/prisma";
import { SocketProvider } from "./shared/infrastructure/providers/socket-provider";
import { userFactoryController } from "./users/infrastructure/controllers/user-factory-controller";

export const serverConfig = (env: EnvConfig, socket: SocketProvider) => {
    const prisma = new PrismaService();
    const roomMemory = new MemoryRoomDatabase();
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