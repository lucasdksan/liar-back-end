export interface IEnv {
    getPort(): number;
    getDatabaseUrl(): string;
    getJwtSecret(): string;
    getJwtExpiresIn(): string; 
}