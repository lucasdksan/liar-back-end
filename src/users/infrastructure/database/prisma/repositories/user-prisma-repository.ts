import { ConflictError } from "../../../../../shared/domain/errors/conflict-error";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found-error";
import { PrismaService } from "../../../../../shared/infrastructure/database/prisma/prisma";
import { UserEntity } from "../../../../domain/entities/user-entity";
import { UserRepository } from "../../../../domain/repositories/user-repository";
import { UserModelMapper } from "../models/user-model";

export class UserPrismaRepository implements UserRepository.Repository {
    sortableFields: string[] = [
        "nickname", "email"
    ];
    
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mapper: UserModelMapper
    ) {}

    async topTenUsers(): Promise<UserEntity[]> {
        try {
            const users = await this.prismaService.users.findMany();
            const usersForScore = users.sort((a, b)=> {
                if(a.score < b.score) return -1;
                if(a.score > b.score) return 1;
                return 0;
            });

            return usersForScore.slice(0, 10).map((user) => this.mapper.toEntity(user));
        } catch (error) {
            throw new NotFoundError("Erro in list top ten players.");
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.prismaService.users.findUnique({
                where: { email }
            });

            if(!user) throw new NotFoundError(`User not found usind email ${email}`);

            return this.mapper.toEntity(user);
        } catch (error) {
            throw new NotFoundError(`User not found usind email ${email}`);
        }
    }

    async emailExists(email: string): Promise<void> {
        const user = await this.prismaService.users.findUnique({
            where: { email }
        });

        if(user){
            throw new ConflictError(`Email address already used`)
        }
    }
    
    async search(props: UserRepository.SearchParams): Promise<UserRepository.SearchResult> {
        const sortable = props.sort ? this.sortableFields.includes(props.sort) : false;
        const orderByField = sortable ? props.sort : "createdAt";
        const orderByDir = sortable ? props.sortDir : "desc";
        const count = await this.prismaService.users.count({
            ...(props.filter && {
                where: {
                    nickname: {
                        contains: props.filter,
                        mode: "insensitive",
                    },
                }
            })
        });
        const models = await this.prismaService.users.findMany({
            ...(props.filter && {
                where: {
                    nickname: {
                        contains: props.filter,
                        mode: "insensitive"
                    }
                }
            }),
            orderBy: {
                [orderByField ?? "createdAt"]: orderByDir
            },
            skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 1,
            take: props.perPage && props.perPage > 0 ? props.perPage : 15,
        });

        return new UserRepository.SearchResult({
            items: models.map(model => this.mapper.toEntity(model)),
            total: count,
            currentPage: props.page,
            perPage: props.perPage,
            sort: orderByField,
            sortDir: orderByDir,
            filter: props.filter,
        });
    }
    
    async insert(entity: UserEntity): Promise<void> {
        await this.prismaService.users.create({
            data: entity.toJSON(),
        });
    }
    
    findById(id: string): Promise<UserEntity> {
        return this._get(id);
    }
    
    async findAll(): Promise<UserEntity[]> {
        const models = await this.prismaService.users.findMany();

        return models.map((model) => this.mapper.toEntity(model));
    }
    
    async update(entity: UserEntity): Promise<void> {
        await this._get(entity.id);
        await this.prismaService.users.update({
            data: entity.toJSON(),
            where: {
                id: entity.id
            }
        });
    }
    
    async delete(id: string): Promise<void> {
        await this._get(id);
        await this.prismaService.users.delete({
            where: { id }
        });
    }

    protected async _get(id: string): Promise<UserEntity>{
        try {
            const user = await this.prismaService.users.findUnique({
                where: { id }
            });

            return this.mapper.toEntity(user);
        } catch (error) {
            throw new NotFoundError(`UserModel not found using ID ${id}`);
        }
    }
}