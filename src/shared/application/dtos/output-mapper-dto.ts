export interface OutputMapperDTO<Entity, Output> {
    toOutput(entity: Entity):Output;
}