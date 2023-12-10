import { Router } from "express";
import { list, add, destroy } from "../controllers/cart";
import { checkJWT } from "../middleware/checkJWT";

const router = Router();

router.get('/', [checkJWT], list);
router.post('/', [checkJWT], add);
router.delete('/:id', [checkJWT], destroy);

export default router;