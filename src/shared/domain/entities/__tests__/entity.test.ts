import { validate as uuidValidate } from "uuid";
import { Entity } from "../entity";

type StubProps = {
    prop1: string;
    prop2: number;
}

class StubEntity extends Entity<StubProps> {
    constructor(public props: StubProps, id?: string){
        super(props, id);
    }

    update(propsToUpdate: Partial<StubProps>) {
        const updatedProps: StubProps = {
            ...this.props,
            ...propsToUpdate
        };

        this.setProps(updatedProps);
    }
}

describe("Entity unit test", ()=> {
    let props: StubProps;
    let entity: StubEntity;
    let id: string;

    beforeEach(()=> {
        props = { prop1: "value1", prop2: 10 };
        entity = new StubEntity(props);
        id = "e29202d4-91fd-42fc-a429-29a975bcd61f";
    });

    test("Should set props and id",()=> {
        expect(entity.props).toStrictEqual(props);
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
    });

    test("Should accept a valid uuid",()=> {
        const entity2 = new StubEntity(props, id);

        expect(uuidValidate(entity2.id)).toBeTruthy();
        expect(entity2.id).toEqual(id);
    });

    test("Should convert a entity to a JavaScript Object",()=> {
        const entity2 = new StubEntity(props, id);

        expect(entity2.toJSON()).toStrictEqual({
            id,
            ...props
        })
    });

    test("Should update values in entity prop", ()=>{
        entity.update({ prop2: 100 });

        expect(entity.props.prop2).toEqual(100);
    })
});