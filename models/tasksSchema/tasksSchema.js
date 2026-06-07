import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
  {
    id: { type: "UUID", default: () => randomUUID(), unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: "String", required: true },
    columnId: { type: "UUID", default: () => randomUUID() },
  },
  { timestamps: true },
);

const Tasks = mongoose.model("Tasks", tasksSchema);

export default Tasks;
