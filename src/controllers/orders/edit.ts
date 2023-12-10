import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { Order } from "../../entity/Order";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const orderId = req.params.id;
        const { ownerId, date } = req.body;

        const orderRepository = AppDataSource.getRepository(Order);
        const order: Order = await orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.owner', 'owner')
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

        if(ownerId){
            const userRepository = AppDataSource.getRepository(User);
            const owner: User = await userRepository.findOne({
                where: {
                    id: ownerId
                },
                relations: {
                    role: true
                }
            });

            if(!owner){
                const customError = new CustomError(404, 'General', `Order owner with id: ${ownerId} not found`);
                return next(customError);
            }

            order.owner = owner;
        }
        // TODO: Add validator
        if(date){
            order.date = date;
        }

        await orderRepository.save(order);

        return res.customSuccess(200, 'Order editted', { editted: order });

    } catch (e) {
        console.log(e);
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}