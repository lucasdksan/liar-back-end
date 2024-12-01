import express from "express";
import helmet from "helmet";
import cors from "cors";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { loggerFactory } from "./shared/infrastructure/providers/logger/logger-factory-provider";
import { serverConfig } from "./server-config";
import { errorHandlerMiddleware } from "./shared/infrastructure/middlewares/error-handler-middleware";

const server = express();
const env = new EnvConfig();
const corsOptions = {
    origin: [`http://localhost:${env.getPort()}`], // URLs permitidas
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Permitir envio de cookies e credenciais
};
const logger = loggerFactory();
const { routes } = serverConfig(env);

server.use(helmet());
server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);
server.use(errorHandlerMiddleware);

server.get("/ping", (req, res)=> {
    res.status(200).json({ pong: "pong" });
});

server.listen(env.getPort(), ()=> {
    logger.info(`server is working on the port: ${env.getPort()}`)
});