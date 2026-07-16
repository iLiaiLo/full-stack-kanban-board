import express from "express";
import dotenv from "dotenv";
import columnRouter from "./routes/kanbanRoutes/columnsRoutes/columnsRoutes.js";
import tasksRouter from "./routes/kanbanRoutes/tasksRoutes/tasksRoutes.js";
import mongoose from "mongoose";
import errorHandler from "./errorHandlers/errorHandler.js";
import authRouter from "./routes/outhRoutes/outhRoutes.js";
import cookieParser from "cookie-parser";
import verifyToken from "./middlewares/verifyToken.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user/", authRouter);
app.use("/api/kanban-board/columns", verifyToken, columnRouter);
app.use("/api/kanban-board/tasks", verifyToken, tasksRouter);

app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((e) => console.log(e));
