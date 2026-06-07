import columns from "../../../models/columnsSchema/columnsSchema.js";
import UserColumns from "../../../models/userColumnsSchema/userColumnsSchema.js";

const addColumn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const columnId = crypto.randomUUID();
    const { title } = req.body;

    if (!title) {
      return next(new Error("title is required"));
    }
    const kanbanToUpdate = await UserColumns.findOneAndUpdate(
      { userId },
      { $push: { userColumns: columnId } },
      { returnDocument: "after" },
    );
    if (!kanbanToUpdate) {
      return next(new Error("userColumns were not found"));
    }

    await columns.create({ id: columnId, userId, title });

    return res
      .status(201)
      .json({ message: "column has been added successfully" });
  } catch (error) {
    next(error);
  }
};

export default addColumn;
