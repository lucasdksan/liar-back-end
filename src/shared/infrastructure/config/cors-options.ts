import { EnvConfig } from "./env/env-config"

export const corsOptions = (env:EnvConfig) => {
    return {
        origin: [`http://localhost:${env.getPort()}`], // URLs permitidas
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
        allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
        credentials: true, // Permitir envio de cookies e credenciais
    }
}