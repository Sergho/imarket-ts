import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { ShoppingCart } from "../../entity/ShoppingCart";
import { Order } from "../../entity/Order";
import { OrderItem } from "../../entity/OrderItem";
import { ShoppingCartItem } from "../../entity/ShoppingCartItem";

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const ownerId = req.jwtPayload.id;

        const userRepository = AppDataSource.getRepository(User);
        const cartRepository = AppDataSource.getRepository(ShoppingCart);

        const owner: User = await userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.cart', 'cart')
            .leftJoinAndSelect('cart.items', 'item')
            .leftJoinAndSelect('item.product', 'product')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.type', 'type')
            .where('user.id = :id', { id: ownerId })
            .orderBy("item.id")
            .getOne();

        if(!owner){
            const customError = new CustomError(404, 'General', `Shopping cart owner with id: ${ownerId} not found`);
            return next(customError);
        }

        if(!owner.cart){
            const cart = new ShoppingCart();
            cart.owner = owner;
            await cartRepository.save(cart);

            owner.cart = cart;
        }

        if(!owner.cart.items || owner.cart.items.length == 0){
            const customError = new CustomError(404, 'General', `Shopping cart is empty`);
            return next(customError);
        }

        const orderRepository = AppDataSource.getRepository(Order);
        const newOrder: Order = new Order();
        newOrder.owner = owner;
        newOrder.items = [];

        await orderRepository.save(newOrder);

        const orderItemRepository = AppDataSource.getRepository(OrderItem);
        const cartItemRepository = AppDataSource.getRepository(ShoppingCartItem);

        for(const item of owner.cart.items){
            const orderItem: OrderItem = new OrderItem();
            orderItem.product = item.product;
            orderItem.amount = item.amount;
            await orderItemRepository.save(orderItem);
            await cartItemRepository.remove(item);

            newOrder.items.push(orderItem);
        }

        await orderRepository.save(newOrder);

        delete owner.cart;

        return res.customSuccess(201, 'Order created', { order: newOrder });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}