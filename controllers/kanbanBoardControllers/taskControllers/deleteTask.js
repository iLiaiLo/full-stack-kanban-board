import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";

const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;

    if (!taskId) {
      return next(new Error("userId and taskId are required"));
    }

    const updatedColumn = await UserTasks.findOneAndUpdate(
      { userId },
      { $pull: { userTasks: taskId } },
      { returnDocument: "after" },
    );
    if (!updatedColumn) {
      return next(new Error("User tasks column not found"));
    }

    const deletedTask = await Tasks.findOneAndDelete({ id: taskId, userId });
    if (!deletedTask) {
      return next(new Error("Task not found"));
    }

    return res
      .status(200)
      .json({ message: "Task has been deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteTask;
