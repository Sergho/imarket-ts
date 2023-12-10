import { Router } from "express";
import { checkJWT } from "../middleware/checkJWT";
import { checkRole } from "../middleware/checkRole";
import { list } from "../controllers/roles";

const router = Router();

router.get('/', [checkJWT, checkRole('Admin')], list);

export default router;