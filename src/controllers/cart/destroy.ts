import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { ShoppingCart } from "../../entity/ShoppingCart";
import { Product } from "../../entity/Product";
import { ShoppingCartItem } from "../../entity/ShoppingCartItem";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const ownerId = req.jwtPayload.id;
        const productId = req.params.id;

        const userRepository = AppDataSource.getRepository(User);
        const cartRepository = AppDataSource.getRepository(ShoppingCart);

        const owner: User = await userRepository.findOne({
            where: { id: ownerId },
            relations: {
                cart: true
            }
        });

        if(!owner){
            const customError = new CustomError(404, 'General', `Shopping cart owner with id: ${ownerId} not found`);
            return next(customError);
        }

        if(!owner.cart){
            const cart = new ShoppingCart();
            cart.owner = owner;
            await cartRepository.save(cart);

            owner.cart = cart;

            const customError = new CustomError(404, 'General', `Item for product with id: ${productId} not found`);
            return next(customError);
        }

        const productRepository = AppDataSource.getRepository(Product);
        const product: Product = await productRepository.findOne({
            where: { id: productId }
        });

        const itemRepository = AppDataSource.getRepository(ShoppingCartItem);
        const candidate: ShoppingCartItem = await itemRepository
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.cart', 'cart')
            .leftJoinAndSelect('item.product', 'product')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.type', 'type')
            .where('cart.id = :cartId AND product.id = :productId', {
                cartId: owner.cart.id,
                productId: productId
            })
            .orderBy("item.id")
            .getOne();

        if(!product || !candidate){
            const customError = new CustomError(404, 'General', `Item for product with id: ${productId} not found`);
            return next(customError);
        }

        await itemRepository.remove(candidate);

        delete candidate.cart;

        return res.customSuccess(200, 'Shopping cart item deleted', { deleted: candidate });

    } catch (e) {
        console.log(e);
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}