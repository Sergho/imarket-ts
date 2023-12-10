import { Router } from "express";
import { checkJWT } from "../middleware/checkJWT";
import { list } from "../controllers/suppliers"
import { checkRole } from "../middleware/checkRole";

const router = Router();

router.get('/', [checkJWT, checkRole('Admin')], list);

export default router;