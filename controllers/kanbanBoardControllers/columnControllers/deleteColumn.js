import columns from "../../../models/columnsSchema/columnsSchema.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";
const deleteColumn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { columnId } = req.params;
    if (!columnId) {
      return next(new Error("columnId is required"));
    }

    const userColumns = await UserColumns.findOneAndUpdate(
      { userId },
      { $pull: { userColumns: columnId } },
      { returnDocument: "after" },
    );
    if (!userColumns) {
      return next(new Error(`userColumns with id ${userId} was not found`));
    }

    const columnTodelete = await columns.findOneAndDelete({
      id: columnId,
      userId,
    });
    if (!columnTodelete) {
      return next(
        new Error(
          `column with id ${columnId} was not found during column deletion`,
        ),
      );
    }
    const taskIds = await Tasks.distinct("id", { columnId, userId });
    if (!taskIds) {
      return next(new Error("taskIds was not found during column deletion"));
    }
    const userTasks = await UserTasks.findOneAndUpdate(
      { userId },
      { $pull: { userTasks: { $in: taskIds } } },
      { returnDocument: "after" },
    );
    if (!userTasks) {
      return next(new Error("userTasks was not found during column deletion"));
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
