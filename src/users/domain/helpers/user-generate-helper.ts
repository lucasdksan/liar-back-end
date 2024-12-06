import { faker } from "@faker-js/faker";
import { UserProps } from "../entities/user-entity";

type Props = {
    email?: string;
    nickname?: string;
    password?: string;
    valid?: boolean;
    score?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export function UserGenerate(props: Props): UserProps{
    const email = faker.internet.email();

    return {
        nickname: props.nickname ?? faker.internet.username(),
        password: props.password ?? faker.internet.password(),
        email: props.email ?? email,
        score: props.score ?? Math.floor(Math.random() * 100),
        valid: props.valid ?? false,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
    }
}