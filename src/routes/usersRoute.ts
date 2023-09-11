import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import listsRouter from "./listsRoute";
import changePasswordController from "../controllers/changePasswordController";
import changeUsernameController from "../controllers/changeUsernameController";

const router = Router({ mergeParams: true });

router.use(verifyToken);

router.use("/lists", listsRouter);

router.patch("/username", changeUsernameController);
router.patch("/password", changePasswordController);

export default router;
