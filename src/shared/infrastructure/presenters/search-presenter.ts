export interface SearchPresenter<Items> {
    data: Items[];
    meta: {
        total: number;
        currentPage: number;
        lastPage: number;
        perPage: number;
    };
}