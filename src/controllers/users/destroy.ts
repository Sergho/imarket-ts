import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { ShoppingCart } from "../../entity/ShoppingCart";
import { ShoppingCartItem } from "../../entity/ShoppingCartItem";
import { Order } from "../../entity/Order";
import { OrderItem } from "../../entity/OrderItem";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = req.params.id;

        const userRepository = AppDataSource.getRepository(User);
        const cartRepository = AppDataSource.getRepository(ShoppingCart);
        const cartItemRepository = AppDataSource.getRepository(ShoppingCartItem);
        const orderRepository = AppDataSource.getRepository(Order);
        const orderItemRepository = AppDataSource.getRepository(OrderItem);

        const user: User = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.cart', 'cart')
        .leftJoinAndSelect('cart.items', 'cartItem')
        .leftJoinAndSelect('user.orders', 'order')
        .leftJoinAndSelect('order.items', 'orderItem')
        .leftJoinAndSelect('user.role', 'role')
        .where('user.id = :id', { id })
        .getOne();

        console.log(user);

        if(!user){
            const customError = new CustomError(404, 'General', `User with id: ${id} not found`);
            return next(customError);
        }

        if(user.cart){
            for(const item of user.cart.items){
                await cartItemRepository.remove(item);
            }
            await cartRepository.remove(user.cart);
        }
        if(user.orders){
            for(const order of user.orders){
                for(const item of order.items){
                    await orderItemRepository.remove(item);
                }
                await orderRepository.remove(order);
            }
        }
        
        await userRepository.remove(user);

        delete user.orders;
        delete user.cart;

        return res.customSuccess(200, 'User deleted', { deleted: user });

    } catch (e) {
        console.log(e);
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}