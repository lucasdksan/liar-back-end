import { CustomLogger } from "./custom-logger-provider"

export const loggerFactory = ()=> new CustomLogger();