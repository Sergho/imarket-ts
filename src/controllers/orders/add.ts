import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";
import { Order } from "../../entity/Order";
import { OrderItem } from "../../entity/OrderItem";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const orderId = req.params.id;
        const { productId, amount } = req.body;
        if(!productId || !amount){
            const customError = new CustomError(400, 'General', 'ProductId or amount not sent');
            return next(customError);
        }

        if(amount < 1){
            const customError = new CustomError(400, 'General', 'Amount must be higher than 0');
            return next(customError);
        }

        const orderRepository = AppDataSource.getRepository(Order);
        const order: Order = await orderRepository.findOne({
            where: {
                id: orderId
            }
        });

        if(!order){
            const customError = new CustomError(404, 'General', `Order with id: ${orderId} not found`);
            return next(customError);
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

        const itemRepository = AppDataSource.getRepository(OrderItem);
        const duplicate: OrderItem = await itemRepository
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
            
        if(duplicate){
            const customError = new CustomError(409, 'General', `Item for product with id: ${productId} already exists`);
            return next(customError);
        }

        const item: OrderItem = new OrderItem();
        item.order = order;
        item.product = product;
        item.amount = amount;

        await itemRepository.save(item);

        delete item.order;

        return res.customSuccess(201, 'Order item created', { item });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}