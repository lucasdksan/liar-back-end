import { faker } from "@faker-js/faker";
import { UserProps } from "../entities/user-entity";

type Props = {
    email?: string;
    nickname?: string;
    password?: string;
    valid?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export function UserGenerate(props: Props): UserProps{
    const email = faker.internet.email();

    return {
        nickname: props.nickname ?? faker.internet.username(),
        password: props.password ?? faker.internet.password(),
        email: props.email ?? email,
        valid: false,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
    }
}