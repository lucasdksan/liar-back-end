export abstract class ModelMapper<TModel, TEntity> {
    /**
     * Mapeia um modelo para uma entidade.
     * @param model O modelo a ser mapeado.
     * @returns A entidade correspondente ao modelo.
     */
    abstract toEntity(model: TModel | null): TEntity;
}