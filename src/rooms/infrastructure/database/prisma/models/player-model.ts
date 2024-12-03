import { Users } from "@prisma/client";

export const userConvertToPlayer = (user: Users)=> {
    return {
        id: user.id,
        nickname: user.nickname
    }
}