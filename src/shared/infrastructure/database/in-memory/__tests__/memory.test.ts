import { Memory } from "../memory";

type propUnitTest = {
    id: string;
    name: string;
}

class TestMemory extends Memory<propUnitTest>{}

describe("Unit test memory db", ()=> {
    let sut: Memory<propUnitTest>;
    let initProps: propUnitTest;
    let list: propUnitTest[];

    beforeEach(()=> {
        initProps = {
            id: "abcd1234",
            name: "Lucas Silva"
        };

        sut = new TestMemory();
        list = [
            { id: "abcd", name: "Lucas Silva" },
            { id: "abcd1234", name: "Aline Silva" },
            { id: "1234abcd", name: "Leonardo Silva" },
            { id: "a1b2c3d4", name: "Alda Silva" }
        ];
    });

    test("Should setting many values and list all values", ()=> {
        sut.createMany = list;

        expect(sut.list()).toEqual(list);
    });

    test("Should get element for id element", ()=> {
        sut.createMany = list;

        expect(sut.findById("abcd")).toMatchObject(list[0]);
    });

    test("Should len memory", ()=> {
        sut.createMany = list;
        const len = list.length;
        
        expect(sut.count()).toEqual(len);
    });

    test("Should clear memory", ()=> {
        sut.createMany = list;
        sut.clear();

        expect(sut.count()).toEqual(0);
    });

    test("Should existe element by ID", ()=> {
        sut.set(initProps);

        expect(sut.existsById("abcd1234")).toBeTruthy();
    });
});