import { faker } from "@faker-js/faker";
import { RoomProps } from "../../entities/rooms/room-entity";

type Props = {
    hostId?: string;
}

export function RoomGenerate(props: Props): RoomProps{
    return {
        hostId: props.hostId ?? faker.internet.jwt(),
    }
}