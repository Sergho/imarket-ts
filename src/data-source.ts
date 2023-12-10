import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Order } from "./entity/Order"
import { OrderItem } from "./entity/OrderItem"
import { Product } from "./entity/Product"
import { ProductType } from "./entity/ProductType"
import { Role } from "./entity/Role"
import { ShoppingCart } from "./entity/ShoppingCart"
import { ShoppingCartItem } from "./entity/ShoppingCartItem"
import { Supplier } from "./entity/Supplier"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "srgho31296",
    database: "imarket",
    synchronize: true,
    logging: false,
    entities: [
        Order,
        OrderItem,
        Product,
        ProductType,
        Role,
        ShoppingCart,
        ShoppingCartItem,
        Supplier,
        User
    ],
    migrations: [],
    subscribers: [],
})
