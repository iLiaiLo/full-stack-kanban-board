import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";

const addTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { columnId } = req.params;
    if (!columnId) {
      return next(new Error("columnId is required"));
    }

    const id = crypto.randomUUID();
    const { title } = req.body;
    if (!title || !userId) {
      return next(new Error("title and userId required"));
    }

    const userTasksColumn = await UserTasks.findOneAndUpdate(
      { userId },
      { $push: { userTasks: id } },
      { returnDocument: "after" },
    );

    if (!userTasksColumn) {
      return next(new Error("User tasks column not found"));
    }

    await Tasks.create({ id, userId, title, columnId });

    return res
      .status(201)
      .json({ message: "task has been added successfully" });
  } catch (error) {
    next(error);
  }
};

export default addTask;
