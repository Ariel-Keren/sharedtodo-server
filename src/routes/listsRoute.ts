import { Router } from "express";
import addListController from "../controllers/addListController";
import addTodoController from "../controllers/addTodoController";
import toggleCompleteController from "../controllers/toggleCompleteController";
import removeListController from "../controllers/removeListController";

const router = Router({ mergeParams: true });

router.post("/", addListController);
router.post("/:listIndex/todos", addTodoController);
router.delete("/:listIndex", removeListController);
router.patch("/:listIndex/todos/:todoIndex", toggleCompleteController);

export default router;
