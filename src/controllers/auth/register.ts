import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Role } from "../../entity/Role";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { HashPassword } from "../../utils/password/HashPassword";
import { ShoppingCart } from "../../entity/ShoppingCart";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {   

        const { email, password, firstName, lastName, midName } = req.body
        if(!email || !password){
            const customError = new CustomError(400, 'General', 'Email or password not sent');
            return next(customError);
        }

        const userRepository = AppDataSource.getRepository(User);
        const roleRepository = AppDataSource.getRepository(Role);
        const cartRepository = AppDataSource.getRepository(ShoppingCart);

        const duplicate: User = await userRepository.findOne({ where: { email } });
        if(duplicate){
            const customError = new CustomError(409, 'General', `User with email: ${email} already exists`);
            return next(customError);
        }

        const defaultRole: Role = await roleRepository.findOneBy({
            name: 'Customer'
        })
        
        const cart = new ShoppingCart();
        await cartRepository.save(cart);

        const newUser: User = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.midName = midName;
        newUser.email = email;
        newUser.passwordHash = HashPassword(password);
        newUser.role = defaultRole;
        newUser.cart = cart;

        await userRepository.save(newUser);
        return res.customSuccess(201, 'User successfully created.', {created: newUser});

    } catch (e) {
        console.log(e)
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}