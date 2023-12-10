import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const limit = req.query.limit;

        const userRepository = AppDataSource.getRepository(User);
        const users: User[] = await userRepository.find({
            take: limit,
            order: { id: 'ASC' },
            relations: { role: true }
        });

        return res.customSuccess(200, 'Users list', { users });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}