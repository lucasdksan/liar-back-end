import express from "express";
import helmet from "helmet";
import { EnvConfig } from "./shared/infrastructure/config/env/env-config";
import { loggerFactory } from "./shared/infrastructure/providers/logger/logger-factory-provider";

const server = express();
const env = new EnvConfig();
const logger = loggerFactory();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/ping", (req, res)=> {
    res.status(200).json({ pong: "pong" });
});

server.listen(env.getPort(), ()=> {
    logger.info(`server is working on the port: ${env.getPort()}`)
});