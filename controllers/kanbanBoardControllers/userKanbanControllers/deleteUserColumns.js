import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";
import columns from "../../../models/columnsSchema/columnsSchema.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";
import AppError from "../../../errorHandlers/AppError.js";
const deleteUserColumns = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userCols = await UserColumns.findOneAndDelete({ userId });

    if (!userCols) {
      const error = new AppError("user columns not found", 404);

      return next(error);
    }

    const { userColumns } = userCols;

    const userTasksToDelete = await UserTasks.findOneAndDelete({ userId });
    if (!userTasksToDelete) {
      const error = new AppError("user tasks were not found", 404);
      return next(error);
    }

    await columns.deleteMany({ userId, id: { $in: userColumns } });

    await Tasks.deleteMany({ userId, columnId: { $in: userColumns } });

    return res
      .status(200)
      .json({ message: "user columns has been deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default deleteUserColumns;
