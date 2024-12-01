import { UserGenerate } from "../../helpers/user-generate-helper";
import { UserEntity, UserProps } from "../user-entity";
import { EntityValidationError } from "./../../../../shared/domain/errors/entity-validation-error";

describe("UserEntity unit test", ()=>{
    let sut: UserEntity;
    let initProps: UserProps;

    beforeEach(()=> {
        initProps = UserGenerate({  });
        sut = new UserEntity(initProps);
    });

    test("Should User entity generate", ()=> {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toMatchObject(initProps);
    });

    test("Should throw an error when email is not provided", () => {
        const { email, ...propsWithoutEmail } = initProps;

        expect(() => {
            UserEntity.validate(propsWithoutEmail as UserProps);
        }).toThrow(EntityValidationError);
    });

    test("Should throw an error when nickname is not provided", () => {
        const { nickname, ...propsWithoutNickname } = initProps;

        expect(() => {
            UserEntity.validate(propsWithoutNickname as UserProps);
        }).toThrow(EntityValidationError);
    });
});