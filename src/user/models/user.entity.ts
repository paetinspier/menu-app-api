import { Column, Table } from "@wwwouter/typed-knex";
import { User } from "./user";


@Table('users')
export class UserEntity {
    @Column({ primary: true })
    id: number;
    @Column()
    uid: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    isActive: boolean;

    static fromUser(user: User): UserEntity{
        let entity = new UserEntity();
        entity.email = user.email;
        entity.isActive = user.isActive;
        entity.name = user.name;
        entity.uid = user.uid;
        return entity;
    }
}