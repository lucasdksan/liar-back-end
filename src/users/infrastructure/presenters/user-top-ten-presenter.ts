import { Presenter } from "../../../shared/infrastructure/presenters/presenter";
import { UserTopTenOutput } from "../../application/dtos/user-top-ten-output-dto";

export class UserTopTenPresenter implements Presenter<UserTopTenOutput[]> {
    public data: UserTopTenOutput[];

    constructor(data: UserTopTenOutput[]) {
        this.data = data;
    }

    presenter() {
        return {
            data: this.data
        }
    }
}