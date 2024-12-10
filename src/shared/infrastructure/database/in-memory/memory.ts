export class Memory<ObjectType extends { id: string; }> {
    private memory: ObjectType[] = [];

    constructor(){}

    list() {
        return this.memory;
    }

    set(objectType: ObjectType) {
        this.memory.push(objectType);
    }

    findById(id: string): ObjectType {
        const objectElement = this.memory.find(item => item.id === id);

        if(!objectElement) throw new Error("Error identifying object!");

        return objectElement;
    }

    removeById(id: string) {
        const index = this.memory.findIndex(item => item.id === id);
        
        if (index !== -1) this.memory.splice(index, 1);
        
        throw new Error("Error removing object");
    }

    updateById(id: string, newValue: ObjectType) {
        const index = this.memory.findIndex(item => item.id === id);
        
        if (index !== -1) this.memory[index] = newValue;
        
        throw new Error("Error updating object");
    }

    count(): number {
        return this.memory.length;
    }

    clear(): void {
        this.memory = [];
    }

    existsById(id: string): boolean {
        return this.memory.some(item => item.id === id);
    }

    filter(predicate: (item: ObjectType) => boolean): ObjectType[] {
        return this.memory.filter(predicate);
    }
}