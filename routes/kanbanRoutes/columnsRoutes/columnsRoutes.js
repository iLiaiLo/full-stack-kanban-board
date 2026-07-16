import express from "express";
import getColumns from "../../../controllers/kanbanBoardControllers/columnControllers/getColumns.js";
import addColumn from "../../../controllers/kanbanBoardControllers/columnControllers/addColumn.js";
import updateColumn from "../../../controllers/kanbanBoardControllers/columnControllers/updateColumn.js";
import deleteColumn from "../../../controllers/kanbanBoardControllers/columnControllers/deleteColumn.js";
import validateBody from "../../../middlewares/validation/validateBody.js";
import validateParams from "../../../middlewares/validation/validateColumnId.js";

const columnRouter = express.Router();
columnRouter.get("/", getColumns);
columnRouter.post("/", validateBody, addColumn);
columnRouter.put("/:columnId", validateParams, validateBody, updateColumn);
columnRouter.delete("/:columnId", validateParams, deleteColumn);

export default columnRouter;
