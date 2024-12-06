import { Entity } from "../../../shared/domain/entities/entity";
import { EntityValidationError } from "../../../shared/domain/errors/entity-validation-error";
import { schema } from "./user-schema-entity";

export type UserProps = {
    email: string;
    nickname: string;
    password: string;
    score?: number;
    valid: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserEntity extends Entity<UserProps> {
    constructor(public props: UserProps, id?: string){
        super(props, id);

        UserEntity.validate(props);

        this.props.createdAt = this.props.createdAt ?? new Date();
        this.props.updatedAt = this.props.updatedAt ?? new Date();
    }

    update(propsToUpdate: Partial<UserProps>) {
        const updatedProps: UserProps = {
            ...this.props,
            ...propsToUpdate,
            updatedAt: new Date()
        };

        UserEntity.validate(updatedProps);

        this.setProps(updatedProps);
    }

    static validate(props: UserProps) {
        const result = schema.safeParse(props);

        if (!result.success) {
            throw new EntityValidationError(`Validation error: ${result.error.message}`);
        }
    }
}