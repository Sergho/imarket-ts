import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { User } from "../../entity/User";
import { Role } from "../../entity/Role";
import { HashPassword } from "../../utils/password/HashPassword";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = req.params.id;
        const { firstName, lastName, midName, email, password, roleId } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user: User = await userRepository.findOne({
            where: { id },
            relations: { role: true }
        });

        if(!user){
            const customError = new CustomError(404, 'General', `User with id: ${id} not found`);
            return next(customError);
        }

        if(roleId){
            const roleRepository = AppDataSource.getRepository(Role);
            const role: Role = await roleRepository.findOne({
                where: { id: roleId }
            });
    
            if(!role){
                const customError = new CustomError(404, 'General', `Role with id: ${id} not found`);
                return next(customError);
            }

            user.role = role;
        }

        if(email){
            const duplicate: User = await userRepository.findOne({
                where: { email }
            });
            if(duplicate){
                const customError = new CustomError(409, 'General', `User with email: ${email} already exists`);
                return next(customError);
            }
            
            user.email = email;
        }

        if(firstName) user.firstName = firstName;
        if(lastName) user.lastName = lastName;
        if(midName) user.midName = midName;
        if(password) user.passwordHash = HashPassword(password);

        await userRepository.save(user);

        return res.customSuccess(200, 'User editted', { editted: user });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}