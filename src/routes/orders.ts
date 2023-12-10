import { Router } from "express";
import { checkJWT } from "../middleware/checkJWT";
import { add, create, destroy, destroyItem, edit, selfList, selfSingle, single } from "../controllers/orders";
import { checkRole } from "../middleware/checkRole";

const router = Router();

router.post('/', [checkJWT], create);
router.get('/self', [checkJWT], selfList);
router.get('/self/:id', [checkJWT], selfSingle);
router.get('/:id', [checkJWT, checkRole('Admin')], single);
router.put('/:id', [checkJWT, checkRole('Admin')], edit);
router.post('/:id/items', [checkJWT, checkRole('Admin')], add);
router.delete('/:orderId/items/:productId', [checkJWT, checkRole('Admin')], destroyItem);
router.delete('/:id', [checkJWT, checkRole('Admin')], destroy);

export default router;