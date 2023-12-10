import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";
import { Order } from "../../entity/Order";
import { OrderItem } from "../../entity/OrderItem";

export const destroyItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const orderId = req.params.orderId;
        const productId = req.params.productId;

        const orderRepository = AppDataSource.getRepository(Order);
        const order: Order = await orderRepository.findOne({
            where: {
                id: orderId
            },
            relations: {
                items: true
            }
        });

        if(!order){
            const customError = new CustomError(404, 'General', `Order with id: ${orderId} not found`);
            return next(customError);
        }

        const productRepository = AppDataSource.getRepository(Product);
        const product: Product = await productRepository.findOne({
            where: { id: productId }
        });

        const itemRepository = AppDataSource.getRepository(OrderItem);
        const candidate: OrderItem = await itemRepository
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.order', 'order')
            .leftJoinAndSelect('item.product', 'product')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.type', 'type')
            .where('order.id = :orderId AND product.id = :productId', {
                orderId: orderId,
                productId: productId
            })
            .orderBy("item.id")
            .getOne();

        if(!product || !candidate){
            const customError = new CustomError(404, 'General', `Item for product with id: ${productId} not found`);
            return next(customError);
        }

        await itemRepository.remove(candidate);

        delete candidate.order;

        return res.customSuccess(200, 'Order item deleted', { deleted: candidate });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}