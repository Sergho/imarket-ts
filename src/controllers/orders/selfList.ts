import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";

export const selfList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const limit = req.query.limit;
        
        const ownerId = req.jwtPayload.id;

        const userRepository = AppDataSource.getRepository(User);

        const owner: User = await userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.orders', 'order')
            .leftJoinAndSelect('order.items', 'item')
            .leftJoinAndSelect('item.product', 'product')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.type', 'type')
            .where('user.id = :id', { id: ownerId })
            .limit(limit)
            .orderBy("item.id")
            .getOne();

        if(!owner){
            const customError = new CustomError(404, 'General', `Orders owner with id: ${ownerId} not found`);
            return next(customError);
        }

        if(!owner.orders){
            const customError = new CustomError(404, 'General', `Orders for user with id: ${ownerId} not found`);
            return next(customError);
        }

        return res.customSuccess(200, 'Orders list', { orders: owner.orders });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}