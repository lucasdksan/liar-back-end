import { Server, Socket } from "socket.io";
import http from "http";
import { EnvConfig } from "../config/env/env-config";
import { corsOptions } from "../config/cors-options";
import { CustomLogger } from "./logger/custom-logger-provider";
import { loggerFactory } from "./logger/logger-factory-provider";

export class SocketProvider {
    private readonly io: Server;
    private readonly logger: CustomLogger;

    constructor(server: http.Server, env: EnvConfig) {
        this.io = new Server(server, {
            cors: corsOptions(env),
        });
        this.logger = loggerFactory();
    }

    public registerHandler(eventName: string, handler: (socket: Socket, payload: any) => void) {
        this.io.on("connection", (socket) => {
            this.logger.info(`Client connected: ${socket.id}`)
            socket.on(eventName, (payload) => handler(socket, payload));
        });
    }

    public emitToRoom(roomId: string, eventName: string, data: any) {
        this.io.to(roomId).emit(eventName, data);
    }
}