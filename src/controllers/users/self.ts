import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";

export const self = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = req.jwtPayload.id;

        const userRepository = AppDataSource.getRepository(User);
        const user: User = await userRepository.findOne({
            where: { id },
            relations: { role: true }
        });

        if(!user){
            const customError = new CustomError(404, 'General', `User with id: ${id} not found`);
            return next(customError);
        }
        return res.customSuccess(200, 'User found', { user });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}