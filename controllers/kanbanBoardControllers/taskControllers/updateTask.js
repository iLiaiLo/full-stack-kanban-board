import Tasks from "../../../models/tasksSchema/tasksSchema.js";

const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.params;
    if (!taskId) {
      return next(new Error("taskId is required"));
    }
    const { title } = req.body;
    if (!title) {
      return next(new Error("title is required"));
    }
    const taskToUpdate = await Tasks.findOneAndUpdate(
      { id: taskId, userId },
      { title },
      { returnDocument: "after" },
    );
    if (!taskToUpdate) {
      return next(new Error(`task with id ${taskId} was not found`));
    }
    return res.status(200).json({
      message: "task has been updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default updateTask;
