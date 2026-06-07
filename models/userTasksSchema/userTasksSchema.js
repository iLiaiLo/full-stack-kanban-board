import mongoose from "mongoose";

const userTasksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    userTasks: [{ type: "UUID", default: () => randomUUID() }],
  },
  { timestamps: true },
);

const UserTasks = mongoose.model("UserTasks", userTasksSchema);

export default UserTasks;
