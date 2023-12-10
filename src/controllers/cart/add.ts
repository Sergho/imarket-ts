import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { ShoppingCart } from "../../entity/ShoppingCart";
import { Product } from "../../entity/Product";
import { ShoppingCartItem } from "../../entity/ShoppingCartItem";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const ownerId = req.jwtPayload.id;
        const { productId, amount } = req.body;
        if(!productId || !amount){
            const customError = new CustomError(400, 'General', 'ProductId or amount not sent');
            return next(customError);
        }

        if(amount < 1){
            const customError = new CustomError(400, 'General', 'Amount must be higher than 0');
            return next(customError);
        }

        const userRepository = AppDataSource.getRepository(User);
        const cartRepository = AppDataSource.getRepository(ShoppingCart);

        const owner: User = await userRepository.findOne({
            where: { id: ownerId },
            relations: {
                cart: true
            }
        })

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

        const productRepository = AppDataSource.getRepository(Product);
        const product: Product = await productRepository.findOne({
            where: { id: productId },
            relations: {
                supplier: true,
                type: true
            }
        })

        if(!product){
            const customError = new CustomError(404, 'General', `Product with id: ${productId} not found`);
            return next(customError);
        }

        const itemRepository = AppDataSource.getRepository(ShoppingCartItem);
        const duplicate: ShoppingCartItem = await itemRepository.findOne({
            where: {
                product: product,
                cart: owner.cart
            }
        })
        if(duplicate){
            const customError = new CustomError(409, 'General', `Item for product with id: ${productId} already exists`);
            return next(customError);
        }

        const item: ShoppingCartItem = new ShoppingCartItem();
        item.cart = owner.cart;
        item.product = product;
        item.amount = amount;

        await itemRepository.save(item);

        delete item.cart;

        return res.customSuccess(201, 'Shopping cart item created', { item });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}