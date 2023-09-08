import { Router } from "express";
import addListController from "../controllers/addListController";
import addTodoController from "../controllers/addTodoController";
import toggleListVisibilityController from "../controllers/toggleListVisibilityController";
import changeTodoStateController from "../controllers/changeTodoStateController";
import removeListController from "../controllers/removeListController";
import removeTodoController from "../controllers/removeTodoController";
import getPublicListsController from "../controllers/getPublicListsController";

const router = Router({ mergeParams: true });

router.get("/public", getPublicListsController);
router.post("/", addListController);
router.post("/:listIndex/todos", addTodoController);
router.patch("/:listIndex", toggleListVisibilityController);
router.patch("/:listIndex/todos/:todoIndex", changeTodoStateController);
router.delete("/:listIndex", removeListController);
router.delete("/:listIndex/todos/:todoIndex", removeTodoController);

export default router;
