import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";
import { ShoppingCartItem } from "../../entity/ShoppingCartItem";
import { OrderItem } from "../../entity/OrderItem";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = req.params.id;

        const productRepository = AppDataSource.getRepository(Product);
        const cartItemRepository = AppDataSource.getRepository(ShoppingCartItem);
        const orderItemRepository = AppDataSource.getRepository(OrderItem);

        const product: Product = await productRepository.findOne({
            where: { id },
            relations: {
                supplier: true,
                type: true,
                cartItems: true,
                orderItems: true
            }
        });

        if(!product){
            const customError = new CustomError(404, 'General', `Product with id: ${id} not found`);
            return next(customError);
        }

        if(product.cartItems){
            for(const item of product.cartItems){
                await cartItemRepository.remove(item);
            }
        }

        if(product.orderItems){
            for(const item of product.orderItems){
                await orderItemRepository.remove(item);
            }
        }

        await productRepository.remove(product);

        delete product.cartItems;
        delete product.orderItems;

        return res.customSuccess(200, 'Product deleted', { deleted: product });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}