import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";
import { Order } from "../../entity/Order";
import { OrderItem } from "../../entity/OrderItem";

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const orderId = req.params.id;

        const orderRepository = AppDataSource.getRepository(Order);
        const order: Order = await orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'item')
            .leftJoinAndSelect('item.product', 'product')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.type', 'type')
            .where('order.id = :orderId', {
                orderId: orderId
            })
            .orderBy("item.id")
            .getOne();

        if(!order){
            const customError = new CustomError(404, 'General', `Order with id: ${orderId} not found`);
            return next(customError);
        }
        
        const itemRepository = AppDataSource.getRepository(OrderItem);
        if(order.items){
            for(const item of order.items){
                await itemRepository.remove(item);
            }
        }

        await orderRepository.remove(order);

        return res.customSuccess(200, 'Order deleted', { deleted: order });

    } catch (e) {
        console.log(e);
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}