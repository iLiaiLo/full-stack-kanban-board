import Tasks from "../../../models/tasksSchema/tasksSchema.js";
import UserTasks from "../../../models/userTasksSchema/userTasksSchema.js";
const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userTaskIds = await UserTasks.findOne({ userId });

    const { userTasks } = userTaskIds;
    const tasks = await Tasks.find({ id: { $in: userTasks } });

    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export default getTasks;
