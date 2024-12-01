import { PrismaClient } from "@prisma/client";
import { CustomLogger } from "../../providers/logger/custom-logger-provider";
import { loggerFactory } from "../../providers/logger/logger-factory-provider";

export class PrismaService extends PrismaClient {
    private readonly logger: CustomLogger;
    
    constructor() {
        super();
        this.initialize();
        this.logger = loggerFactory();
    }

    private async initialize(): Promise<void> {
        try {
            await this.$connect();
            this.logger.info("Prisma connected");
        } catch (error) {
            this.logger.error(`Error connecting to the database: ${error}`);
        }
    }

    public async shutdown(): Promise<void> {
        try {
            await this.$disconnect();
            this.logger.info("Prisma disconnected");
        } catch (error) {
            this.logger.error(`Error disconnecting the database: ${error}`);
        }
    }
}