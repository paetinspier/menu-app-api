import { Column, Table } from "@wwwouter/typed-knex";
import { User } from "./user";


@Table('users')
export class UserEntity {
    @Column({ primary: true })
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    uid: string;
    @Column()
    is_active: boolean;

    static fromUser(user: User): UserEntity{
        let entity = new UserEntity();
        entity.email = user.email;
        entity.is_active = user.is_active;
        entity.name = user.name;
        entity.uid = user.uid;
        return entity;
    }
}