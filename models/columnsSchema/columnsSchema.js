import mongoose from "mongoose";

const columnsSchema = new mongoose.Schema(
  {
    id: { type: "UUID", required: true, default: () => randomUUID() },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: "String", required: true },
  },
  { timestamps: true },
);

const columns = mongoose.model("Columns", columnsSchema);

export default columns;
