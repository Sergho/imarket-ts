import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { ShoppingCart } from "./ShoppingCart";

@Entity()
export class ShoppingCartItem{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, (product) => product.cartItems)
    product: Product;

    @Column()
    amount: number;

    @ManyToOne(type => ShoppingCart, (cart) => cart.items)
    cart: ShoppingCart;
}