import { Presenter } from "../../../shared/infrastructure/presenters/presenter";
import { UserOutput } from "../../application/dtos/user-output-dto";

export class UserPresenter implements Presenter<UserOutput> {
    public data: UserOutput;

    constructor(data: UserOutput) {
        this.data = data;
    }

    presenter() {
        return {
            data: this.data
        }
    }
}