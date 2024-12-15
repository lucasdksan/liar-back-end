import { Server } from "socket.io";
import { loggerFactory } from "./logger/logger-factory-provider";
import { CustomLogger } from "./logger/custom-logger-provider";

export class SocketIoProvider {
    private io: Server;
    private readonly logger: CustomLogger;

    constructor(server: any) {
        this.io = new Server(server);
        this.logger = loggerFactory();
    }

    public initialize(): void {
        this.io.on("connection", (socket) => {
            this.logger.info(`Client connected: ${socket.id}`);

            socket.on("example_event", (data) => {
                this.logger.info(`Event received:, ${data}`);
            });

            socket.on("disconnect", () => {
                this.logger.info(`Client disconnected: ${socket.id}`);
            });
        });
    }

    public emit(event: string, data: any): void {
        this.io.emit(event, data);
    }

    public getSocket(): Server {
        return this.io;
    }
}