import { EntityValidationError } from "../../../../../shared/domain/errors/entity-validation-error";
import { PlayerGenerate } from "../../../helpers/players/player-generate-helper";
import { PlayerEntity, PlayerProps } from "../player-entity";

describe("PlayerEntity unit test", ()=>{
    let sut: PlayerEntity;
    let initProps: PlayerProps;

    beforeEach(()=> {
        initProps = PlayerGenerate({  });
        sut = new PlayerEntity(initProps);
    });

    test("Should Player entity generate", ()=> {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toMatchObject(initProps);
    });

    test("Should throw an error when nickname is not provided", () => {
        const { nickname, ...propsWithoutNickname } = initProps;

        expect(() => {
            PlayerEntity.validate(propsWithoutNickname as PlayerProps);
        }).toThrow(EntityValidationError);
    });

    test("Should throw an error when socketId is not provided", () => {
        const { socketId, ...propsWithoutSocketId } = initProps;

        expect(() => {
            PlayerEntity.validate(propsWithoutSocketId as PlayerProps);
        }).toThrow(EntityValidationError);
    });
});