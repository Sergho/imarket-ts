import { Router } from "express";
import { checkJWT } from "../middleware/checkJWT";
import { checkRole } from "../middleware/checkRole";
import { self, list, single, edit, destroy } from "../controllers/users";

const router = Router();

router.get('/self', [checkJWT], self);
router.get('/', [checkJWT, checkRole('Admin')], list);
router.get('/:id', [checkJWT, checkRole('Admin')], single);
router.put('/:id', [checkJWT, checkRole('Admin')], edit);
router.delete('/:id', [checkJWT, checkRole('Admin')], destroy);

export default router;