import { PaginationOutput, PaginationOutputMapper } from "../../../shared/application/dtos/pagination-output-dto";
import { Usecase as DefaultUsecase } from "../../../shared/application/usecases/usecase";
import { SearchInput } from "../../../shared/application/dtos/search-input-dto";
import { UserOutput, UserOutputDTO } from "../dtos/user-output-dto";
import { UserRepository } from "../../domain/repositories/user-repository";

export namespace ListUser {
    export type Input = SearchInput;

    export type Output = PaginationOutput<UserOutput>;

    export class Usecase implements DefaultUsecase<Input, Output> {
        constructor(
            private readonly userRepository: UserRepository.Repository,
            private readonly mapperOutput: UserOutputDTO,
            private readonly mapperPagination: PaginationOutputMapper,
        ){}
        
        async execute(input: Input): Promise<Output> {
            const params = new UserRepository.SearchParams(input);
            const searchResult = await this.userRepository.search(params);

            return this.toOutput(searchResult);
        }

        private toOutput(searchResult: UserRepository.SearchResult): Output{
            const items = searchResult.items.map((item)=> {
                return this.mapperOutput.toOutput(item);
            });

            return this.mapperPagination.toOutput(items, searchResult);
        }
    }
}