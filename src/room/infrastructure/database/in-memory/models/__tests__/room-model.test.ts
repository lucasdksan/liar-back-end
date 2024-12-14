import { EntityValidationError } from "../../../../../../shared/domain/errors/entity-validation-error";
import { RoomEntity } from "../../../../../domain/entities/room-entity";
import { RoomGenerate } from "../../../../../domain/helpers/room-generate-helper";
import { MemoryRoomProps } from "../../memory-room/memory-room-database";
import { RoomModelMapper } from "../room-model";

describe("RoomMapperModel unit test", () => {
    let input: MemoryRoomProps;
    let sut: RoomModelMapper;
    let output: RoomEntity;

    beforeEach(() => {
        input = {
            id: "b7g5q1c3-2age-4c99-8d4a-78a4976b02b4",
            clearedToEnter: true,
            player: {
                id: "a7e5a1c3-2dfb-4e99-8c4e-78a4976b02b4",
                nickname: "momonga",
                socketId: "1234-4321-asdf-fsaw",
            }
        }

        output = new RoomEntity(RoomGenerate({
            player: {
                id: "a7e5a1c3-2dfb-4e99-8c4e-78a4976b02b4",
                nickname: "momonga",
                socketId: "1234-4321-asdf-fsaw",
            },
            clearedToEnter: true,
        }), "b7g5q1c3-2age-4c99-8d4a-78a4976b02b4");

        sut = new RoomModelMapper();
    });

    test("The entity's map should be generated", () => {
        const result = sut.toEntity(input);

        expect(result.toJSON()).toMatchObject(output.toJSON());
    });

    test("Should throw Entity error", () => {
        expect(() => sut.toEntity(null)).toThrow(EntityValidationError);
    });
});