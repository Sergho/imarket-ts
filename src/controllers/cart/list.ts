import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { ShoppingCart } from "../../entity/ShoppingCart";
import { User } from "../../entity/User";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const ownerId = req.jwtPayload.id;
        const limit = req.query.limit;

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
            .limit(limit)
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

        return res.customSuccess(200, 'Shopping cart', { cart: owner.cart });

    } catch (e) {
        console.log(e);
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}