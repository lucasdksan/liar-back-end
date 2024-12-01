import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
    constructor() {
        super();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        try {
            await this.$connect();
            console.log("Prisma connected");
        } catch (error) {
            console.error("Error connecting to the database:", error);
        }
    }

    public async shutdown(): Promise<void> {
        try {
            await this.$disconnect();
            console.log("Prisma disconnected");
        } catch (error) {
            console.error("Error disconnecting the database:", error);
        }
    }
}