import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { Order } from "../../entity/Order";

export const selfSingle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const ownerId = req.jwtPayload.id;
        const orderId = req.params.id;

        const userRepository = AppDataSource.getRepository(User);
        const owner: User = await userRepository.findOne({
            where: {
                id: ownerId
            },
            relations: {
                orders: true 
            }
        });

        if(!owner){
            const customError = new CustomError(404, 'General', `Orders owner with id: ${ownerId} not found`);
            return next(customError);
        }

        const orderRepository = AppDataSource.getRepository(Order);
        const order: Order = await orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.owner', 'owner')
            .leftJoinAndSelect('order.items', 'item')
            .leftJoinAndSelect('item.product', 'product')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.type', 'type')
            .where('owner.id = :ownerId AND order.id = :orderId', {
                ownerId: ownerId,
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