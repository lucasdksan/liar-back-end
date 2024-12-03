export type TPlayer = {
    id: string;
    nickname: string;
};

export interface PlayerRepository {
    findById(id: string): Promise<TPlayer>;
}