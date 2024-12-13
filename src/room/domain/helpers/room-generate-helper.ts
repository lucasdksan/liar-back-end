import { faker } from "@faker-js/faker/.";
import { PlayerProps, RoomProps } from "../entities/room-entity";

type Props = {
    clearedToEnter?: boolean;
    player?: PlayerProps;
}

export function RoomGenerate(props: Props): RoomProps{
    return {
        clearedToEnter: props.clearedToEnter ?? faker.datatype.boolean(),
        player: props.player ?? {
            id: faker.database.mongodbObjectId(),
            nickname: faker.internet.username(),
        }
    }
}