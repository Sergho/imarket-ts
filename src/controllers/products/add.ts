import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";
import { Supplier } from "../../entity/Supplier";
import { ProductType } from "../../entity/ProductType";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const {name, price, description, supplierId, typeId} = req.body

        if(!name || !price){
            const customError = new CustomError(400, 'General', 'Name or price not sent');
            return next(customError);
        }

        const productRepository = AppDataSource.getRepository(Product);

        const newProduct: Product = new Product();
        newProduct.name = name;
        newProduct.price = price;
        newProduct.description = description;
        
        if(supplierId){
            const supplierRepository = AppDataSource.getRepository(Supplier);
            const supplier = await supplierRepository.findOne({
                where: { id: supplierId }
            });

            if(!supplier){
                const customError = new CustomError(404, 'General', `Supplier with id: ${supplierId} not found`);
                return next(customError);
            }

            newProduct.supplier = supplier;
        } else newProduct.supplier = null;

        if(typeId){
            const typeRepository = AppDataSource.getRepository(ProductType);
            const type = await typeRepository.findOne({
                where: { id: typeId }
            });

            if(!type){
                const customError = new CustomError(404, 'General', `Product type with id: ${supplierId} not found`);
                return next(customError);
            }

            newProduct.type = type;
        } else newProduct.type = null;

        await productRepository.save(newProduct);
        return res.customSuccess(201, 'Product created', { product: newProduct });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}