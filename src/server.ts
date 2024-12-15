import http from "http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { loggerFactory } from "./shared/infrastructure/providers/logger/logger-factory-provider";
import { serverConfig } from "./server-config";
import { errorHandlerMiddleware } from "./shared/infrastructure/middlewares/error-handler-middleware";
import { corsOptions } from "./shared/infrastructure/config/cors-options";
import { SocketIoProvider } from "./shared/infrastructure/providers/socket-provider";
// import { authHandlerMiddleware } from "./auth/infrastructure/middlewares/auth-middleware";

const server = express();
const app = http.createServer(server);
const env = new EnvConfig();
const logger = loggerFactory();
const socketIoProvider = new SocketIoProvider(app);
const { routes } = serverConfig(env, socketIoProvider);
const port = env.getPort();

socketIoProvider.initialize();

server.use(helmet());
server.use(cors(corsOptions(env)));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);
server.use(errorHandlerMiddleware);

server.get("/ping", (req, res)=> {
    res.status(200).json({ pong: "pong" });
});

app.listen(port, ()=> {
    logger.info(`server is working on the port: ${port}`)
});