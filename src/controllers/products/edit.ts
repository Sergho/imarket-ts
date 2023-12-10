import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../data-source";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { Product } from "../../entity/Product";
import { Supplier } from "../../entity/Supplier";
import { ProductType } from "../../entity/ProductType";

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const id = req.params.id;
        const { name, price, description, supplierId, typeId } = req.body;

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

        if(supplierId){
            const supplierRepository = AppDataSource.getRepository(Supplier);
            const supplier: Supplier = await supplierRepository.findOne({
                where: { id: supplierId }
            });
    
            if(!supplier){
                const customError = new CustomError(404, 'General', `Supplier with id: ${supplierId} not found`);
                return next(customError);
            }

            product.supplier = supplier;
        }

        if(typeId){
            const typeRepository = AppDataSource.getRepository(ProductType);
            const type: ProductType = await typeRepository.findOne({
                where: { id: typeId }
            });

            if(!type){
                const customError = new CustomError(404, 'General', `Product type with id: ${typeId} not found`);
                return next(customError);
            }
            
            product.type = type;
        }

        if(name) product.name = name;
        if(price) product.price = price;
        if(description) product.description = description;

        await productRepository.save(product);

        return res.customSuccess(200, 'Product editted', { editted: product });

    } catch (e) {
        const customError = new CustomError(500, 'Raw', 'Error');
        return next(customError);
    }
}