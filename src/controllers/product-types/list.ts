import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { ProductType } from "../../entity/ProductType";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const limit = req.query.limit;

        const typeRepository = AppDataSource.getRepository(ProductType);
        const types: ProductType[] = await typeRepository.find({
            take: limit,
            order: { id: 'ASC' }
        });

        return res.customSuccess(200, 'Product types list', { types });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}