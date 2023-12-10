import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";

export const single = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = req.params.id;

        const productRepository = AppDataSource.getRepository(Product);
        const product: Product = await productRepository.findOne({
            where: { id },
            relations: {
                supplier: true,
                type: true
            }
        });

        if(!product){
            const customError = new CustomError(404, 'General', `Product with id: ${id} not found`);
            return next(customError);
        }
        return res.customSuccess(200, 'Product found', { product });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}