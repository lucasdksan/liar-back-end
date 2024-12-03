import { authHandlerMiddleware } from "../../auth/infrastructure/middlewares/auth-middleware";
import { RoomController } from "../../rooms/infrastructure/controllers/room-controller";
import { RouteMConfig } from "../routes";

export const roomRoutes = (controller: RoomController): RouteMConfig[] => [
    { method: "post", path: "/rooms", middlewares: [ authHandlerMiddleware ], handler: controller.createRoom },
    { method: "post", path: "/rooms/join", middlewares: [ authHandlerMiddleware ], handler: controller.joinRoom },
];