import { OutputMapperDTO } from "../../../shared/application/dtos/output-mapper-dto";
import { UserEntity } from "../../domain/entities/user-entity";

export type UserTopTenOutput = {
    nickname: string;
    score: number;
}

export class UserTopTenOutputDTO implements OutputMapperDTO<UserEntity, UserTopTenOutput> {
    toOutput(entity: UserEntity): UserTopTenOutput {
        const { createdAt, updatedAt, password, email, id, valid, ...entityData } = entity.toJSON();
        
        return {
            ...entityData
        }
    }
}