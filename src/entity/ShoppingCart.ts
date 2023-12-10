import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ShoppingCartItem } from "./ShoppingCartItem";

@Entity()
export class ShoppingCart{
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(type => User, (user) => user.cart)
    @JoinColumn()
    owner: User;

    @OneToMany(type => ShoppingCartItem, (item) => item.cart)
    items: ShoppingCartItem[];
}