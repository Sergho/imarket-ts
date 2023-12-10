import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { Role as RoleType } from "../types/Role";

@Entity()
export class Role{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: RoleType;

    @OneToMany(type => User, (user) => user.role)
    users: User[];
}