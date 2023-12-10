import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Supplier } from "../../entity/Supplier";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const limit = req.query.limit;

        const supplierRepository = AppDataSource.getRepository(Supplier);
        const suppliers: Supplier[] = await supplierRepository.find({
            take: limit,
            order: { id: 'ASC' }
        });

        return res.customSuccess(200, 'Suppliers list', { suppliers });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}