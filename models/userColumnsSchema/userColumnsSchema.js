import mongoose from "mongoose";

const userColumnsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    userColumns: [{ type: "UUID", default: () => randomUUID() }],
  },
  { timestamps: true },
);

const UserColumns = mongoose.model("UserColumns", userColumnsSchema);

export default UserColumns;
