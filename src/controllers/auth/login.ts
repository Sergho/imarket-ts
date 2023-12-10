import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { CheckPassword } from "../../utils/password/CheckPassword";
import { JWTPayload } from "../../types/JWTPayload";
import { CreateJWTToken } from "../../utils/JWT/CreateJWTToken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { email, password } = req.body;
        if(!email || !password){
            const customError = new CustomError(400, 'General', 'Email or password not sent');
            return next(customError);
        }
    
        const userRepository = AppDataSource.getRepository(User);
        const candidate: User = await userRepository.findOne({
            where: { email },
            relations: { role: true }
        });

        if(!candidate){
            const customError = new CustomError(404, 'General', 'Incorrect email or password');
            return next(customError);
        }

        if(!CheckPassword(password, candidate.passwordHash)){
            const customError = new CustomError(404, 'General', 'Incorrect email or password');
            return next(customError);
        }

        const payload: JWTPayload = {
            id: candidate.id,
            role: candidate.role.name
        };

        const token = CreateJWTToken(payload);
        res.customSuccess(201, 'Token created', {token: `Bearer ${token}`});

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}