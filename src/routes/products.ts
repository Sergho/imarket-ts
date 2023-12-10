import { Router } from "express";
import { checkJWT } from "../middleware/checkJWT";
import { list, single, add, edit, destroy } from "../controllers/products";
import { checkRole } from "../middleware/checkRole";

const router = Router();

router.get('/', [checkJWT], list);
router.get('/:id', [checkJWT], single);
router.post('/', [checkJWT, checkRole('Admin')], add);
router.put('/:id', [checkJWT, checkRole('Admin')], edit);
router.delete('/:id', [checkJWT, checkRole('Admin')], destroy);

export default router;