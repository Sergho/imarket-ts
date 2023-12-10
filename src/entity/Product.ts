import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Supplier } from "./Supplier";
import { ProductType } from "./ProductType";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @Column("numeric")
    price: number;

    @Column("text", {
        nullable: true
    })
    description: string;
    
    @ManyToOne(type => Supplier, (supplier) => supplier.products)
    supplier: Supplier;

    @ManyToOne(type => ProductType, (type) => type.products)
    type: ProductType;

    @OneToMany(type => ShoppingCartItem, (item) => item.product)
    cartItems: ShoppingCartItem[]

    @OneToMany(type => OrderItem, (item) => item.product)
    orderItems: OrderItem[]
}