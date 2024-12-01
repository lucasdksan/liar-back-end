import { Entity } from "../../../../shared/domain/entities/entity";
import { EntityValidationError } from "../../../../shared/domain/errors/entity-validation-error";
import { schema } from "./player-schema-entity";

export type PlayerProps = {
    nickname: string;
    socketId: string;
}

export class PlayerEntity extends Entity<PlayerProps> {
    constructor(public props: PlayerProps, id?: string){
        super(props, id);

        PlayerEntity.validate(props);
    }
    
    update(propsToUpdate: Partial<PlayerProps>) {
        const updatedProps: PlayerProps = {
            ...this.props,
            ...propsToUpdate,
        };

        PlayerEntity.validate(updatedProps);

        this.setProps(updatedProps);
    }

    static validate(props: PlayerProps) {
        const result = schema.safeParse(props);

        if (!result.success) {
            throw new EntityValidationError(`Validation error: ${result.error.message}`);
        }
    }
}