import { Router } from "express";
import auth from "./auth";
import users from "./users";
import roles from "./roles";
import suppliers from "./suppliers";
import productTypes from "./product-types";
import products from "./products";
import cart from "./cart";
import orders from "./orders";
import notFound from "./404"

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/roles', roles);
router.use('/products', products);
router.use('/suppliers', suppliers);
router.use('/product-types', productTypes);
router.use('/cart', cart);
router.use('/orders', orders);

router.use('/', notFound);

export default router;