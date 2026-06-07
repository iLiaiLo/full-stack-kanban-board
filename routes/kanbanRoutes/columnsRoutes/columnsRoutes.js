import express from "express";
import getColumns from "../../../controllers/kanbanBoardControllers/columnControllers/getColumns.js";
import addColumn from "../../../controllers/kanbanBoardControllers/columnControllers/addColumn.js";
import updateColumn from "../../../controllers/kanbanBoardControllers/columnControllers/updateColumn.js";
import deleteColumn from "../../../controllers/kanbanBoardControllers/columnControllers/deleteColumn.js";
import verifyToken from "../../../middlewares/verifyToken.js";

const columnRouter = express.Router();
columnRouter.get("/", verifyToken, getColumns);
columnRouter.post("/", verifyToken, addColumn);
columnRouter.put("/:columnId", verifyToken, updateColumn);
columnRouter.delete("/:columnId", verifyToken, deleteColumn);

export default columnRouter;
