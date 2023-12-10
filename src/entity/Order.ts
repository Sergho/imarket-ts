import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date

    @ManyToOne(type => User, (user) => user.orders)
    owner: User;

    @OneToMany(type => OrderItem, (item) => item.order)
    items: OrderItem[];
}