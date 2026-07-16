import AppError from "../../../errorHandlers/AppError.js";
import columns from "../../../models/columnsSchema/columnsSchema.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";
const deleteColumn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { columnId } = res.locals.safeParams;

    const userColumns = await UserColumns.findOneAndUpdate(
      { userId },
      { $pull: { userColumns: columnId } },
      { returnDocument: "after" },
    );
    if (!userColumns) {
      const error = new AppError(
        `userColumns with id ${userId} was not found`,
        404,
      );
      return next(error);
    }

    const columnTodelete = await columns.findOneAndDelete({
      id: columnId,
      userId,
    });
    if (!columnTodelete) {
      const error = new AppError(
        "Failed to delete column: Column not found.",
        404,
      );
      return next(error);
    }
    const taskIds = await Tasks.distinct("id", { columnId, userId });
    if (!taskIds) {
      const error = new AppError(
        "unable to delete column: Associated taskIds not found.",
        404,
      );
      return next(error);
    }
    const userTask = await UserTasks.findOneAndUpdate(
      { userId },
      { $pull: { userTasks: { $in: taskIds } } },
      { returnDocument: "after" },
    );
    if (!userTask) {
      const error = new AppError(
        "Failed to delete column: Associated task not found.",
        404,
      );
      return next(error);
    }
    await Tasks.deleteMany({ columnId, userId });

    return res
      .status(200)
      .json({ message: "column has been deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteColumn;
