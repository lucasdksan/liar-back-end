import { EnvConfig } from "../../config/env/env-config";
import { JwtProvider } from "./jwt-provider";

export const jwtFactory = (env: EnvConfig)=> new JwtProvider(env.getJwtSecret(), env.getJwtExpiresIn());