import AppError from "../../../errorHandlers/AppError.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";

const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = res.locals.safeParams;
    const { title } = res.locals.safeBody;

    const taskToUpdate = await Tasks.findOneAndUpdate(
      { id: taskId, userId },
      { title },
      { returnDocument: "after" },
    );
    if (!taskToUpdate) {
      const error = new AppError("task not found", 404);
      return next(error);
    }
    return res.status(200).json({
      message: "task has been updated successfully",
      taskId,
    });
  } catch (error) {
    next(error);
  }
};

export default updateTask;
