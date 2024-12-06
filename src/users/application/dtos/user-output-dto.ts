import { OutputMapperDTO } from "../../../shared/application/dtos/output-mapper-dto";
import { UserEntity } from "../../domain/entities/user-entity";

export type UserOutput = {
    id: string;
    nickname: string;
    email: string;
    score: number;
    valid: boolean;
}

export class UserOutputDTO implements OutputMapperDTO<UserEntity, UserOutput> {
    toOutput(entity: UserEntity): UserOutput {
        const { createdAt, updatedAt, password, ...entityData } = entity.toJSON();
        
        return {
            ...entityData
        }
    }
}