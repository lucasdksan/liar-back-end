import { writeFileSync, appendFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { Logger } from "../logger-interface-provider";

export class CustomLogger implements Logger {
    private logDir: string;
    private logFile: string;

    constructor(logDir = "logs", logFile = "app.log") {
        this.logDir = logDir;
        this.logFile = logFile;

        if (!existsSync(this.logDir)) {
            mkdirSync(this.logDir);
        }

        const logFilePath = this.getLogFilePath();
        if (!existsSync(logFilePath)) {
            writeFileSync(logFilePath, "", "utf-8");
        }
    }

    info(message: string): void {
        this.writeLog("INFO", message);
    }

    warn(message: string): void {
        this.writeLog("WARN", message);
    }

    error(message: string): void {
        this.writeLog("ERROR", message);
    }

    private writeLog(level: string, message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}\n`;

        appendFileSync(this.getLogFilePath(), logMessage, "utf-8");

        if (level === "ERROR") {
            console.error(logMessage);
        } else if (level === "WARN") {
            console.warn(logMessage);
        } else {
            console.log(logMessage);
        }
    }

    private getLogFilePath(): string {
        return join(this.logDir, this.logFile);
    }
}