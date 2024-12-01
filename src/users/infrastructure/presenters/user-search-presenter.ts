import { SearchPresenter } from "../../../shared/infrastructure/presenters/search-presenter";
import { UserOutput } from "../../application/dtos/user-output-dto";
import { ListUser } from "../../application/usecases/list-user-usecase";

export class UserSearchPresenter implements SearchPresenter<UserOutput> {
    data: UserOutput[];
    meta: { total: number; currentPage: number; lastPage: number; perPage: number; };

    constructor(props: ListUser.Output) {
        const { items, ...meta } = props;

        this.meta = meta;
        this.data = items;
    }

    presenter(){ 
        return {
            data: this.data,
            meta: this.meta
        }
    }
}