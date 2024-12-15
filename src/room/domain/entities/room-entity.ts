import { Entity } from "../../../shared/domain/entities/entity";
import { EntityValidationError } from "../../../shared/domain/errors/entity-validation-error";
import { schema } from "./room-schema-entity";

export type PlayerProps = {
    id: string;
    nickname: string;
    socketId: string;
}

export type RoomProps = {
    clearedToEnter: boolean;
    player?: PlayerProps;
}

export class RoomEntity extends Entity<RoomProps> {
    private players: PlayerProps[];
    
    constructor(public props: RoomProps, id?: string){
        const playerArr = props.player ? [{ ...props.player }] : [];
        
        RoomEntity.validate(props);

        super(props, id);
        this.players = playerArr;
    }

    addPlayer(player: PlayerProps){
        this.validateQuantityPlayers();

        this.players.push(player);
    }

    update(propsToUpdate: Partial<RoomProps>) {
        const updatedProps: RoomProps = {
            ...this.props,
            ...propsToUpdate,
        }

        RoomEntity.validate(updatedProps);

        this.setProps(updatedProps);
    }

    private len(){
        return this.players.length;
    }

    private closeRoomForNewPlayer() {
        this.props.clearedToEnter = false;
    }

    private validateQuantityPlayers() {
        if(this.len() === 4) {
            this.closeRoomForNewPlayer();
            throw new EntityValidationError("Room limit player");
        }
    }

    static validate(props: RoomProps) {
        const result = schema.safeParse(props);

        if(!result.success) throw new EntityValidationError(`Validation error: ${result.error.message}`);
    }
}