import { Router } from "express";
import addListController from "../controllers/addListController";
import addTodoController from "../controllers/addTodoController";
import changeTodoStateController from "../controllers/changeTodoStateController";
import removeListController from "../controllers/removeListController";
import removeTodoController from "../controllers/removeTodoController";

const router = Router({ mergeParams: true });

router.post("/", addListController);
router.post("/:listIndex/todos", addTodoController);
router.patch("/:listIndex/todos/:todoIndex", changeTodoStateController);
router.delete("/:listIndex", removeListController);
router.delete("/:listIndex/todos/:todoIndex", removeTodoController);

export default router;
