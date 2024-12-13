import { RoomEntity, RoomProps } from "../room-entity";
import { RoomGenerate } from '../../helpers/room-generate-helper';
import { EntityValidationError } from "../../../../shared/domain/errors/entity-validation-error";

describe("RoomEntity unit test", ()=> {
    let sut: RoomEntity;
    let initProps: RoomProps;

    beforeEach(()=> {
        initProps = RoomGenerate({  });
        sut = new RoomEntity(initProps);
    });

    test("Should Room entity generate", ()=> {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toMatchObject(initProps);
    });

    test("Should close room for new Players", ()=> {
        sut.closeRoomForNewPlayer();

        expect(sut.props.clearedToEnter).toBeFalsy();
    });

    test("Should add player in room and test len method", ()=> {
        sut.addPlayer({
            id: "asdasd-asdasda-1231321-5a56s4d",
            nickname: "momonga"
        });

        expect(sut.len()).toEqual(2);
    });

    test("Should validate quantity players", ()=> {
        sut.addPlayer({
            id: "asdasd-asdasda-1231321-5a56s4d",
            nickname: "momonga"
        });
        sut.addPlayer({
            id: "asdasd-1231321-5a56s4d",
            nickname: "lucasdksan"
        });
        sut.addPlayer({
            id: "1231321-5a56s4d",
            nickname: "modex"
        });

        expect(()=> {
            sut.addPlayer({
                id: "1231321-5a56s4d",
                nickname: "modex"
            })
        }).toThrow(EntityValidationError);
    });
});