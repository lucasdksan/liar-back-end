import { EntityValidationError } from "../../../../../shared/domain/errors/entity-validation-error";
import { PlayerGenerate } from "../../../helpers/players/player-generate-helper";
import { RoomGenerate } from "../../../helpers/rooms/room-generate-helper";
import { PlayerEntity } from "../../players/player-entity";
import { RoomEntity, RoomProps } from "../room-entity";

describe("RoomEntity unit test", ()=>{
    let sut: RoomEntity;
    let player: PlayerEntity;
    let initProps: RoomProps;

    beforeEach(()=> {
        initProps = RoomGenerate({  });
        player = new PlayerEntity(PlayerGenerate({  }));
        sut = new RoomEntity(initProps);
    });

    test("Should Room entity generate", ()=> {
        expect(sut).toBeDefined();
        expect(sut.toJSON()).toMatchObject(initProps);
    });

    test("Should throw an error when hostId is not provided", () => {
        const { hostId } = initProps;

        expect(() => {
            RoomEntity.validate({} as RoomProps);
        }).toThrow(EntityValidationError);
    });

    test("Should add player in room", ()=> {
        sut.addPlayer(player.toJSON());

        expect(sut["players"].length).toEqual(1);
    });

    test("Should remove player in room and isEmpty", ()=> {
        const dataPlayer = player.toJSON();
        sut.addPlayer(dataPlayer);
        sut.removePlayer(dataPlayer.id);

        expect(sut.isEmpty()).toEqual(true);
    });

    test("Should get Players", ()=> {
        const dataPlayer = player.toJSON();
        sut.addPlayer(dataPlayer);

        expect(sut.getPlayers()).toHaveLength(1);
    });

    test("Should get player", ()=> {
        const dataPlayer = player.toJSON();
        sut.addPlayer(dataPlayer);

        expect(sut.getPlayer(dataPlayer.id)).toEqual(dataPlayer);
    });
});