import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const limit = req.query.limit;

        const productRepository = AppDataSource.getRepository(Product);
        const products: Product[] = await productRepository.find({
            take: limit,
            order: { id: 'ASC' },
            relations: {
                supplier: true,
                type: true
            }
        });

        return res.customSuccess(200, 'Products list', { products });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}