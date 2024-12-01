import { EnvConfig } from "../env/env-config";

describe("Env unit test", ()=> {
    const envConfig = new EnvConfig();
    
    it("Shoulda be defined", ()=> {
        expect(envConfig).toBeDefined();
    });

    it("Shoulda get port in env file", ()=> {
        expect(envConfig.getPort()).toStrictEqual(8080);
    });

    it("should return a database URL as a string", () => {
        const databaseUrl = envConfig.getDatabaseUrl();
        expect(typeof databaseUrl).toBe("string");
    });
});