import { UserEntity } from "./user.entity";


export class User {
    id?: number;
    uid: string;
    name: string;
    email: string;
    isActive: boolean;

    static fromEntity(userEntity: UserEntity): User{
        let user = new User();
        user.email = userEntity.email;
        user.name = userEntity.name;
        user.uid = userEntity.uid;

        return user;
    }
}