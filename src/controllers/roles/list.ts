import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Role } from "../../entity/Role";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const limit = req.query.limit;

        const roleRepository = AppDataSource.getRepository(Role);
        const roles: Role[] = await roleRepository.find({
            order: { id: 'ASC' },
            take: limit
        });

        return res.customSuccess(200, 'Roles list', { roles });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}