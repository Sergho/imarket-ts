import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Role } from "./Role";
import { Order } from "./Order";
import { ShoppingCart } from "./ShoppingCart";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        nullable: true
    })
    firstName: string;

    @Column({
        length: 50,
        nullable: true
    })
    lastName: string;

    @Column({
        length: 50,
        nullable: true
    })
    midName: string;
    
    @Column({
        length: 50,
        unique: true
    })
    email: string;

    @Column({
        length: 60
    })
    passwordHash: string;

    @ManyToOne(type => Role, (role) => role.users)
    role: Role;

    @OneToOne(type => ShoppingCart, (cart) => cart.owner)
    cart: ShoppingCart;

    @OneToMany(type => Order, (order) => order.owner)
    orders: Order[];
}
