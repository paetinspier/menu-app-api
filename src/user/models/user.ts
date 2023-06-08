import { UserEntity } from "./user.entity";


export class User {
    id?: number;
    uid: string;
    name: string;
    email: string;
    is_active: boolean;

    static fromEntity(userEntity: UserEntity): User{
        let user = new User();
        user.email = userEntity.email;
        user.name = userEntity.name;
        user.uid = userEntity.uid;
        user.is_active = userEntity.is_active;
        
        return user;
    }
}