import { UserController } from "../../users/infrastructure/controllers/user-controller";
import { RouteConfig } from "../routes";

export const userRoutes = (controller: UserController): RouteConfig[] => [
    { method: "get", path: "/user/:id", handler: controller.get },
    { method: "get", path: "/user-search", handler: controller.search },
    { method: "post", path: "/user", handler: controller.post },
    { method: "delete", path: "/user/:id", handler: controller.delete },
    { method: "put", path: "/user/:id", handler: controller.put },
];