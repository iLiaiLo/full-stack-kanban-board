import AppError from "../../../errorHandlers/AppError.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";

const addTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { columnId } = res.loclas.safeParams;

    const id = crypto.randomUUID();
    const { title } = res.locals.safeBody;
    const userTasksColumn = await UserTasks.findOneAndUpdate(
      { userId },
      { $push: { userTasks: id } },
      { returnDocument: "after" },
    );

    if (!userTasksColumn) {
      const error = new AppError("User tasks column not found", 404);
      return next(error);
    }

    await Tasks.create({ id, userId, title, columnId });

    return res
      .status(201)
      .json({ message: "task has been added successfully", id });
  } catch (error) {
    next(error);
  }
};

export default addTask;
