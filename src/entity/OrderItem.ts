import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, (product) => product.orderItems)
    product: Product;

    @Column()
    amount: number;

    @ManyToOne(type => Order, (order) => order.items)
    order: Order;
}