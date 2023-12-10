import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { Order } from "../../entity/Order";

export const single = async (req: Request, res: Response, next: NextFunction) => {
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

        return res.customSuccess(200, 'Order found', { order: order });

    } catch (e) {
        console.log(e);
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}