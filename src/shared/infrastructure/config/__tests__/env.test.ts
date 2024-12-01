import { EnvConfig } from "../env/env-config";

describe("Env unit test", ()=> {
    const envConfig = new EnvConfig();
    
    it("Shoulda be defined", ()=> {
        expect(envConfig).toBeDefined();
    });

    it("Shouda get port in env file", ()=> {
        expect(envConfig.getPort()).toStrictEqual(8080);
    });
});