import { Users } from "@prisma/client";
import { EntityValidationError } from "../../../../../shared/domain/errors/entity-validation-error";
import { UserEntity } from "../../../../domain/entities/user-entity";
import { ModelMapper } from "../../../../../shared/infrastructure/database/models/model-mapper";

export class UserModelMapper extends ModelMapper<Users, UserEntity> {
    toEntity(model: Users | null): UserEntity {
        if(!model) throw new EntityValidationError("An entity not be loaded");
        
        const data = {
            email: model.email,
            nickname: model.nickname,
            valid: model.valid,
            password: model.password,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        };

        try {
            return new UserEntity(data, model.id);
        } catch(err) {
            throw new EntityValidationError("An entity not be loaded");
        }
    }    
}