import columns from "../../../models/columnsSchema/columnsSchema.js";

const updateColumn = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { columnId } = req.params;
    if (!columnId) {
      return next(new Error(`columnId is required`));
    }
    const { title } = req.body;
    if (!title) {
      return next(new Error(`title is required`));
    }

    const columnToUpdate = await columns.findOneAndUpdate(
      { id: columnId, userId },
      { title },
      { returnDocument: "after" },
    );
    if (!columnToUpdate) {
      return next(new Error(`column with id ${columnId} was not found`));
    }
    return res
      .status(200)
      .json({ message: "column has been updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default updateColumn;
