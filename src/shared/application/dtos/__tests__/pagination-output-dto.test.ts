import { SearchResult } from "../../../domain/repositories/searchable-repository";
import { PaginationOutputMapper } from "../pagination-output-dto";

describe("PaginationOutputMapper unit test", ()=>{
    it("should convert a SearchResult in output", ()=>{
        const result = new SearchResult({
            items: ["fake" as any],
            total: 1,
            currentPage: 1,
            perPage: 1,
            sort: "",
            sortDir: "",
            filter: "fake"
        });
        const sut = new PaginationOutputMapper();
        
        const resultFinal = sut.toOutput(result.items, result);
        expect(resultFinal).toStrictEqual({
            items: ["fake"],
            total: 1,
            currentPage: 1,
            lastPage: 1,
            perPage: 1,
        });
    });
});