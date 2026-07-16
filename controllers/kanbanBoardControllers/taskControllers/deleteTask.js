import AppError from "../../../errorHandlers/AppError.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";

const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = res.locals.safeParams;

    const updatedColumn = await UserTasks.findOneAndUpdate(
      { userId },
      { $pull: { userTasks: taskId } },
      { returnDocument: "after" },
    );
    if (!updatedColumn) {
      const error = new AppError("User tasks column not found", 404);
      return next(404);
    }

    const deletedTask = await Tasks.findOneAndDelete({ id: taskId, userId });
    if (!deletedTask) {
      const error = new AppError("Task not found", 404);
      return next(error);
    }

    return res
      .status(200)
      .json({ message: "Task has been deleted successfully", taskId });
  } catch (error) {
    next(error);
  }
};

export default deleteTask;
