import { Users } from "@prisma/client";
import { faker } from "@faker-js/faker/.";
import { EntityValidationError } from "../../../../../../shared/domain/errors/entity-validation-error";
import { UserEntity } from "../../../../../domain/entities/user-entity";
import { UserModelMapper } from "../user-model";
import { UserGenerate } from "../../../../../domain/helpers/user-generate-helper";

describe("UserMapperModel unit test", ()=> {
    let input: Users;
    let sut: UserModelMapper;
    let output: UserEntity;

    beforeEach(()=> {
        const email = faker.internet.email()
        const valid = true;
        const nickname = faker.person.fullName();
        const password = faker.internet.password();
        const score = Math.floor(Math.random() * 100);
        const createdAt = new Date();
        const updatedAt = new Date();

        input = {
            id: "a7e5a1c3-2dfb-4e99-8c4e-78a4976b02b4",
            nickname,
            password,
            email,
            score,
            valid,
            createdAt,
            updatedAt,
        };
        output = new UserEntity(UserGenerate({
            nickname,
            password,
            email,
            score,
            valid,
            createdAt,
            updatedAt,
        }), "a7e5a1c3-2dfb-4e99-8c4e-78a4976b02b4");
        sut = new UserModelMapper();
    });

    test("The entity's map should be generated", ()=> {
        const result = sut.toEntity(input);

        expect(result.toJSON()).toMatchObject(output.toJSON());
    });

    test("Should throw Entity error", ()=> {
        expect(() => sut.toEntity(null)).toThrow(EntityValidationError);
    });
});