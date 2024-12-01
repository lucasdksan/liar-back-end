import { faker } from "@faker-js/faker";
import { PlayerProps } from "../../entities/players/player-entity";

type Props = {
    nickname?: string;
    socketId?: string;
}

export function PlayerGenerate(props: Props): PlayerProps{
    return {
        nickname: props.nickname ?? faker.internet.username(),
        socketId: props.socketId ?? faker.internet.password(),
    }
}