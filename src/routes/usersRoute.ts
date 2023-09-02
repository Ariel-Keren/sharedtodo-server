import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import listsRouter from "./listsRoute";

const router = Router({ mergeParams: true });

router.use(verifyToken);

router.use("/lists", listsRouter);

// router.patch(/password)
// router.patch(/username)

export default router;
