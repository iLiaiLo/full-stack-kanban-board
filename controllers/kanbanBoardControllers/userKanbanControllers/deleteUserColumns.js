import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";
import columns from "../../../models/columnsSchema/columnsSchema.js";
import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";
const deleteUserColumns = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(new Error("userId is required"));
    }
    const userCols = await UserColumns.findOneAndDelete({ userId });

    if (!userCols) {
      return next(new Error("user columns were not found"));
    }

    const { userColumns } = userCols;

    const userTasksToDelete = await UserTasks.findOneAndDelete({ userId });
    if (!userTasksToDelete) {
      return next(new Error("user tasks were not found"));
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
