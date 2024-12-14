import { RoomEntity, RoomProps } from "../../../domain/entities/room-entity";
import { RoomGenerate } from "../../../domain/helpers/room-generate-helper";
import { RoomOutputDTO } from "../room-output-dto";

describe("RoomOutputDTO unit test", ()=> {
    let sut: RoomOutputDTO;
    let entity: RoomEntity;
    let props: RoomProps;

    beforeEach(()=>{
        sut = new RoomOutputDTO();
        props = RoomGenerate({ });
        entity = new RoomEntity(props);
    });

    test("Should convert output", ()=>{
        const { ...output } = entity.toJSON();
    
        const result = sut.toOutput(entity);

        expect(result).toMatchObject(output);
    });
});