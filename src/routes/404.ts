import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
    return res.status(404).json('Not Found');
});

export default router;