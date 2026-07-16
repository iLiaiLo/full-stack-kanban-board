import express from "express";
const tasksRouter = express.Router();
import getTasks from "../../../controllers/kanbanBoardControllers/taskControllers/getTasks.js";
import addTask from "../../../controllers/kanbanBoardControllers/taskControllers/addTask.js";
import updateTask from "../../../controllers/kanbanBoardControllers/taskControllers/updateTask.js";
import deleteTask from "../../../controllers/kanbanBoardControllers/taskControllers/deleteTask.js";
import validateBody from "../../../middlewares/validation/validateBody.js";
import validateTaskId from "../../../middlewares/validation/validateTaskId.js";

tasksRouter.get("/", getTasks);
tasksRouter.post("/:columnId", validateBody, addTask);
tasksRouter.put("/:taskId", validateTaskId, validateBody, updateTask);
tasksRouter.delete("/:taskId", validateTaskId, deleteTask);

export default tasksRouter;
