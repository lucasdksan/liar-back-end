import { UserEntity, UserProps } from "../../../domain/entities/user-entity";
import { UserGenerate } from "../../../domain/helpers/user-generate-helper";
import { UserOutputDTO } from "../user-output-dto";

describe("UserOutputDTO unit test", ()=>{
    let sut: UserOutputDTO;
    let entity: UserEntity;
    let props: UserProps;

    beforeEach(()=> {
        sut = new UserOutputDTO();
        props = UserGenerate({});
        entity = new UserEntity(props);
    });

    test("Should convert output", ()=>{
        const { createdAt, updatedAt, password, ...data } = entity.toJSON();

        const output = {
            ...data,
        };
    
        const result = sut.toOutput(entity);
    
        expect(result).toMatchObject(output);
    });
});