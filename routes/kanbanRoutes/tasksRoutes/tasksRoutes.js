import express from "express";
const tasksRouter = express.Router();
import getTasks from "../../../controllers/kanbanBoardControllers/taskControllers/getTasks.js";
import addTask from "../../../controllers/kanbanBoardControllers/taskControllers/addTask.js";
import updateTask from "../../../controllers/kanbanBoardControllers/taskControllers/updateTask.js";
import deleteTask from "../../../controllers/kanbanBoardControllers/taskControllers/deleteTask.js";
import verifyToken from "../../../middlewares/verifyToken.js";

tasksRouter.get("/", verifyToken, getTasks);
tasksRouter.post("/:columnId", verifyToken, addTask);
tasksRouter.put("/:taskId", verifyToken, updateTask);
tasksRouter.delete("/:taskId", verifyToken, deleteTask);

export default tasksRouter;
