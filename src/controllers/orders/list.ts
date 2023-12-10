import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Order } from "../../entity/Order";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const limit = req.query.limit;

        const orderRepository = AppDataSource.getRepository(Order);
        const orders: Order[] = await orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'item')
        .leftJoinAndSelect('item.product', 'product')
        .leftJoinAndSelect('product.supplier', 'supplier')
        .leftJoinAndSelect('product.type', 'type')
        .limit(limit)
        .orderBy("item.id")
        .getMany();

        return res.customSuccess(200, 'Orders list', { orders });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}